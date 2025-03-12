import React from 'react';

const DownloadApp = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="md:w-1/2 md:pr-8 text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-4">Download mobile app</h2>
                    <p className="text-gray-600 mb-8">
                        Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa.
                        Fermentum urna ut at et in. Turpis aliquet cras hendrerit enim condimentum. Condimentum interdum
                        risus bibendum urna...
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <a href="#" className="mr-4">
                            <div className='w-96 h-13' style={{ backgroundImage: `url('/ios_androi.png')` }}></div>
                        </a>
                    </div>
                </div>

                {/* Phone Images */}
                <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
                    <div className="relative">
                        <div className='w-67 h-135' style={{ backgroundImage: `url('/phone.png')` }}></div>
                        <div className='w-67 h-135 absolute top-24 right-24' style={{ backgroundImage: `url('/phone.png')` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadApp;