import { fetchCustomerBookings, cancelBooking } from "@/redux/features/customer/billSlice"
import { Loader, Calendar, Clock, MapPin, Trash2, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { formatNumberWithCommas } from '@/utils/formatFunction'
import { toast } from 'react-toastify'

const ManageBooking = () => {
  const dispatch = useDispatch()
  const { loading, bookings, error } = useSelector(state => state.bill)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    dispatch(fetchCustomerBookings())
  }, [dispatch])

  // Auto refresh every 30 seconds to check for status updates
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchCustomerBookings())
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [dispatch])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await dispatch(fetchCustomerBookings()).unwrap()
      toast.success('Bookings refreshed successfully')
    } catch (err) {
      toast.error('Failed to refresh bookings')
    } finally {
      setRefreshing(false)
    }
  }

  const getStatusColor = (status, paymentStatus) => {
    if (paymentStatus === 'succeeded' || status === 'completed') {
      return 'bg-green-100 text-green-800 border border-green-200'
    }
    if (status === 'canceled') {
      return 'bg-red-100 text-red-800 border border-red-200'
    }
    if (paymentStatus === 'pending' || status === 'pending_payment') {
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    }
    if (status === 'renting') {
      return 'bg-blue-100 text-blue-800 border border-blue-200'
    }
    return 'bg-gray-100 text-gray-800 border border-gray-200'
  }

  const getStatusText = (status, paymentStatus) => {
    if (paymentStatus === 'succeeded' || status === 'completed') {
      return 'Completed'
    }
    if (status === 'canceled') {
      return 'Canceled'
    }
    if (paymentStatus === 'pending' || status === 'pending_payment') {
      return 'Pending Payment'
    }
    if (status === 'renting') {
      return 'Renting'
    }
    return status || 'Unknown'
  }

  const handleCancel = async (bookingId, status) => {
    if (status === 'completed' || status === 'canceled') {
      toast.info(`This booking is already ${status} and cannot be canceled.`);
      return;
    }

    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      try {
        await dispatch(cancelBooking(bookingId)).unwrap()
        toast.success('Booking canceled successfully')
        // Refresh the bookings after cancellation
        dispatch(fetchCustomerBookings())
      } catch (err) {
        toast.error(err.message || 'Failed to cancel booking')
      }
    }
  }

  if (loading && bookings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      {loading && bookings.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <Loader className="animate-spin text-primary" size={24} />
          <span className="ml-2 text-gray-600">Updating bookings...</span>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings && bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-16 w-24">
                        <img
                          src={booking.motobikeType?.image || 'https://placehold.co/200x150?text=No+Image'}
                          alt={booking.motobikeName || 'Vehicle'}
                          className="h-full w-full object-cover rounded-lg shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{booking.motobikeName || 'Unknown Vehicle'}</span>
                        <span className="text-sm text-gray-500">Owner: {booking.ownerName || 'Unknown Owner'}</span>
                        <span className="text-xs text-gray-400 mt-1">License: {booking.licensePlate || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{booking.date || 'N/A'}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{booking.pickup || 'N/A'} - {booking.dropoff || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{booking.pickup || 'N/A'}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{booking.dropoff || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status, booking.paymentStatus)}`}>
                      {getStatusText(booking.status, booking.paymentStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {booking.total ? formatNumberWithCommas(booking.total) : '0'} VND
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCancel(booking._id, booking.status)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Cancel Booking"
                        disabled={booking.status === 'completed' || booking.status === 'canceled'}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBooking