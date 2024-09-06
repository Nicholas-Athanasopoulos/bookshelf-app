'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import BackButton from '@/components/BackButton';
import Loading from '@/components/Loading';
import axios from 'axios';

// Define the shape of the props
interface DeleteBookProps {
    params: {
        id: string;
    };
}

export default function DeleteBook({ params }: DeleteBookProps) {
    const { id } = params;
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleDeleteBook = () => {
        setLoading(true);
        axios.delete(`http://localhost:5555/books/${id}`)
            .then(() => {
                setLoading(false); // Fix: Set loading to false after successful deletion
                router.push('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('Something went wrong. Try again later. Error is: ' + JSON.stringify(error, null, 2));
                console.log('error is: ' + JSON.stringify(error, null, 2));
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {loading ? <Loading /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
                <button
                    className='p-4 bg-red-600 text-white m-8 w-full'
                    onClick={handleDeleteBook}
                >
                    Yes, delete it.
                </button>
            </div>
        </div>
    );
}
