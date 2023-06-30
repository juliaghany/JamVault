require('dotenv').config();
const express = require('express');
const searchRouter = require('./routes/searchRouter');
const app = express();

app.use('/api', searchRouter);