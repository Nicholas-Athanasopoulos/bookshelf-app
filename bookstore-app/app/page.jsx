'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import { MdOutlineAddBox } from 'react-icons/md';

import Loading from '@/components/Loading';
import BooksTable from '@/components/BooksTable';
import BooksCards from '@/components/BooksCards';

export default function Home() {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [showType, setShowType] = useState('table')
    async function fetchData() {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            {loading ?
                <Loading />
                :
                <div className='p-4'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-3xl my-8'>Bookshelf</h1>
                        <Link href="/create">
                            <MdOutlineAddBox className='text-sky-800 text-4xl' />
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
            }
        </>
    );
}
