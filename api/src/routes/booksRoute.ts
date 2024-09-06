import express, { Request, Response } from "express";
import { Book } from '../models/bookModel';

const router = express.Router();

// CREATE BOOK
router.post('/', async (request: Request, response: Response): Promise<Response> => {
    try {
        console.log('Creating book');
        const { title, author, publishYear } = request.body;
        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const newBook = { title, author, publishYear };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error: any) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// READ ALL
router.get('/', async (request: Request, response: Response): Promise<Response> => {
    try {
        console.log('Getting all books');
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error: any) {
        console.log('error is: ' + JSON.stringify(error, null, 2));
        return response.status(500).send({ message: error.message });
    }
});

// READ BY ID
router.get('/:id', async (request: Request, response: Response): Promise<Response> => {
    try {
        console.log('Getting book');
        const { id } = request.params;

        const book = await Book.findById(id);

        if (!book) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json(book);
    } catch (error: any) {
        console.log('error is: ' + JSON.stringify(error, null, 2));
        return response.status(500).send({ message: error.message });
    }
});

// UPDATE
router.put('/:id', async (request: Request, response: Response): Promise<Response> => {
    try {
        console.log('Updating book');
        const { title, author, publishYear } = request.body;
        const { id } = request.params;

        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const result = await Book.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error: any) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// DELETE
router.delete('/:id', async (request: Request, response: Response): Promise<Response> => {
    try {
        console.log('Deleting book');
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error: any) {
        console.log('error is: ' + JSON.stringify(error, null, 2));
        return response.status(500).send({ message: error.message });
    }
});

export default router;
