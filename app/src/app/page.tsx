'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import { MdOutlineAddBox } from 'react-icons/md';

import Loading from '@/components/Loading';
import BooksTable from '@/components/BooksTable';
import BooksCards from '@/components/BooksCards';

// Define the shape of a book object
interface Book {
    _id: string;
    title: string;
    author: string;
    publishYear: number;
}

export default function Home() {
    // Define state with initial values and types
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showType, setShowType] = useState<'table' | 'card'>('table');

    // Fetch data from the API
    async function fetchData() {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5555/books');
            setBooks(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className='p-4'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-3xl my-8'>Bookshelf</h1>
                        <Link href="/create">
                            {/* <MdOutlineAddBox className='text-sky-800 text-4xl' /> */}
                        </Link>
                    </div>
                    <div className='flex justify-center items-center gap-x-4'>
                        <button
                            className='text-black font-bold bg-teal-600 hover:bg-sky-700 px-4 py-1 rounded-lg'
                            onClick={() => setShowType('table')}>
                            Table
                        </button>
                        <button
                            className='text-black font-bold bg-teal-600 hover:bg-sky-700 px-4 py-1 rounded-lg'
                            onClick={() => setShowType('card')}>
                            Card
                        </button>
                    </div>
                    {showType === 'table' ? <BooksTable books={books} /> : <BooksCards books={books} />}
                </div>
            )}
        </>
    );
}
