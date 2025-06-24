import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearBooking } from '@/redux/features/customer/bookingSlice';
import { clearPayment, getBookingStatusBySession, setBookingStatus } from '@/redux/features/customer/paymentSlice';
import { fetchCustomerBookings } from '@/redux/features/customer/billSlice';
import { toast } from 'react-toastify';
import { CheckCircle, Home, Receipt } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { userId, role, fullName, email } = useSelector((state) => state.user);
    const { bookingStatus, loading: paymentLoading } = useSelector((state) => state.payment);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        
        // Clear booking and payment data after successful payment
        dispatch(clearBooking());
        dispatch(clearPayment());
        
        // Fetch booking status by session ID using Redux
        const fetchBookingStatus = async () => {
            try {
                setLoading(true);
                if (sessionId) {
                    await dispatch(getBookingStatusBySession(sessionId)).unwrap();
                } else {
                    // Fallback: fetch latest booking if no session ID
                    const response = await axiosInstance.get('/api/customer/booking');
                    if (response.data && response.data.length > 0) {
                        const latestBooking = response.data[0];
                        // Set booking status in Redux
                        dispatch(setBookingStatus(latestBooking));
                    }
                }
            } catch (error) {
                console.error('Error fetching booking status:', error);
                // Fallback: fetch latest booking on error
                try {
                    const response = await axiosInstance.get('/api/customer/booking');
                    if (response.data && response.data.length > 0) {
                        const latestBooking = response.data[0];
                        dispatch(setBookingStatus(latestBooking));
                    }
                } catch (fallbackError) {
                    console.error('Fallback error:', fallbackError);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookingStatus();
        
        // Show success message
        toast.success('Payment completed successfully! Your booking is confirmed.');
    }, [dispatch, searchParams]);

    const handleGoHome = () => {
        navigate('/');
    };

    const handleViewBookings = () => {
        // Refresh bookings data before navigating
        dispatch(fetchCustomerBookings());
        navigate('/customer-dashboard');
    };

    const getStatusText = (status, paymentStatus) => {
        if (paymentStatus === 'succeeded' || status === 'completed') {
            return 'Confirmed';
        }
        if (status === 'canceled') {
            return 'Canceled';
        }
        if (paymentStatus === 'pending' || status === 'pending_payment') {
            return 'Pending Payment';
        }
        if (status === 'renting') {
            return 'Renting';
        }
        return status || 'Unknown';
    };

    const getStatusColor = (status, paymentStatus) => {
        if (paymentStatus === 'succeeded' || status === 'completed') {
            return 'bg-green-100 text-green-800';
        }
        if (status === 'canceled') {
            return 'bg-red-100 text-red-800';
        }
        if (paymentStatus === 'pending' || status === 'pending_payment') {
            return 'bg-yellow-100 text-yellow-800';
        }
        if (status === 'renting') {
            return 'bg-blue-100 text-blue-800';
        }
        return 'bg-gray-100 text-gray-800';
    };

    // Use bookingStatus from Redux if available, otherwise show loading
    const bookingData = bookingStatus;

    if (loading || paymentLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <CheckCircle className="mx-auto h-16 w-16 text-green-500 animate-pulse" />
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Processing Payment...
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please wait while we confirm your payment.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Payment Successful!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Thank you for your payment. Your booking has been confirmed.
                    </p>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        {bookingData && (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-gray-500">Status:</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bookingData.status, bookingData.paymentStatus)}`}>
                                        {getStatusText(bookingData.status, bookingData.paymentStatus)}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-gray-500">Payment Method:</span>
                                    <span className="text-sm text-gray-900">{bookingData.paymentMethod || 'Credit Card'}</span>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-gray-500">Total Amount:</span>
                                    <span className="text-sm text-gray-900">
                                        {bookingData.totalPrice ? new Intl.NumberFormat('vi-VN').format(bookingData.totalPrice) : '0'} VND
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500">Date:</span>
                                    <span className="text-sm text-gray-900">
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleViewBookings}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Receipt className="w-5 h-5 mr-2" />
                        View My Bookings
                    </button>

                    <button
                        onClick={handleGoHome}
                        className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        A confirmation email has been sent to {email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess; 