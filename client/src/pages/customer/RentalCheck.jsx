import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCheckoutSession } from '@/redux/features/customer/paymentSlice';
import { reserveBooking } from '@/redux/features/customer/bookingSlice';
import { toast } from 'react-toastify';

const RentalCheck = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId, role } = useSelector((state) => state.user);
    const bookingData = useSelector((state) => state.booking);
    const { loading, error, checkoutUrl } = useSelector((state) => state.payment);
    
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [amountMotobike, setAmountMotobike] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const selectedDates = bookingData.bookedDate ? 
        (Array.isArray(bookingData.bookedDate) ? bookingData.bookedDate : [new Date(bookingData.bookedDate)]) 
        : [];

    useEffect(() => {
        if (selectedDates.length > 0 && bookingData.price) {
            const pricePerDay = parseInt(bookingData.price.toString().replace(/[^\d]/g, ''));
            const total = pricePerDay * selectedDates.length * amountMotobike;
            setTotalPrice(total);
        }
    }, [selectedDates, amountMotobike, bookingData.price]);

    useEffect(() => {
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        }
    }, [checkoutUrl]);

    useEffect(() => {
        const checkData = () => {
            if (!userId || !role) {
                navigate('/login');
                toast.error('Please login to continue');
                return false;
            }

            if (!bookingData.motobike || !bookingData.ownerId) {
                navigate('/vehicle');
                toast.error('Please select a vehicle first');
                return false;
            }

            if (!selectedDates.length) {
                navigate('/vehicle');
                toast.error('Please select rental dates first');
                return false;
            }

            return true;
        };

        const timer = setTimeout(() => {
            const isValid = checkData();
            setIsLoading(!isValid);
        }, 500);

        return () => clearTimeout(timer);
    }, [userId, role, bookingData, selectedDates, navigate]);

    const handleProceedToPayment = async () => {
        if (!pickupLocation || !dropoffLocation) {
            toast.error('Please fill in pickup and dropoff locations');
            return;
        }

        try {
            const bookingPayload = {
                ownerId: bookingData.ownerId,
                motobike: [bookingData.motobike],
                totalPrice: totalPrice,
                bookedDate: selectedDates.map(date => new Date(date).toISOString()),
                amountMotobike: amountMotobike,
                pickUpLocation: pickupLocation,
                dropOffLocation: dropoffLocation,
            };

            const bookingResult = await dispatch(reserveBooking(bookingPayload)).unwrap();
            
            if (bookingResult.success) {
                const paymentPayload = {
                    amount: totalPrice,
                    bookingId: bookingResult.data._id,
                    currency: 'vnd'
                };

                await dispatch(createCheckoutSession(paymentPayload)).unwrap();
            }
        } catch (error) {
            console.error('Booking/Payment error:', error);
            toast.error(error.message || 'Something went wrong');
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!bookingData.motobike || !bookingData.ownerId) {
        return <div className="flex justify-center items-center h-screen">No vehicle selected</div>;
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Rental Check</h1>
                    
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Vehicle Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-4">
                                <img 
                                    src={bookingData.image} 
                                    alt={bookingData.name} 
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{bookingData.name}</h3>
                                    <p className="text-gray-600">{bookingData.district}</p>
                                    <p className="text-blue-600 font-semibold">{bookingData.price} VND/day</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Booking Details</h2>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Selected Rental Dates
                            </label>
                            <div className="p-3 border border-gray-300 rounded-md bg-gray-50">
                                {selectedDates.length > 0 ? (
                                    <div className="space-y-2">
                                        {selectedDates.map((date, index) => (
                                            <div key={index} className="flex items-center">
                                                <span className="text-blue-600 font-medium">
                                                    Day {index + 1}: {formatDate(date)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No dates selected</p>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                * Dates are selected from the vehicle page and cannot be modified here
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Motobikes
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={amountMotobike}
                                onChange={(e) => setAmountMotobike(parseInt(e.target.value) || 1)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pickup Location *
                            </label>
                            <input
                                type="text"
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                placeholder="Enter pickup location"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Dropoff Location *
                            </label>
                            <input
                                type="text"
                                value={dropoffLocation}
                                onChange={(e) => setDropoffLocation(e.target.value)}
                                placeholder="Enter dropoff location"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Price Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Price per day:</span>
                                <span>{bookingData.price} VND</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Number of days:</span>
                                <span>{selectedDates.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Number of motobikes:</span>
                                <span>{amountMotobike}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total:</span>
                                <span>{totalPrice.toLocaleString()} VND</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            onClick={handleProceedToPayment}
                            disabled={loading || !pickupLocation || !dropoffLocation}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            {loading ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RentalCheck; 