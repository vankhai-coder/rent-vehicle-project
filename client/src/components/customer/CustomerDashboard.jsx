
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
                    <button className="flex items-center text-gray-700 py-2 px-4 rounded-md w-full mb-2 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2H16a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zm4 16h.01M12 6v8" />
                        </svg>

                        Reserve
                    </button>
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
            {/* right before sidebar :  */}
            <div className="w-">
                {/* 4 cards :  */}
                <div className="flex flex-wrap justify-between ">
                    {/* Today's Money */}
                    <div className="bg-white rounded-lg shadow p-4 flex-1 ">
                        <div className="flex items-center mb-4">
                            <div className="bg-gray-800 text-white p-3 rounded-lg mr-3">
                                {/* Replace with your money icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.04 3 0 8 0 1.11 0 2.08-.04 3 0-8 0-1.11 0-2.08.04-3 0 8z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700">Today's Money</h3>
                                <p className="text-xl font-bold">$53k</p>
                            </div>
                        </div>
                        <p className="text-xs text-green-500">+55% than last week</p>
                    </div>

                    {/* Today's Users */}
                    <div className="bg-white rounded-lg shadow p-4 flex-1 ">
                        <div className="flex items-center mb-4">
                            <div className="bg-gray-800 text-white p-3 rounded-lg mr-3">
                                {/* Replace with your users icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15.15 12.75a3 3 0 10-6.3 0 8.009 8.009 0 01-5.029-7.852 11.958 11.958 0 0111.726-1.517 11.958 11.958 0 0111.726 1.517 8.009 8.009 0 01-5.029 7.852z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700">Today's Users</h3>
                                <p className="text-xl font-bold">2,300</p>
                            </div>
                        </div>
                        <p className="text-xs text-blue-500">+3% than last month</p>
                    </div>

                    {/* New Clients */}
                    <div className="bg-white rounded-lg shadow p-4 flex-1 ">
                        <div className="flex items-center mb-4">
                            <div className="bg-gray-800 text-white p-3 rounded-lg mr-3">
                                {/* Replace with your clients icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700">New Clients</h3>
                                <p className="text-xl font-bold">3,462</p>
                            </div>
                        </div>
                        <p className="text-xs text-red-500">-2% than yesterday</p>
                    </div>

                    {/* Sales */}
                    <div className="bg-white rounded-lg shadow p-4 flex-1 ">
                        <div className="flex items-center mb-4">
                            <div className="bg-gray-800 text-white p-3 rounded-lg mr-3">
                                {/* Replace with your sales icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700">Sales</h3>
                                <p className="text-xl font-bold">$103,430</p>
                            </div>
                        </div>
                        <p className="text-xs text-green-500">+5% than yesterday</p>
                    </div>
                </div>
                {/* below 4 card :  */}
                <div>asdf</div>
                <div>asdf</div>
            </div>
        </div>
    )
}

export default CustomerDashboard