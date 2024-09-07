import { useState } from "react";
import Link from "next/link";
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookModal from './BookModal';
import { IBook } from "@/interfaces/IBook";

// Define the props for the BooksCard component
interface Props {
    book: IBook;
}

const BooksCard: React.FC<Props> = ({ book }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div
            key={book._id}
            className="border-2 border-gray-500 bg-teal-100 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
        >
            <h2 className="absolute top-1 right-2 px-3 py-1 text-black font-bold bg-teal-600 rounded-lg">
                {book.publishYear}
            </h2>
            <h4 className="my-2 text-black">{book._id}</h4>
            <div className="flex justify-start items-center gap-x-2">
                <PiBookOpenTextLight className="text-red-300 text-2xl"/>
                <h2 className="my-1 text-black font-bold">{book.title}</h2>
            </div>
            <div className="flex justify-start items-center gap-x-2">
                <BiUserCircle className="text-red-300 text-2xl"/>
                <h2 className="my-1 text-black font-bold">{book.author}</h2>
            </div>
            <div className="flex justify-start items-center gap-x-2 mt-4 p-4">
                <BiShow
                    className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                    onClick={() => setShowModal(true)}
                />
                <Link href={`/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800 hover:text-black"/>
                </Link>
                <Link href={`/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black"/>
                </Link>
                <Link href={`/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600 hover:text-black"/>
                </Link>
            </div>
            {showModal && (
                <BookModal book={book} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default BooksCard;
