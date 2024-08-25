import express from "express";
import { port, mongodbURL } from './config.js';
import mongoose from "mongoose";
import { Book } from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

// Parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log('request is: ' + JSON.stringify(request, null, 2));
    return response.status(234).send('Welcome')
})

// Handling CORS POLICY
app.use(cors());

app.use('/books', booksRoute);

mongoose.connect(mongodbURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(port, () => {
            console.log("App is listening to port " + port)
        })
    })
    .catch((error) => {
        console.log('error is:' + JSON.stringify(error, null, 2))
    })