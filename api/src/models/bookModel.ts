import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Book document
interface IBook extends Document {
    title: string;
    author: string;
    publishYear: number;
}

// Create the book schema
const bookSchema: Schema<IBook> = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Export the Book model
export const Book = mongoose.model<IBook>('Book', bookSchema);
