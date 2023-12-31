// connection.js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jamVault', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database Connected Successfully'))
.catch(err => console.log(err));

module.exports = mongoose.connection;
