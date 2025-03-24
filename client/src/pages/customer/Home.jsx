import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MotobikeList from '@/components/customer/MotobikeList'
import FactsInNumbers from '@/components/customer/FactInNumber'
import DownloadApp from '@/components/customer/DownLoadApp'
import SearchDistrict from '@/components/customer/SearchDistrict'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { searchByDates } from '@/redux/features/motobikeSlice';
const Home = () => {

  const { motobikes, isLoading, error, } = useSelector(state => state.motobike)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(searchByDates({ dates: [["2025-3-18"]] }))
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <>
      {/* hero section :  */}
      <div className='my-4'>
        <div className=" w-full h-[80vh] bg-cover bg-center rounded-4xl flex justify-center items-center" style={{ backgroundImage: "url('/home-page-hero.png')" }}>
          {/* Content */}
          <div className='  bg-red-2d00 w-10/12 h-10/12 flex justify-between items-center'>
            {/* text */}
            <div className='w-6/12'>
              <h2 className='text-white text-4xl font-extrabold mb-6'>Experience the road like never before</h2>
              <p className='text-[#FFFFFF] font-light mb-6'>Find the perfect ride for your journey. Choose from various motorbike types, book easily, and enjoy flexible rental options. Ride with confidence and convenience.</p>
              <Button className='bg-[#FF9E0C]'>View all cars</Button>
            </div>
            {/* form */}
            <div className="w-5/12 h-full bg-[#FFFFFF] rounded-4xl ">
              <div className='p-8 h-full bg-[#FFFFFF] rounded-4xl text-center flex flex-col justify-between'>
                <h3 className='font-bold text-1xl '>Book Your Motobike</h3>
                {/* list of choices :  */}
                <div className='flex flex-col justify-evenly space-y-6 items-center'>
                  <Select className='mx-auto' >
                    <SelectTrigger className="w-10/12 font-medium  bg-gray-200  ">
                      <SelectValue placeholder="Motobike Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select className='mx-auto' >
                    <SelectTrigger className="w-10/12 font-medium  bg-gray-200  ">
                      <SelectValue placeholder="Place Of Rental" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select className='mx-auto' >
                    <SelectTrigger className="w-10/12 font-medium  bg-gray-200  ">
                      <SelectValue placeholder="Place Of Return" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select className='mx-auto ' >
                    <SelectTrigger className="w-10/12 font-medium  bg-gray-200 ">
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
                <Button className='bg-[#FF9E0C]'>Book now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* available-comfort-saving : */}
      <div className='flex items-center justify-between my-10'>
        {/* available :  */}
        <div className='flex flex-col justify-center items-center w-1/4 text-center space-y-2'>
          <LocationOnOutlinedIcon sx={{ fontSize: 50 }} />
          <span className='text-2xl font-semibold'>Availability</span>
          <p className='text-sm/6'>Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis</p>
        </div>
        {/* available :  */}
        <div className='flex flex-col justify-center items-center w-1/4 text-center space-y-2'>
          <TwoWheelerOutlinedIcon sx={{ fontSize: 50 }} />
          <span className='text-2xl font-semibold'>Comfort</span>
          <p className='text-sm/6'>Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis</p>
        </div>
        {/* available :  */}
        <div className='flex flex-col justify-center items-center w-1/4 text-center space-y-2'>
          <MonetizationOnOutlinedIcon sx={{ fontSize: 50 }} />
          <span className='text-2xl font-semibold'>Saving</span>
          <p className='text-sm/6'>Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis</p>
        </div>
      </div>
      {/* blur image and text :  */}
      <div className='flex justify-evenly items-center'>
        {/* image */}
        <div className=" w-5/12 h-[60vh] bg-cove bg-center rounded-4xl flex justify-center items-center" style={{ backgroundImage: "url('/home-page-hero.png')" }}>
        </div>
        {/* text : */}
        <div className='w-5/12 h-[60vh] flex flex-col justify-between py-4'>
          <div>
            <LooksOneOutlinedIcon className='text-[#5937E0] font-black' />
            <span className='ml-4 font-medium'>Erat at semper </span>
            <p className='text-start font-extralight'> Non amet fermentum est in enim at sit ullamcorper. Sit elementum rhoncus nullam feugiat. Risus sem fermentum</p>
          </div>
          <div>
            <LooksTwoOutlinedIcon className='text-[#5937E0] font-black' />
            <span className='ml-4 font-medium'>Erat at semper </span>
            <p className='text-start font-extralight'> Non amet fermentum est in enim at sit ullamcorper. Sit elementum rhoncus nullam feugiat. Risus sem fermentum</p>
          </div>
          <div>
            <Looks3OutlinedIcon className='text-[#5937E0] font-black' />
            <span className='ml-4 font-medium'>Erat at semper </span>
            <p className='text-start font-extralight'> Non amet fermentum est in enim at sit ullamcorper. Sit elementum rhoncus nullam feugiat. Risus sem fermentum</p>
          </div>
          <div>
            <Looks4OutlinedIcon className='text-[#5937E0] font-black' />
            <span className='ml-4 font-medium'>Erat at semper </span>
            <p className='text-start font-extralight'> Non amet fermentum est in enim at sit ullamcorper. Sit elementum rhoncus nullam feugiat. Risus sem fermentum</p>
          </div>
        </div>
      </div>
      {/* choose motobike :  */}
      <div className='flex items-center justify-between mx-8 mt-20 mb-10'>
        <div className='w-7/12 font-bold text-4xl'>
          Choose the car that
          suits you
        </div>
        <Button>
          <span>
            View All
            <ArrowForwardIcon />
          </span>
        </Button>
      </div>
      {/* list of motobike :  */}
      <div className='mb-10'>
        <MotobikeList motobikes={motobikes} />
      </div>
      {/* fact in number :  */}
      <FactsInNumbers />
      {/* download app :  */}
      <div className='mb-10'>
        <DownloadApp />

      </div>
      {/* search district :  */}
      <div className='mb-10'>
        <SearchDistrict />
      </div>
    </>

  )
}

export default Home