'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import BackButton from '@/components/BackButton';
import Loading from '@/components/Loading';
import axios from 'axios';

// Define types for the data object
interface BookData {
    title: string;
    author: string;
    publishYear: string;
}

export default function CreateBook() {
    // Use generic type annotations for state
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [publishYear, setPublishYear] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleSaveBook = () => {
        const data: BookData = {
            title,
            author,
            publishYear
        };

        setLoading(true);
        axios.post('http://localhost:5555/books', data)
            .then(() => {
                setLoading(false);
                router.push('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('Something went wrong. Try again later.');
                console.log('error is: ' + JSON.stringify(error, null, 2));
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create Book</h1>
            {loading ? <Loading /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className="my-4">
                    <label className='text-xl'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className='text-xl'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className='text-xl'>Publish Year</label>
                    <input
                        type='text'
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
                    Save
                </button>
            </div>
        </div>
    );
}
