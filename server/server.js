require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const fileUpload = require('express-fileupload');
const path = require("path");
const searchRouter = require('./routes/searchRoute');
const { authMiddleware } = require('./utils/auth')

const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../client/build")));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

app.use('/api', searchRouter, fileUpload());


//upload endpoint

app.post('/uploads', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({message: 'no file was uploaded'})
    }

    const file =req.files.media

    file.mv(`${__dirname}/../client/build/uploads/${file.name}`, err => {
        if(err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    console.log(`Server GraphQL Path is: ${server.graphqlPath}`);
    
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      })
    })
    };

    startApolloServer();