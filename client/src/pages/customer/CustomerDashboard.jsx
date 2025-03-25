import ManageBooking from "@/components/customer/ManageBooking";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const CustomerDashboard = () => {
    return (
        <div className="flex">
            {/* side bar */}
            <aside className="bg-white shadow-md rounded-lg p-4 mr-12">
                <h2 className="text-xl font-semibold mb-6 text-center">Customer Dashboard</h2>
                <nav>
                    <button className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-md w-full mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v9H3V3zm0 13h7v5H3v-5zm11-13h7v5h-7V3zm0 8h7v9h-7v-9z" />
                        </svg>

                        Dashboard
                    </button>
                    <Link to={''} >
                        <button
                            className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2H16a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zm4 16h.01M12 6v8" />
                            </svg>
                            Manage Bookings
                        </button>
                    </Link>
                    <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m0-8l4 4m-4-4l-4 4" />
                        </svg>
                        Tables
                    </button>
                    <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-4 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.158a2.033 2.033 0 01-1.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Notifications
                    </button>
                    <p className="text-sm font-semibold mb-2">AUTH PAGES</p>
                    <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Sign In
                    </button>
                    <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1h-3v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H3v-1z" />
                        </svg>
                        Sign Up
                    </button>
                </nav>
            </aside>

            {/* right before sidebar for routes :  */}
            <div>
                <Routes>
                    {/* Manage Booking component :*/}
                    <Route path="/" element={<ManageBooking />} />
                    {/* other : */}
                </Routes>
            </div>
        </div>
    )
}

export default CustomerDashboard