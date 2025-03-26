import CreateAddOn from "@/components/owner/CreateAddOn";
import CreateMotobike from "@/components/owner/CreateMotobike";
import CreateMotobikeType from "@/components/owner/CreateMotobikeType";
import CreateStoreLocation from '@/components/owner/CreateStoreLocation'
import ViewAllBooking from "@/components/owner/ViewAllBooking";
import ViewAllMotobike from "@/components/owner/ViewAllMotobike";
import ViewAllStoreLocation from "@/components/owner/ViewAllStoreLocation";
import { Loader } from "lucide-react";
import { Routes, Route, Link } from "react-router-dom";

const OwnerDashboard = () => {
    return (
        <div className="flex">
            {/* side bar */}
            <aside className="bg-white shadow-md rounded-lg p-2 mr-2 w-9/24">
                <h2 className="text-xl font-semibold mb-6 text-center">Owner Dashboard</h2>
                <nav>
                    <button className="flex items-center bg-gray-800 text-white py-2 px-1 rounded-md w-full mb-2">
                        <svg className="mr-9 size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v9H3V3zm0 13h7v5H3v-5zm11-13h7v5h-7V3zm0 8h7v9h-7v-9z" />
                        </svg>
                        Dashboard
                    </button>
                    <p className="text-xl font-semibold mb-2">Create</p>
                    <Link to={'/owner-dashboard/create-motobike'} >
                        <button
                            className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                            <svg className="mr-6 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bike"><circle cx="18.5" cy="17.5" r="3.5" /><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="15" cy="5" r="1" /><path d="M12 17.5V14l-3-3 4-3 2 3h2" /></svg>
                            Create Motobike
                        </button>
                    </Link>
                    <Link to='/owner-dashboard/create-store'>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                            <svg className="mr-6 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-check"><path d="M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728" /><circle cx="12" cy="10" r="3" /><path d="m16 18 2 2 4-4" /></svg>
                            Create Store Location
                        </button>
                    </Link>
                    <Link to={'/owner-dashboard/create-addon'}>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                            <svg className="mr-6 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bring-to-front"><rect x="8" y="8" width="8" height="8" rx="2" /><path d="M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" /><path d="M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" /></svg>
                            Create Add On
                        </button>
                    </Link>

                    <Link to='/owner-dashboard/create-type'>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                            <svg className="mr-6 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>

                            Create Motobike Type
                        </button>
                    </Link>

                    <p className="text-xl font-semibold mb-2">View</p>

                    <Link to={'/owner-dashboard/view-motobike'}>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full hover:bg-gray-100">
                            <svg className="mr-6 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bike"><circle cx="18.5" cy="17.5" r="3.5" /><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="15" cy="5" r="1" /><path d="M12 17.5V14l-3-3 4-3 2 3h2" /></svg>

                            View All Motobike
                        </button>
                    </Link>
                    <Link to={'/owner-dashboard/view-store'}>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full hover:bg-gray-100">
                            <svg className="mr-6 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-check"><path d="M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728" /><circle cx="12" cy="10" r="3" /><path d="m16 18 2 2 4-4" /></svg>

                            View All Store Location
                        </button>
                    </Link>
                    <Link to={'/owner-dashboard/view-booking'}>
                        <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full hover:bg-gray-100">
                            <svg className="mr-6 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                            View All Booking
                        </button>
                    </Link>
                    <p className="text-xl font-semibold mb-2">Revenue</p>
                    <Link to={'/owner-dashboard/view-revenue'}>
                        <button className="flex items-center  text-gray-700 py-2 px-4 rounded-md w-full hover:bg-gray-100">
                            <svg className="mr-6 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg>
                            View All Revenue
                        </button>
                    </Link>
                </nav>
            </aside>

            {/* right before sidebar for routes :  */}
            <div className="w-full">
                <Routes>
                    {/* index page  :*/}
                    <Route path="/" element={<>index page</>} />
                    {/* crete motobike :  */}
                    <Route path="/create-motobike" element={<CreateMotobike />} />
                    {/* create addon :  */}
                    <Route path="/create-addon" element={<CreateAddOn />} />
                    {/* create motobike type  : */}
                    <Route path="/create-type" element={<CreateMotobikeType />} />
                    {/* create store location :  */}
                    <Route path="/create-store" element={<CreateStoreLocation />} />
                    {/* view all store location :  */}
                    <Route path="/view-store" element={<ViewAllStoreLocation />} />
                    {/* view all motobike :  */}
                    <Route path="/view-motobike" element={<ViewAllMotobike />} />
                    {/* view all booking :  */}
                    <Route path="/view-booking" element={<ViewAllBooking />} />
                    {/* other : */}
                </Routes>
            </div>
        </div>
    )
}

export default OwnerDashboard