import CreateAddOn from "@/components/owner/CreateAddOn";
import { Loader } from "lucide-react";
import { Routes, Route, Link } from "react-router-dom";

const OwnerDashboard = () => {
    return (
        <div className="flex">
            {/* side bar */}
            <aside className="bg-white shadow-md rounded-lg p-4 mr-12">
                <h2 className="text-xl font-semibold mb-6 text-center">Owner Dashboard</h2>
                <nav>
                    <button className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-md w-full mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v9H3V3zm0 13h7v5H3v-5zm11-13h7v5h-7V3zm0 8h7v9h-7v-9z" />
                        </svg>
                        Dashboard
                    </button>
                    <p className="text-xl font-semibold mb-2">Create</p>
                    <Link to={'create-motobike'} >
                        <button
                            className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                            <Loader />
                            Create Motobike
                        </button>
                    </Link>
                    <Link to='create-store'>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m0-8l4 4m-4-4l-4 4" />
                            </svg>
                            Create Store Location
                        </button>
                    </Link>
                    <Link to={'create-addon'}>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Create Add On
                        </button>
                    </Link>

                    <Link to='create-type'>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Create Motobike Type
                        </button>
                    </Link>

                    <p className="text-xl font-semibold mb-2">View</p>

                    <Link to={'view-motobike'}>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1h-3v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H3v-1z" />
                            </svg>
                            View All Motobike
                        </button>
                    </Link>
                    <Link to={'view-store'}>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1h-3v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H3v-1z" />
                            </svg>
                            View All Store Location
                        </button>
                    </Link>
                    <Link to={'view-booking'}>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1h-3v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H3v-1z" />
                            </svg>
                            View All Booking
                        </button>
                    </Link>
                    <Link to={'view-revenue'}>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1h-3v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H3v-1z" />
                            </svg>
                            View All Revenue
                        </button>
                    </Link>
                </nav>
            </aside>

            {/* right before sidebar for routes :  */}
            <div>
                <Routes>
                    {/* index page  :*/}
                    <Route path="/" element={<>index page</>} />
                    {/* create addon :  */}
                    <Route path="create-addon" element={<CreateAddOn />} />
                    {/* other : */}
                </Routes>
            </div>
        </div>
    )
}

export default OwnerDashboard