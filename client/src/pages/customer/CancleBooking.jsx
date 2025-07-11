import React from 'react'
import { useNavigate } from 'react-router-dom'

const CancelBooking = () => {
  const navigate = useNavigate()

  const handleReturnHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full text-center p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Canceled</h1>
        <p className="text-gray-600 mb-4">
          We're sorry to see you go. Your booking has been successfully canceled.
        </p>
        <div className="text-4xl mb-4">😔</div>
        <button
          onClick={handleReturnHome}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Return Home
        </button>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        💬 Need help?{' '}
        <a href="/contact" className="text-blue-600 hover:underline">
          Contact support
        </a>
      </div>
    </div>
  )
}

export default CancelBooking
