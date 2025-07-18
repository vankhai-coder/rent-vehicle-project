import OwnerProfile from "@/components/customer/OwnerProfileCard";
import ReviewSection from "@/components/customer/ReviewSection";
import Booking from "@/components/customer/Booking";
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
} from "@/components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import {
  clearBooking,
  reserveBooking,
} from "@/redux/features/customer/bookingSlice";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { formatNumberWithCommas } from "@/utils/formatFunction";

function Details() {
  // redux :
  const {
    loading,
    image,
    price,
    name,
    ownerId,
    motobike,
    bookedDate,
    paymentLink,
  } = useSelector((state) => state.booking);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // state :
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");

  // fake owner :
  const ownerData = {
    name: "Duc Thanh",
    image: "URL_TO_YOUR_IMAGE",
    bio: "There's no stopping the tech giant.",
    reviews: "4.9 (122)",
    joinDate: "March 2024",
    numberOfStores: "2",
  };
  // fake reviews :
  const reviewsData = {
    numberOfReviews: 23,
    arrayOfReviews: [
      {
        image: "URL_TO_USER_IMAGE_3",
        name: "Thai Bao",
        date: "March 20, 2025",
        review:
          "Good motobile , i feel good to drive it. There's no stopping the tech giant.",
        star: 4,
      },
      {
        image: "URL_TO_USER_IMAGE_3",
        name: "Van Khai",
        date: "March 18, 2025",
        review:
          "Good motobile , i feel good to drive it. There's no stopping the tech giant.",
        star: 4,
      },
      {
        image: "URL_TO_USER_IMAGE_3",
        name: "Thai Bao",
        date: "March 15, 2025",
        review:
          "Good motobile , i feel good to drive it. There's no stopping the tech giant.",
        star: 4,
      },
    ],
  };

  // functions :

  function calculateDays(input) {
    const format = "MMM d, yyyy";
    const dates = input
      .split(" - ")
      .map((date) => parse(date.trim(), format, new Date()));

    return dates.length === 1
      ? 1
      : differenceInCalendarDays(dates[1], dates[0]) + 1;
  }

  const generateDateArray = (dateRange) => {
    const months = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };

    // Split the range and parse both dates
    const parts = dateRange.split(" - ");
    const parseDate = (dateStr) => {
      const [month, day, year] = dateStr.replace(",", "").split(" ");
      return new Date(year, months[month] - 1, parseInt(day)); // Month is 0-based in JS Date
    };

    const startDate = parseDate(parts[0]);
    const endDate =
      parts.length > 1 ? parseDate(parts[1]) : parseDate(parts[0]);

    // Generate date range array
    let result = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      result.push(
        `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  };
  // handleReserve :
  const handleReserve = async () => {
    // if not login :
    if (!userId) {
      toast.error("You must login to reserve!");
      return;
    }
    // if miss pick up :
    if (!pickUpLocation) {
      toast.error("Choose pick up location please!");
      return;
    }
    // if miss drop off  :
    if (!dropOffLocation) {
      toast.error("Choose drop off location please!");
      return;
    }
    // booking :
    // console.log({ ownerId, motobike, totalPrice: price * calculateDays(bookedDate) , bookedDate : generateDateArray(bookedDate) , amountMotobike : 1 , pickUpLocation , dropOffLocation });

    await dispatch(
      reserveBooking({
        ownerId,
        motobike: [motobike],
        totalPrice: price * calculateDays(bookedDate),
        bookedDate: generateDateArray(bookedDate),
        amountMotobike: 1,
        pickUpLocation,
        dropOffLocation,
      })
    );
    // return to home page :
    await dispatch(clearBooking());
  };
  useEffect(() => {
    if (paymentLink) {
      window.open(paymentLink, "_blank"); // mở ở tab mới
    }
    // clean up function to delete :
    return () => {
      dispatch(clearBooking());
    };
  }, [paymentLink,dispatch]);

  return (
    <div>
      <div className="flex flex-col md:flex-row p-8 bg-white max-w-4xl mx-auto">
        {/* Left Side (Car Info) */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-2xl text-gray-700 mb-4">
            VND{formatNumberWithCommas(price)} / day
          </p>
          <div
            className="bg-gray-200 h-64 w-full mb-4 rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url("${image}")` }}
          >
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
          <h2 className="text-2xl font-semibold mb-4">
            Technical Specification
          </h2>
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
              <p className="text-xs">No</p>
            </div>

            {/* Seats */}
            <div className="text-center bg-gray-100 rounded-2xl p-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/483/483610.png" // Car seat icon
                alt="Seats"
                className="mx-auto h-8 mb-2"
              />
              <p className="text-md font-bold">Seats</p>
              <p className="text-xs">2</p>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>ABS</p>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>ABS</p>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>Air Bags</p>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>Air Bags</p>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>Cruise Control</p>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
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

          {/* Right Section */}
          <div className="flex-1 ">
            {/* Pick up and drop off */}
            <div className="mb-6 p-4 rounded-lg shadow-sm bg-white">
              {" "}
              {/* Shadow added here */}
              <h3 className="text-lg font-semibold mb-2">
                Pick up and drop off
              </h3>
              {/* PICK UP :  */}
              <div className="flex items-center justify-between mb-2">
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline" className="bg-gray-200">
                      {" "}
                      Pick Up Location{" "}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Enter Pick Up Location</DialogTitle>
                      <DialogDescription>
                        <Input
                          type="text"
                          placeholder="Pick up..."
                          onChange={(e) => {
                            setPickUpLocation(e.target.value);
                          }}
                        />
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
                    <Button variant="outline" className="bg-gray-200">
                      {" "}
                      Drop Off Location{" "}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Enter Drop Off Location</DialogTitle>
                      <DialogDescription>
                        <Input
                          type="text"
                          placeholder="Drop off..."
                          onChange={(e) => {
                            setDropOffLocation(e.target.value);
                          }}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <span>{dropOffLocation}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-lg shadow-sm bg-white">
              {" "}
              {/* Shadow added here */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-semibold">
                  VND {formatNumberWithCommas(price)} /days
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm">4.9 (122 reviews)</span>
                </div>
              </div>
              {/* date that customer select :  */}
              <div className="my-4">
                <Button>{bookedDate}</Button>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">
                  VND {formatNumberWithCommas(price)} x{" "}
                  {calculateDays(bookedDate)} days
                </span>
                <span className="text-sm">
                  VND{" "}
                  {formatNumberWithCommas(calculateDays(bookedDate) * price)}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm">Service charge</span>
                <span className="text-sm">$0</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">
                  VND{" "}
                  {formatNumberWithCommas(calculateDays(bookedDate) * price)}
                </span>
              </div>
              {/* Reserve botton :  */}
              <button
                className="w-full bg-[#5819e0] hover:cursor-pointer
                             hover:bg-black
                             hover:text-white text-white py-2 rounded-lg"
                onClick={() => {
                  handleReserve();
                }}
              >
                {loading ? (
                  <Loader className="animate-spin text-center" />
                ) : (
                  "Reserve"
                )}
              </button>
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
    </div>
  );
}

export default Details;
