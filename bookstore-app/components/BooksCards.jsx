import BookCard from "./BookCard";

function BooksCards(props) {
    const {
        books
    } = props;

    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((book) => (
                <BookCard book={book}/>
            ))}
        </div>
    )
}

export default BooksCards