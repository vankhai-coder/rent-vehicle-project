import { createBooking } from "@/redux/features/customer/bookingSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MotobikeCard = ({ image, price, name, addOns, district, reviews, motobike, ownerId, height, weight, selectedDates }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCardClick = () => {
    console.log('Motobike data being dispatched:', { image, price, name, district, ownerId, motobike, height, weight, bookedDate: selectedDates });
    
    // Dispatch the booking data first
    dispatch(createBooking({ image, price, name, district, ownerId, motobike, height, weight, bookedDate: selectedDates }))
    
    // Then navigate after a small delay to ensure Redux state is updated
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate('/rental-check')
    }, 200)
  }

  return (
    <div className="w-full border border-gray-300 rounded-lg p-4 font-sans shadow-md hover:shadow-lg transition-all duration-200">
      {/* Image */}
      <div className="text-center mt-4 relative">
        <img src={image} alt={name} className="w-64 h-auto" />
        {/* Price and Pay Later Section */}
        <div className="flex justify-between items-center absolute top-0 left-0 right-0">
          <div>
            <div className="text-xl font-bold text-gray-800">{price} VND /day</div>
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
          {addOns.slice(0, 5).map((icon, index) => (
            <div key={index} className="w-7 h-7 bg-gray-100 rounded-full flex justify-center items-center">
              <img src={icon.image} alt="addon" className="w-5 h-5" />
            </div>
          ))}
          {addOns.length > 5 && <div className="text-xs text-gray-600 self-center">+ {addOns.length - 5} more</div>}
        </div>
      </div>
      {/* Title and Type */}
      <div className="mt-4">
        <div className="text-lg font-bold text-gray-800">{name}</div>
      </div>
      {/* Location and Details Button */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-sm text-blue-500 align-middle">{district}</span>
        </div>
        <div>
          <button 
            onClick={handleCardClick}
            disabled={!selectedDates || selectedDates.length === 0}
            className={`border-none py-2 px-4 rounded-md text-sm text-white cursor-pointer transition-colors duration-200 ${
              selectedDates && selectedDates.length > 0 
                ? 'bg-blue-500 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedDates && selectedDates.length > 0 ? 'RENT NOW' : 'SELECT DATES FIRST'}
          </button>
        </div>
      </div>
      {/* Reviews */}
      <div className="text-xs text-gray-600 mt-2">New • {reviews} Reviews</div>
    </div>
  );
};

const MotobikeList = ({ motobikes, selectedDates = [] }) => {
  if (motobikes.length === 0) {
    return <div>Cant find vehicle that match this filter!</div>
  }
  return (
    <div className="grid grid-cols-3 gap-8">
      {motobikes.map((bike, index) => (
        <MotobikeCard key={index} {...bike} selectedDates={selectedDates} />
      ))}
    </div>
  );
};

export default MotobikeList;