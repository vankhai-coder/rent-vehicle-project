import React from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


const MotobikeCard = () => {
  return (
        <div className="w-72 border border-gray-300 rounded-lg p-4 font-sans shadow-md">
         
    
          {/* Image */}
          <div className="text-center mt-4 relative" >
            <img
              src="https://cdn.riderly.com/storage/media/img/bikes/Yamaha__Exciter_135.png" // Replace with your image path
              alt="Yamaha Exciter 135"
              className="w-64 h-auto"
            />
             {/* Price and Pay Later Section */}
          <div className="flex justify-between items-center absolute top-0 left-0 right-0">
            <div>
              <div className="text-xl font-bold text-gray-800">4 € /day</div>
              <div className="text-sm text-gray-600">11,00 € total</div>
            </div>
            <div>
              <button className="bg-blue-50 hover:bg-blue-100 border-none py-2 px-3 rounded-md text-xs text-blue-500 cursor-pointer">
                Pay later
              </button>
              <div className="text-xs text-green-500 mt-1">Free Cancellation</div>
            </div>
          </div>
           {/* Icons */}
           <div className="flex justify-around mt-4 absolute right-0 left-0 bottom-0">
            <div className="w-7 h-7 bg-gray-100 rounded-full flex justify-center items-center">
              <img src="https://cdn.riderly.com/storage/media/img/addons/bungee_cords.svg" alt="Helmet" className="w-5 h-5" /> {/* Replace with your icon path */}
            </div>
            <div className="w-7 h-7 bg-gray-100 rounded-full flex justify-center items-center">
              <img src="jacket-icon.png" alt="Jacket" className="w-5 h-5" /> {/* Replace with your icon path */}
            </div>
            <div className="w-7 h-7 bg-gray-100 rounded-full flex justify-center items-center">
              <img src="rain-icon.png" alt="Rain Gear" className="w-5 h-5" /> {/* Replace with your icon path */}
            </div>
            <div className="w-7 h-7 bg-gray-100 rounded-full flex justify-center items-center">
              <img src="lock-icon.png" alt="Lock" className="w-5 h-5" /> {/* Replace with your icon path */}
            </div>
            <div className="w-7 h-7 bg-gray-100 rounded-full flex justify-center items-center">
              <img src="phone-icon.png" alt="Phone Holder" className="w-5 h-5" /> {/* Replace with your icon path */}
            </div>
            <div className="text-xs text-gray-600 self-center">+ 15 more</div>
          </div>
          </div>
          {/* Title and Type */}
          <div className="mt-4">
            <div className="text-lg font-bold text-gray-800">Yamaha Exciter 135</div>
            <div className="text-sm text-gray-600">Scooter</div>
          </div>
    
          {/* Location and Details Button */}
          <div className="flex justify-between items-center mt-4">
            <div>
               <LocationOnOutlinedIcon className="w-5 h-5 inline-block align-middle mr-1" />
              <span className="text-sm text-blue-500 align-middle">Xuan Ha</span>
            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 border-none py-2 px-4 rounded-md text-sm text-white cursor-pointer">
                DETAILS
              </button>
            </div>
          </div>
    
          {/* New and Reviews */}
          <div className="text-xs text-gray-600 mt-2">New • 0 Reviews</div>
        </div>
      );
    };
    

export default MotobikeCard