import React from "react";

const SearchDistrict = () => {
  return (
    <div
      className="relative bg-cover bg-center p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-4xl flex items-center justify-center text-white"
      style={{ backgroundImage: `url('/banner-car.png')` }} // Replace with your background image path
    >
      <div className="relative z-10 text-center px-4 md:px-8 lg:px-16 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 lg:text-left mb-6 lg:mb-0">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4">
              Enjoy every mile with <br className="hidden sm:block" />
              adorable companionship.
            </h2>
            <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8">
              Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien
              bibendum ullamcorper in. Diam tincidunt tincidunt erat.
            </p>
            <div className="flex flex-col sm:flex-row rounded-full overflow-hidden shadow-md">
              <input
                type="text"
                placeholder="City"
                className="px-3 md:px-4 py-2 md:py-3 w-full border-none focus:outline-none bg-white text-black text-sm md:text-base"
              />
              <button className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 font-semibold text-sm md:text-base">
                Search
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center mt-6 lg:mt-0">
            <div
              className="w-48 md:w-56 lg:w-64 h-auto bg-cover bg-center"
              style={{ backgroundImage: `url('/path/to/your/car-image.png')` }} // Replace with your car image path
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDistrict;
