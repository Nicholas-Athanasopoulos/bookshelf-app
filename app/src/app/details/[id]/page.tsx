'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/components/Loading';
import BackButton from '@/components/BackButton';

// Define the shape of a book object
interface Book {
    _id: string;
    title: string;
    author: string;
    publishYear: number;
    createdAt: string; // Assuming createdAt and updatedAt are ISO date strings
    updatedAt: string;
}

// Define the shape of the props
interface BookDetailsProps {
    params: {
        id: string;
    };
}

export default function BookDetails({ params }: BookDetailsProps) {
    const [book, setBook] = useState<Book | null>(null); // State can be null initially
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = params;

    async function fetchData() {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5555/books/${id}`);
            setBook(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]); // Dependency on `id` to refetch if it changes

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Show Book</h1>
            {loading ? (
                <Loading />
            ) : (
                book && (
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                        <div className='my-4'>
                            <span className='text-xl mr-4'>Id</span>
                            <span>{book._id}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4'>Title</span>
                            <span>{book.title}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4'>Author</span>
                            <span>{book.author}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4'>Publish Year</span>
                            <span>{book.publishYear}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4'>Create Time</span>
                            <span>{new Date(book.createdAt).toString()}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4'>Last Update Time</span>
                            <span>{new Date(book.updatedAt).toString()}</span>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
