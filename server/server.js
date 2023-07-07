const express = require('express');
const fileUpload = require('express-fileupload');
const path = require("path");
const searchRouter = require('./routes/searchRoute');
const app = express()
PORT = 3001

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../client/build")));

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

app.listen(PORT, () => console.log('Server listening on http://localhost:3001'))
require('dotenv').config();

