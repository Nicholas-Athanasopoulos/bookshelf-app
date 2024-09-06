import BookCard from "./BookCard";

// Define the shape of the book object
interface Book {
    _id: string;
    title: string;
    author: string;
    publishYear: number;
}

// Define the props for the BooksCards component
interface BooksCardsProps {
    books: Book[];
}

const BooksCards: React.FC<BooksCardsProps> = (props) => {
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
