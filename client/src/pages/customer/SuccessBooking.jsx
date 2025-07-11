import { reserveBookingForSaveToDb } from "@/redux/features/customer/bookingSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SuccessBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // search params :
  const searchParams = new URLSearchParams(window.location.search);

  const customerId = searchParams.get("customerId");
  const ownerId = searchParams.get("ownerId");
  const totalPrice = searchParams.get("totalPrice");
  const amountMotobike = searchParams.get("amountMotobike");
  const pickUpLocation = searchParams.get("pickUpLocation");
  const dropOffLocation = searchParams.get("dropOffLocation");

  const motobike = searchParams.getAll("motobike");
  const bookedDate = searchParams.getAll("bookedDate");

  console.log("✅ SuccessBooking Params:");
  console.log("customerId:", customerId);
  console.log("ownerId:", ownerId);
  console.log("totalPrice:", totalPrice);
  console.log("amountMotobike:", amountMotobike);
  console.log("pickUpLocation:", pickUpLocation);
  console.log("dropOffLocation:", dropOffLocation);
  console.log("motobike:", motobike);
  console.log("bookedDate:", bookedDate);

  useEffect(() => {
    const handleBooking = async () => {
      // call api :
      await dispatch(
        reserveBookingForSaveToDb({
          ownerId,
          motobike: [motobike],
          totalPrice: Number(totalPrice),
          bookedDate,
          amountMotobike: 1,
          pickUpLocation,
          dropOffLocation,
        })
      );
      // toast success :
      toast.success("Booking successfully!");
      
      // return home page :
      navigate('/')
    };
    // call function :
    handleBooking();
  }, [
    dispatch,
    dropOffLocation,
    pickUpLocation,
    motobike,
    totalPrice,
    amountMotobike,
    ownerId,
    bookedDate,
    navigate
  ]);

  return (
    <div>
      <h1>Booking Success</h1>
    </div>
  );
};

export default SuccessBooking;
