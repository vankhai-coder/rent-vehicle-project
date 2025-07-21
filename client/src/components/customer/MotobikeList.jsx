import { createBooking } from "@/redux/features/customer/bookingSlice";
import { formatNumberWithCommas } from "@/utils/formatFunction";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MotobikeCard = ({
  image,
  price,
  name,
  addOns,
  district,
  reviews,
  motobike,
  ownerId,
  height,
  weight,
}) => {
  const navigate = useNavigate();
  // redux :
  const dispatch = useDispatch();

  return (
    <div
      className="w-full border border-gray-300 rounded-lg p-3 md:p-4 font-sans shadow-md hover:opacity-70 transition-opacity duration-200"
      // navigate to detail page :
      onClick={() => {
        window.scrollTo(0, 0);
        navigate("/detail");
        dispatch(
          createBooking({
            image,
            price,
            name,
            district,
            ownerId,
            motobike,
            height,
            weight,
          })
        );
      }}
    >
      {/* Image */}
      <div className="text-center mt-2 md:mt-4 relative">
        <img
          src={image}
          alt={name}
          className="w-full h-auto max-w-64 mx-auto"
        />
        {/* Price and Pay Later Section */}
        <div className="flex justify-between items-center absolute top-0 left-0 right-0 p-2 md:p-3">
          <div>
            <div className="text-sm md:text-xl font-bold text-gray-800">
              {formatNumberWithCommas(price)} VND /day
            </div>
          </div>
          <div>
            <button className="bg-blue-50 hover:bg-blue-100 border-none py-1 md:py-2 px-2 md:px-3 rounded-md text-xs text-blue-500 cursor-pointer">
              Pay later
            </button>
            <div className="text-xs text-green-500 mt-1">Free Cancellation</div>
          </div>
        </div>
        {/* Icons */}
        <div className="flex justify-around mt-2 md:mt-4 absolute right-0 left-0 bottom-0 px-2">
          {addOns.slice(0, 5).map((icon, index) => (
            <div
              key={index}
              className="w-6 h-6 md:w-7 md:h-7 bg-gray-100 rounded-full flex justify-center items-center"
            >
              <img
                src={icon.image}
                alt="addon"
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </div>
          ))}
          {addOns.length > 5 && (
            <div className="text-xs text-gray-600 self-center">
              + {addOns.length - 5} more
            </div>
          )}
        </div>
      </div>
      {/* Title and Type */}
      <div className="mt-3 md:mt-4">
        <div className="text-base md:text-lg font-bold text-gray-800">
          {name}
        </div>
      </div>
      {/* Location and Details Button */}
      <div className="flex justify-between items-center mt-3 md:mt-4">
        <div>
          <span className="text-xs md:text-sm text-blue-500 align-middle">
            {district}
          </span>
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 border-none py-1 md:py-2 px-3 md:px-4 rounded-md text-xs md:text-sm text-white cursor-pointer">
            DETAILS
          </button>
        </div>
      </div>
      {/* Reviews */}
      <div className="text-xs text-gray-600 mt-2">New • {reviews} Reviews</div>
    </div>
  );
};

const MotobikeList = ({ motobikes }) => {
  if (motobikes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p className="text-lg md:text-xl">
          Can't find vehicle that match this filter!
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {motobikes.map((bike, index) => (
        <MotobikeCard key={index} {...bike} />
      ))}
    </div>
  );
};

export default MotobikeList;
