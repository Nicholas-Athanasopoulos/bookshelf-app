import Link from "next/link";
import { BsArrowLeft } from 'react-icons/bs';

// Define the props interface for the BackButton component
interface Props {
    destination?: string;  // Make destination optional with a default value
}

const BackButton: React.FC<Props> = ({ destination = '/' }) => {
    return (
        <div className="flex">
            <Link 
                href={destination}
                className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit"
            >
                <BsArrowLeft className='text-2xl' />
            </Link>
        </div>
    );
};

export default BackButton;
