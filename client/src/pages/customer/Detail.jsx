import OwnerProfile from "@/components/customer/OwnerProfileCard";
import ReviewSection from "@/components/customer/ReviewSection";
import Booking from '@/components/customer/Booking'
import { useDispatch, useSelector } from "react-redux";
import { parse, differenceInCalendarDays } from "date-fns";
import { DatePickerWithRange } from "@/components/customer/DatePickerWithRange";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../../components/ui/button';
import { useEffect, useState } from "react";
import { clearBooking, reserveBooking, setBookedDate } from "@/redux/features/bookingSlice";
import { useStepContext } from "@mui/material";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

function Details() {

    // redux : 
    const { success, loading, image, price, name, district, ownerId, motobike, height, weight, bookedDate } = useSelector(state => state.booking)
    const { userId } = useSelector(state => state.user)
    const dispatch = useDispatch()
    // navigate : 
    const navigate = useNavigate()

    // state : 
    const [pickUpLocation, setPickUpLocation] = useState('')
    const [dropOffLocation, setDropOffLocation] = useState('')

    // fake owner : 
    const ownerData = {
        name: 'Kevin Francis',
        image: 'URL_TO_YOUR_IMAGE', // Replace with your image URL
        bio: 'Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities...',
        reviews: '4.9 (122)',
        joinDate: 'March 2016',
        numberOfStores: '12',
    };
    // fake reviews : 
    const reviewsData = {
        numberOfReviews: 23,
        arrayOfReviews: [
            {
                image: 'https://th.bing.com/th/id/OIP.52T8HHBWh6b0dwrG6tSpVQHaFe?w=268&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7', // Replace with your image URL
                name: 'Cody Fisher',
                date: 'May 20, 2021',
                review: "There's no stopping the tech giant. Apple now opens its 100th store in China. There's no stopping the tech giant.",
                star: 4,
            },
            {
                image: 'https://www.bing.com/th?id=OIP.X-JqVACjNxeLg2En75r6IwHaFA&w=312&h=200&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2', // Replace with your image URL
                name: 'Cody Fisher',
                date: 'May 20, 2021',
                review: "There's no stopping the tech giant. Apple now opens its 100th store in China. There's no stopping the tech giant.",
                star: 4,
            },
            {
                image: 'URL_TO_USER_IMAGE_3', // Replace with your image URL
                name: 'Cody Fisher',
                date: 'May 20, 2021',
                review: "There's no stopping the tech giant. Apple now opens its 100th store in China. There's no stopping the tech giant.",
                star: 4,
            },
        ],
    };

    // functions : 

    function calculateDays(input) {
        const format = "MMM d, yyyy";
        const dates = input.split(" - ").map(date => parse(date.trim(), format, new Date()));

        return dates.length === 1 ? 1 : differenceInCalendarDays(dates[1], dates[0]) + 1;
    }
    function formatNumberWithCommas(number) {
        return number.toLocaleString("en-US");
    }
    const generateDateArray = (dateRange) => {
        const months = {
            Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
            Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
        };

        // Split the range and parse both dates
        const parts = dateRange.split(" - ");
        const parseDate = (dateStr) => {
            const [month, day, year] = dateStr.replace(",", "").split(" ");
            return new Date(year, months[month] - 1, parseInt(day)); // Month is 0-based in JS Date
        };

        const startDate = parseDate(parts[0]);
        const endDate = parts.length > 1 ? parseDate(parts[1]) : parseDate(parts[0])

        // Generate date range array
        let result = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            result.push(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return result;
    };
    // handleReserve :
    const handleReserve = () => {
        // if not login : 
        if (!userId) {
            toast.error('You must login to reserve!')
            return
        }
        // if miss pick up : 
        if (!pickUpLocation) {
            toast.error('Choose pick up location please!')
            return
        }
        // if miss drop off  : 
        if (!dropOffLocation) {
            toast.error('Choose drop off location please!')
            return
        }
        // booking : 
        // console.log({ ownerId, motobike, totalPrice: price * calculateDays(bookedDate) , bookedDate : generateDateArray(bookedDate) , amountMotobike : 1 , pickUpLocation , dropOffLocation });

        dispatch(reserveBooking({ ownerId, motobike: [motobike], totalPrice: price * calculateDays(bookedDate), bookedDate: generateDateArray(bookedDate), amountMotobike: 1, pickUpLocation, dropOffLocation }))
        // return to home page :
        dispatch(clearBooking())
        window.scrollTo(0, 0);
        toast.success('Reserve Successfully!')
        navigate('/')
    }
    return (
        <div>
            <div className="flex flex-col md:flex-row p-8 bg-white max-w-4xl mx-auto">
                {/* Left Side (Car Info) */}
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-2">{name}</h1>
                    <p className="text-2xl text-gray-700 mb-4">VND{price} / day</p>
                    <div className="bg-gray-200 h-64 w-full mb-4 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url("${image}")` }}>
                        {/* Placeholder for Car Image */}
                    </div>
                    <div className="flex space-x-2">
                        <div className="bg-gray-200 h-20 w-20 rounded-lg"></div>
                        <div className="bg-gray-200 h-20 w-20 rounded-lg"></div>
                        <div className="bg-gray-200 h-20 w-20 rounded-lg"></div>
                    </div>
                </div>

                {/* Right Side (Technical Specs and Equipment) */}
                <div className="md:w-1/2 md:pl-8">
                    <h2 className="text-2xl font-semibold mb-4">Technical Specification</h2>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {/* Gear Box */}
                        <div className="text-center bg-gray-100 rounded-2xl p-4">
                            <img
                                src="https://cdn.riderly.com/storage/media/img/addons/extra_helmet.svg"
                                alt="Gear"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Gear Box</p>
                            <p className="text-xs">Automat</p>
                        </div>

                        {/* Fuel */}
                        <div className="text-center bg-gray-100 rounded-2xl p-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/921/921063.png" // Fuel pump icon
                                alt="Fuel"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Fuel</p>
                            <p className="text-xs">Petrol</p>
                        </div>

                        {/* Doors */}
                        <div className="text-center bg-gray-100 rounded-2xl p-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/594/594777.png" // Car door icon
                                alt="Doors"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Doors</p>
                            <p className="text-xs">2</p>
                        </div>

                        {/* Air Conditioner */}
                        <div className="text-center bg-gray-100 rounded-2xl p-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/977/977114.png" // Air conditioner icon
                                alt="AC"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Air Conditioner</p>
                            <p className="text-xs">Yes</p>
                        </div>

                        {/* Seats */}
                        <div className="text-center bg-gray-100 rounded-2xl p-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/483/483610.png" // Car seat icon
                                alt="Seats"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Seats</p>
                            <p className="text-xs">5</p>
                        </div>

                        {/* Distance */}
                        <div className="text-center bg-gray-100 rounded-2xl p-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/447/447548.png" // Speedometer or odometer icon
                                alt="Distance"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Distance</p>
                            <p className="text-xs">500</p>
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Motobike Equipment</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>ABS</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>ABS</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Air Bags</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Air Bags</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Cruise Control</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Air Conditioner</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* booking section :  */}
            <div>
                <h1 className="text-center text-3xl font-bold">Reserve now!</h1>
            </div>
            <div className="my-6">
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
                            {/* PICK UP :  */}
                            <div className="flex items-center justify-between mb-2">
                                <Dialog>
                                    <DialogTrigger>
                                        <Button variant='outline' className='bg-gray-200'> Pick Up Location </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Enter Pick Up Location</DialogTitle>
                                            <DialogDescription>
                                                <Input type='text' placeholder='Pick up...' onChange={(e) => { setPickUpLocation(e.target.value) }} />
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <span>{pickUpLocation}</span>
                            </div>
                            {/* DROP OFF */}
                            <div className="flex  items-center justify-between mt-4 mb-2">
                                <Dialog>
                                    <DialogTrigger>
                                        <Button variant='outline' className='bg-gray-200'> Drop Off Location </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Enter Drop Off Location</DialogTitle>
                                            <DialogDescription>
                                                <Input type='text' placeholder='Drop off...' onChange={(e) => { setDropOffLocation(e.target.value) }} />
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <span>{dropOffLocation}</span>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="p-4 rounded-lg shadow-sm bg-white"> {/* Shadow added here */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-2xl font-semibold">VND {price} /day</span>
                                <div className="flex items-center">
                                    <span className="text-yellow-500 mr-1">★</span>
                                    <span className="text-sm">4.9 (122 reviews)</span>
                                </div>
                            </div>

                            {/* date that customer select :  */}
                            <div className='my-4'>
                                <Button >{bookedDate}</Button>
                            </div>

                            <div className="flex justify-between mb-2">
                                <span className="text-sm">VND {formatNumberWithCommas(price)} x {calculateDays(bookedDate)} days</span>
                                <span className="text-sm">VND {formatNumberWithCommas(calculateDays(bookedDate) * price)}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-sm">Service charge</span>
                                <span className="text-sm">$0</span>
                            </div>
                            <div className="flex justify-between mb-6">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-lg font-semibold">VND {formatNumberWithCommas(calculateDays(bookedDate) * price)}</span>
                            </div>
                            {/* Reserve botton :  */}
                            <button className="w-full bg-[#5819e0] hover:cursor-pointer
                             hover:bg-black
                             hover:text-white text-white py-2 rounded-lg"
                                onClick={() => {
                                    handleReserve()
                                }}

                            >{loading ? <Loader className='animate-spin text-center' /> : 'Reserve'}</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* owner profile */}
            <div className="flex justify-between gap-8">
                {/* owner profile :  */}
                <div className="flex justify-start w-1/2">
                    <OwnerProfile
                        name={ownerData.name}
                        image={ownerData.image}
                        bio={ownerData.bio}
                        reviews={ownerData.reviews}
                        joinDate={ownerData.joinDate}
                        numberOfStores={ownerData.numberOfStores}
                    />
                </div>
                {/* review sections :  */}
                <div className="w-1/2">
                    <ReviewSection
                        numberOfReviews={reviewsData.numberOfReviews}
                        arrayOfReviews={reviewsData.arrayOfReviews}
                    />
                </div>
            </div>
            {/* thing to know ; */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md ml-0 my-10">
                <h2 className="text-lg font-semibold mb-4">Things to know</h2>

                <div className="mb-4">
                    <h3 className="text-base font-medium mb-2">Free cancellation</h3>
                    <p className="text-sm text-gray-600">
                        Lock in this fantastic price today, cancel free of charge anytime. Reserve now and pay at pick-up.
                    </p>
                </div>

                <div>
                    <h3 className="text-base font-medium mb-2">Special Note</h3>
                    <p className="text-sm text-gray-600">
                        We asked ourselves, "How can we make the dash not only look better, but also give the driver a better look outside?" The unexpected answer is having no hood above the available 10.25-inch digital instrument cluster...
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Details;