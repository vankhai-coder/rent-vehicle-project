import React from 'react';
import { DatePickerWithRange } from './DatePickerWithRange';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';

const CarRentalCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex space-x-8 border-t-red-100 border-t-2">
      {/* Left Section */}
      <div className="flex-1 border-r">
        {/* Specific Tour Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Specific Tour</span>
          <div className="flex space-x-2">
            <button className="text-sm text-gray-500">Share</button>
            <button className="text-sm text-gray-500">Save</button>
          </div>
        </div>

        {/* Car Details */}
        <div className="mb-6 p-4 rounded-lg shadow-sm bg-white"> {/* Shadow added here */}
          <h2 className="text-2xl font-semibold">Vauxhall Astra</h2>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm">4.9 (122 reviews)</span>
            <span className="text-sm text-gray-500 ml-2">Tokyo, Japan</span>
          </div>
          <div className="flex items-center mt-4">
            <img
              src="https://randomuser.me/api/portraits/men/15.jpg"
              alt="Car Owner"
              className="rounded-full w-10 h-10 mr-2"
            />
            <span>Car owner Kevin Francis</span>
          </div>
          <div className="flex items-center mt-4 space-x-4">
            <span className="text-sm text-gray-500">5 seats</span>
            <span className="text-sm text-gray-500">4 door</span>
            <span className="text-sm text-gray-500">Auto gearbox</span>
            <span className="text-sm text-gray-500">Cooler</span>
          </div>
        </div>

        {/* Vehicle Parameters & Utilities */}
        <div className="p-4 rounded-lg shadow-sm bg-white"> {/* Shadow added here */}
          <h3 className="text-lg font-semibold mb-2">Vehicle parameters & utilities</h3>
          <p className="text-sm text-gray-500 mb-4">
            Questions are at the heart of making things great.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {/* Utility Items */}
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/992/992683.png"
                alt="Icon"
                className="w-5 h-5"
              />
              <span className="text-sm">59 MPG Combined, 58 City/60 Hwy</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/565/565738.png"
                alt="Icon"
                className="w-5 h-5"
              />
              <span className="text-sm">Forward Collision-Avoidance Assist with Pedestrian Detection (FCA-Ped)</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4202/4202720.png"
                alt="Icon"
                className="w-5 h-5"
              />
              <span className="text-sm">139-hp gas/electric combined</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/447/447265.png"
                alt="Icon"
                className="w-5 h-5"
              />
              <span className="text-sm">Proximity Key with push button start</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1169/1169389.png"
                alt="Icon"
                className="w-5 h-5"
              />
              <span className="text-sm">8-inch color touchscreen display audio</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4308/4308107.png"
                alt="Icon"
                className="w-5 h-5"
              />
              <span className="text-sm">Smart Cruise Control with Stop & Go (SCC)</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/285/285624.png"
                alt="Icon"
                className="w-5 h-5"
              />
              <span className="text-sm">LED Daytime Running Lights (DRL)</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/565/565707.png"
                alt="Icon"
                className="w-5 h-5"
              />
              <span className="text-sm">Blind-Spot Collision Warning (BCW)</span>
            </div>
          </div>
          <button className="mt-4 text-sm text-blue-500">See all car utility</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 ">
        {/* Pick up and drop off */}
        <div className="mb-6 p-4 rounded-lg shadow-sm bg-white"> {/* Shadow added here */}
          <h3 className="text-lg font-semibold mb-2">Pick up and drop off</h3>
          <div className="flex items-center justify-between mb-2">
            
            <Dialog>
              <DialogTrigger>
                <Button variant='outline' className='bg-gray-200'> Pick Up Location </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <span>Monday, August 2 10:00</span>
          </div>
          <div className="flex items-center justify-between mt-4 mb-2">
           
            <Dialog>
              <DialogTrigger>
                <Button variant='outline' className='bg-gray-200'> Drop Off Location </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <span>Tuesday, July 27 10:00</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="p-4 rounded-lg shadow-sm bg-white"> {/* Shadow added here */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-semibold">$311 /day</span>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm">4.9 (122 reviews)</span>
            </div>
          </div>

          {/* date that customer select :  */}
          <div className='my-4'>
            <DatePickerWithRange />
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-sm">$311 x 4 days</span>
            <span className="text-sm">$622</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm">Service charge</span>
            <span className="text-sm">$0</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">$622</span>
          </div>

          <button className="w-full bg-[#5819e0] hover:cursor-pointer hover:bg-black hover:text-white text-white py-2 rounded-lg">Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default CarRentalCard;