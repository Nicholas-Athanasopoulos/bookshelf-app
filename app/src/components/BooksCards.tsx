import { IBook } from "@/interfaces/IBook";
import BookCard from "./BookCard";

// Define the props for the BooksCards component
interface Props {
    books: IBook[];
}

const BooksCards: React.FC<Props> = (props) => {
    const { books } = props;

    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((book) => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
    );
};

export default BooksCards;
