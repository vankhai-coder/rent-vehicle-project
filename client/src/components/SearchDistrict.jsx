import React from 'react';

const SearchDistrict = () => {
    return (
        <div
            className="relative bg-cover bg-center p-10 rounded-4xl flex items-center justify-center text-white "
            style={{ backgroundImage: `url('/banner-car.png')` }} // Replace with your background image path
        >
            <div className="relative z-10 text-center px-4 md:px-8 lg:px-16 w-full">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Enjoy every mile with <br />
                            adorable companionship.
                        </h2>
                        <p className="text-lg mb-8">
                            Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien bibendum ullamcorper in.
                            Diam tincidunt tincidunt erat.
                        </p>
                        <div className="flex rounded-full overflow-hidden shadow-md">
                            <input
                                type="text"
                                placeholder="City"
                                className="px-4 py-3 w-full border-none focus:outline-none bg-white text-black"
                            />
                            <button className="bg-orange-500 text-white px-6 py-3 font-semibold">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
                        <div
                            className="w-64 h-auto bg-cover bg-center"
                            style={{ backgroundImage: `url('/path/to/your/car-image.png')` }} // Replace with your car image path
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDistrict;