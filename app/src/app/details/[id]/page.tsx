'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/components/Loading';
import BackButton from '@/components/BackButton';
import { IBook } from '@/interfaces/IBook';

// Define the shape of the props
interface Props {
    params: {
        id: string;
    };
}

export default function BookDetails({ params }: Props) {
    const [book, setBook] = useState<IBook | null>(null); // State can be null initially
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
                        {book._id ? (
                            <div className='my-4'>
                                <span className='text-xl mr-4'>Id</span>
                                <span>{book._id}</span>
                            </div>
                        ) : null}
                        {book.title ? (
                            <div className='my-4'>
                                <span className='text-xl mr-4'>Title</span>
                                <span>{book.title}</span>
                            </div>
                        ) : null}
                        {book.author ? (
                            <div className='my-4'>
                                <span className='text-xl mr-4'>Author</span>
                                <span>{book.author}</span>
                            </div>
                        ) : null}
                        {book.publishYear ? (
                            <div className='my-4'>
                                <span className='text-xl mr-4'>Publish Year</span>
                                <span>{book.publishYear}</span>
                            </div>
                        ) : null}
                        {book.createdAt ? (
                            <div className='my-4'>
                                <span className='text-xl mr-4'>Create Time</span>
                                <span>{new Date(book.createdAt).toString()}</span>
                            </div>
                        ) : null}
                        {book.updatedAt ? (
                            <div className='my-4'>
                                <span className='text-xl mr-4'>Last Update Time</span>
                                <span>{new Date(book.updatedAt).toString()}</span>
                            </div>
                        ) : null}
                    </div>
                )
            )}
        </div>
    );
}
