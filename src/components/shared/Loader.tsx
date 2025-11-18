import React from 'react';

const Loader = () => {
    return (
        <div className="bg-white dark:bg-gray-800 flex justify-center items-center w-screen h-screen p-5">
            <div className="text-center p-6">
                <div className="w-24 h-24 border-4 border-dashed rounded-full animate-spin border-[#714F04] mx-auto" />
                <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
            </div>
        </div>

    );
};

export default Loader;