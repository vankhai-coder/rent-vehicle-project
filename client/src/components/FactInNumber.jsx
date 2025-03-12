import React from 'react';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';

const FactsInNumbers = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[500px] flex items-center justify-center rounded-4xl  text-black"
      style={{ backgroundImage: `url('/factInNumber.png')` }} // Replace with your image path
    >
      {/* <div className="absolute inset-0 bg-purple-100 opacity-"></div> */}
      <div className="relative z-10 text-center px-4 md:px-8 lg:px-16">
        <h2 className="text-4xl font-bold mb-4 text-white">Facts In Numbers</h2>
        <p className="text-lg mb-8 text-white">
          Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien bibendum ullamcorper in.
          Diam tincidunt tincidunt erat at semper fermentum.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              {/* <img src="/path/to/car-icon.png" alt="Cars"  /> */}
             
            </div>
            <p className="text-3xl font-bold">540+</p>
            <p className="text-lg">Car of</p>
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center shadow-md">
            <div className="bg-yellow-400 p-3 rounded-lg mr-4">
            < DriveEtaOutlinedIcon className="size-10" />
            </div>
            <div>
              <div className="text-2xl font-semibold">540+</div>
              <div className="text-gray-600">Cars</div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <img src="/path/to/calendar-icon.png" alt="Years" className="h-8 w-8" />
            </div>
            <p className="text-3xl font-bold">25+</p>
            <p className="text-lg">Year of</p>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <img src="/path/to/miles-icon.png" alt="Miles" className="h-8 w-8" />
            </div>
            <p className="text-3xl font-bold">20m+</p>
            <p className="text-lg">Miles of</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactsInNumbers;