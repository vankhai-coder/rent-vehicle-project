import React from "react";

const DownloadApp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 md:px-6 lg:px-8">
      <div className="container mx-auto py-8 flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 lg:pr-8 text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Download mobile app
          </h2>
          <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
            Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus
            turpis nibh placerat massa. Fermentum urna ut at et in. Turpis
            aliquet cras hendrerit enim condimentum. Condimentum interdum risus
            bibendum urna...
          </p>
          <div className="flex justify-center lg:justify-start">
            <a href="#" className="mr-4">
              <div
                className="w-48 md:w-64 lg:w-96 h-12 md:h-13 bg-cover bg-center"
                style={{ backgroundImage: `url('/ios_androi.png')` }}
              ></div>
            </a>
          </div>
        </div>

        {/* Phone Images */}
        <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <div className="relative">
            <div
              className="w-32 h-64 md:w-40 md:h-80 lg:w-67 lg:h-135 bg-cover bg-center"
              style={{ backgroundImage: `url('/phone.png')` }}
            ></div>
            <div
              className="w-32 h-64 md:w-40 md:h-80 lg:w-67 lg:h-135 absolute top-6 right-6 md:top-12 md:right-12 lg:top-24 lg:right-24 bg-cover bg-center"
              style={{ backgroundImage: `url('/phone.png')` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
