import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TwoWheelerOutlinedIcon from "@mui/icons-material/TwoWheelerOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import Looks4OutlinedIcon from "@mui/icons-material/Looks4Outlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MotobikeList from "@/components/customer/MotobikeList";
import FactsInNumbers from "@/components/customer/FactInNumber";
import DownloadApp from "@/components/customer/DownLoadApp";
import SearchDistrict from "@/components/customer/SearchDistrict";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { searchByDates } from "@/redux/features/customer/motobikeSlice";
const Home = () => {
  const { motobikes, isLoading, error } = useSelector(
    (state) => state.motobike
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchByDates({ dates: [["2025-3-18"]] }));
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      {/* hero section :  */}
      <div className="my-4 px-4 md:px-6 lg:px-8">
        <div
          className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center rounded-2xl md:rounded-4xl flex justify-center items-center"
          style={{ backgroundImage: "url('/home-page-hero.png')" }}
        >
          {/* Content */}
          <div className="w-full md:w-11/12 lg:w-10/12 h-full flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 text-center">
            {/* text */}
            <div className="w-full text-center">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 md:mb-6">
                Experience the road like never before
              </h2>
              <p className="text-[#FFFFFF] font-light mb-4 md:mb-6 text-sm md:text-base">
                Find the perfect ride for your journey. Choose from various
                motorbike types, book easily, and enjoy flexible rental options.
                Ride with confidence and convenience.
              </p>
              <Button className="bg-[#FF9E0C] text-sm md:text-base">
                View all cars
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Section - riêng biệt */}
      <div className="my-4 px-4 md:px-6 lg:px-8">
        <div className="w-full bg-[#FFFFFF] rounded-2xl md:rounded-4xl shadow-lg">
          <div className="p-4 md:p-6 lg:p-8 text-center">
            <h3 className="font-bold text-lg md:text-xl mb-4 md:mb-6">
              Book Your Motobike
            </h3>
            {/* list of choices :  */}
            <div className="flex flex-col justify-evenly space-y-4 md:space-y-6 items-center mb-4 md:mb-6">
              <Select className="w-full max-w-md">
                <SelectTrigger className="w-full font-medium bg-gray-200">
                  <SelectValue placeholder="Motobike Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select className="w-full max-w-md">
                <SelectTrigger className="w-full font-medium bg-gray-200">
                  <SelectValue placeholder="Place Of Rental" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select className="w-full max-w-md">
                <SelectTrigger className="w-full font-medium bg-gray-200">
                  <SelectValue placeholder="Place Of Return" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select className="w-full max-w-md">
                <SelectTrigger className="w-full font-medium bg-gray-200">
                  <SelectValue placeholder="Date Of Rental" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* button rent :  */}
            <Button className="bg-[#FF9E0C] w-full max-w-md text-sm md:text-base">
              Book now
            </Button>
          </div>
        </div>
      </div>

      {/* available-comfort-saving : */}
      <div className="flex flex-col md:flex-row items-center justify-between my-8 md:my-10 px-4 md:px-6 lg:px-8 space-y-6 md:space-y-0">
        {/* available :  */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/4 text-center space-y-2">
          <LocationOnOutlinedIcon sx={{ fontSize: 40, md: { fontSize: 50 } }} />
          <span className="text-xl md:text-2xl font-semibold">
            Availability
          </span>
          <p className="text-sm md:text-base text-gray-600 px-4">
            Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis
          </p>
        </div>
        {/* comfort :  */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/4 text-center space-y-2">
          <TwoWheelerOutlinedIcon sx={{ fontSize: 40, md: { fontSize: 50 } }} />
          <span className="text-xl md:text-2xl font-semibold">Comfort</span>
          <p className="text-sm md:text-base text-gray-600 px-4">
            Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis
          </p>
        </div>
        {/* saving :  */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/4 text-center space-y-2">
          <MonetizationOnOutlinedIcon
            sx={{ fontSize: 40, md: { fontSize: 50 } }}
          />
          <span className="text-xl md:text-2xl font-semibold">Saving</span>
          <p className="text-sm md:text-base text-gray-600 px-4">
            Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis
          </p>
        </div>
      </div>

      {/* blur image and text :  */}
      <div className="flex flex-col lg:flex-row justify-evenly items-center px-4 md:px-6 lg:px-8 space-y-6 lg:space-y-0">
        {/* image */}
        <div
          className="w-full lg:w-5/12 h-[40vh] md:h-[50vh] lg:h-[60vh] bg-cover bg-center rounded-2xl md:rounded-4xl"
          style={{ backgroundImage: "url('/home-page-hero.png')" }}
        ></div>
        {/* text : */}
        <div className="w-full lg:w-5/12 h-auto lg:h-[60vh] flex flex-col justify-between py-4 space-y-4 md:space-y-6">
          <div className="flex items-start space-x-3">
            <LooksOneOutlinedIcon className="text-[#5937E0] font-black text-xl md:text-2xl flex-shrink-0 mt-1" />
            <div>
              <span className="font-medium text-base md:text-lg">
                Erat at semper{" "}
              </span>
              <p className="text-start font-extralight text-sm md:text-base text-gray-600">
                {" "}
                Non amet fermentum est in enim at sit ullamcorper. Sit elementum
                rhoncus nullam feugiat. Risus sem fermentum
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <LooksTwoOutlinedIcon className="text-[#5937E0] font-black text-xl md:text-2xl flex-shrink-0 mt-1" />
            <div>
              <span className="font-medium text-base md:text-lg">
                Erat at semper{" "}
              </span>
              <p className="text-start font-extralight text-sm md:text-base text-gray-600">
                {" "}
                Non amet fermentum est in enim at sit ullamcorper. Sit elementum
                rhoncus nullam feugiat. Risus sem fermentum
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Looks3OutlinedIcon className="text-[#5937E0] font-black text-xl md:text-2xl flex-shrink-0 mt-1" />
            <div>
              <span className="font-medium text-base md:text-lg">
                Erat at semper{" "}
              </span>
              <p className="text-start font-extralight text-sm md:text-base text-gray-600">
                {" "}
                Non amet fermentum est in enim at sit ullamcorper. Sit elementum
                rhoncus nullam feugiat. Risus sem fermentum
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Looks4OutlinedIcon className="text-[#5937E0] font-black text-xl md:text-2xl flex-shrink-0 mt-1" />
            <div>
              <span className="font-medium text-base md:text-lg">
                Erat at semper{" "}
              </span>
              <p className="text-start font-extralight text-sm md:text-base text-gray-600">
                {" "}
                Non amet fermentum est in enim at sit ullamcorper. Sit elementum
                rhoncus nullam feugiat. Risus sem fermentum
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* choose motobike :  */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mx-4 md:mx-6 lg:mx-8 mt-16 md:mt-20 mb-8 md:mb-10 space-y-4 md:space-y-0">
        <div className="w-full md:w-7/12 font-bold text-2xl md:text-3xl lg:text-4xl">
          Choose the car that suits you
        </div>
        <Button className="w-full md:w-auto">
          <span className="flex items-center space-x-2">
            View All
            <ArrowForwardIcon />
          </span>
        </Button>
      </div>

      {/* list of motobike :  */}
      <div className="mb-8 md:mb-10 px-4 md:px-6 lg:px-8">
        <MotobikeList motobikes={motobikes} />
      </div>

      {/* fact in number :  */}
      <div className="px-4 md:px-6 lg:px-8">
        <FactsInNumbers />
      </div>

      {/* download app :  */}
      <div className="mb-8 md:mb-10 px-4 md:px-6 lg:px-8">
        <DownloadApp />
      </div>

      {/* search district :  */}
      <div className="mb-8 md:mb-10 px-4 md:px-6 lg:px-8">
        <SearchDistrict />
      </div>
    </>
  );
};

export default Home;
