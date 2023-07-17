require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fileUpload = require('express-fileupload');
const path = require("path");
const searchRouter = require('./routes/searchRoute');
const { authMiddleware } = require('./utils/auth');
const fs = require("fs");
const AWS = require('aws-sdk');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/build")));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use((req, res, next) => {
  console.log(req.method + " " + " " + req.originalUrl);
  console.log(req?.body);
  next();
});

app.use(fileUpload());
app.use('/api', searchRouter);

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// Upload endpoint
app.post('/uploads', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: 'No file was uploaded' });
  }

  const file = req.files.media;
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: file.name,
    Body: file.data,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: data.Location });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, '../client/build/uploads')));

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  console.log(`Server GraphQL Path is: ${server.graphqlPath}`);

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();
