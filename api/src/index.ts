import express, { Request, Response } from "express";
import { port, mongodbURL } from './config';
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute';
import cors from 'cors';

const app = express();

// Parsing request body
app.use(express.json());

app.get('/', (request: Request, response: Response): Response => {
    console.log('request is: ' + JSON.stringify(request, null, 2));
    return response.status(234).send('Welcome');
});

// Handling CORS POLICY
app.use(cors());

app.use('/books', booksRoute);

mongoose.connect(mongodbURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(port, () => {
            console.log("App is listening to port " + port);
        });
    })
    .catch((error: any) => {
        console.log('error is:' + JSON.stringify(error, null, 2));
    });