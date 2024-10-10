import express from 'express'
import { createFiles, getFiles } from './files.js'

const server = express()

server.use(express.json())

const date = new Date();
const timestamp = date.getTime().toString();
const isoDate = date.toISOString().replaceAll(':', '-').split('.')[0]

// POST
server.post('/create-file', (req, res) => {
    const date = new Date();
    const timestamp = date.getTime().toString();
    const isoDate = date.toISOString().replaceAll(':', '-').split('.')[0]
    createFiles('./api-files', `${isoDate}.txt`, timestamp, () => {
        console.log('file created')
        res.status(201).json({ message: `File created successfully` })
    })
})

// GET
server.get('/get-files', (req, res) => {
    getFiles('./api-files',
        (files) => { res.status(200).json(files) },
        (err) => { res.status(500).json(err) }
    )
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})