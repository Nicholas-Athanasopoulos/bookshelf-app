import React from "react";

interface LoadingProps {
    // Define any props if needed
}

const Loading: React.FC<LoadingProps> = (props) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center animate-pulse">
            <div className="text-center">
                <p className="text-white text-xl animate-bounce">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
