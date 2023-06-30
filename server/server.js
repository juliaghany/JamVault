const express = require('express')
const fileUpload = require('express-fileupload')

PORT = 3001
const app = express()

app.use(fileUpload())

//upload endpoint

app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({message: 'no fuele was uploaded'})
    }

    const file =req.files.media

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})

app.listen(PORT, () => console.log('Serve listening on http://localhost:3001'))