'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, ChangeEvent } from 'react';
import BackButton from '@/components/BackButton';
import Loading from '@/components/Loading';
import axios from 'axios';

interface EditBookProps {
    params: {
        id: string;
    };
}

export default function EditBook({ params }: EditBookProps) {
    const { id } = params;

    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [publishYear, setPublishYear] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('Something went wrong. Try again later.');
                console.error('error is: ', error);
            });
    }, [id]);

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false);
                router.push('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('Something went wrong. Try again later.');
                console.error('error is: ', error);
            });
    };

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading && <Loading />}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className="my-4">
                    <label className='text-xl'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={handleChange(setTitle)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className='text-xl'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={handleChange(setAuthor)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className='text-xl'>Publish Year</label>
                    <input
                        type='text'
                        value={publishYear}
                        onChange={handleChange(setPublishYear)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    );
}
