import OwnerProfile from "@/components/OwnerProfileCard";
import ReviewSection from "@/components/ReviewSection";

function CarDetails() {
    const ownerData = {
        name: 'Kevin Francis',
        image: 'URL_TO_YOUR_IMAGE', // Replace with your image URL
        bio: 'Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities...',
        reviews: '4.9 (122)',
        joinDate: 'March 2016',
        numberOfStores: '12',
    };
    const reviewsData = {
        numberOfReviews: 23,
        arrayOfReviews: [
            {
                image: 'https://th.bing.com/th/id/OIP.52T8HHBWh6b0dwrG6tSpVQHaFe?w=268&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7', // Replace with your image URL
                name: 'Cody Fisher',
                date: 'May 20, 2021',
                review: "There's no stopping the tech giant. Apple now opens its 100th store in China. There's no stopping the tech giant.",
                star: 4,
            },
            {
                image: 'https://www.bing.com/th?id=OIP.X-JqVACjNxeLg2En75r6IwHaFA&w=312&h=200&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2', // Replace with your image URL
                name: 'Cody Fisher',
                date: 'May 20, 2021',
                review: "There's no stopping the tech giant. Apple now opens its 100th store in China. There's no stopping the tech giant.",
                star: 4,
            },
            {
                image: 'URL_TO_USER_IMAGE_3', // Replace with your image URL
                name: 'Cody Fisher',
                date: 'May 20, 2021',
                review: "There's no stopping the tech giant. Apple now opens its 100th store in China. There's no stopping the tech giant.",
                star: 4,
            },
        ],
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row p-8 bg-white max-w-4xl mx-auto">
                {/* Left Side (Car Info) */}
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-2">BMW</h1>
                    <p className="text-2xl text-gray-700 mb-4">$25 / day</p>
                    <div className="bg-gray-200 h-64 w-full mb-4 rounded-lg">
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
                    <h2 className="text-2xl font-semibold mb-4">Technical Specification</h2>
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
                                src="fuel-icon.png" // Replace with your actual fuel icon path
                                alt="Fuel"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Fuel</p>
                            <p className="text-xs">Petrol</p>
                        </div>

                        {/* Doors */}
                        <div className="text-center bg-gray-100 rounded-2xl p-4">
                            <img
                                src="door-icon.png" // Replace with your actual door icon path
                                alt="Doors"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Doors</p>
                            <p className="text-xs">2</p>
                        </div>

                        {/* Air Conditioner */}
                        <div className="text-center bg-gray-100 rounded-2xl p-4">
                            <img
                                src="ac-icon.png" // Replace with your actual AC icon path
                                alt="AC"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Air Conditioner</p>
                            <p className="text-xs">Yes</p>
                        </div>

                        {/* Seats */}
                        <div className="text-center bg-gray-100 rounded-2xl p-4">
                            <img
                                src="seats-icon.png" // Replace with your actual seats icon path
                                alt="Seats"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Seats</p>
                            <p className="text-xs">5</p>
                        </div>

                        {/* Distance */}
                        <div className="text-center bg-gray-100 rounded-2xl p-4">
                            <img
                                src="distance-icon.png" // Replace with your actual distance icon path
                                alt="Distance"
                                className="mx-auto h-8 mb-2"
                            />
                            <p className="text-md font-bold">Distance</p>
                            <p className="text-xs">500</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <button className="bg-[#5937E0] hover:bg-purple-700 rounded-3xl text-white font-bold py-2 px-3 w-1/2 mx-auto mb-6">
                            Rent a motobike
                        </button>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Motobike Equipment</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>ABS</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>ABS</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Air Bags</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Air Bags</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Cruise Control</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Air Conditioner</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* owner profile :  */}
            <div className="flex justify-start">
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
            <div>
                <ReviewSection
                    numberOfReviews={reviewsData.numberOfReviews}
                    arrayOfReviews={reviewsData.arrayOfReviews}
                />
                {/* thi */}
            </div>
            {/* thing to know ; */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md ml-0 my-10">
                <h2 className="text-lg font-semibold mb-4">Things to know</h2>

                <div className="mb-4">
                    <h3 className="text-base font-medium mb-2">Free cancellation</h3>
                    <p className="text-sm text-gray-600">
                        Lock in this fantastic price today, cancel free of charge anytime. Reserve now and pay at pick-up.
                    </p>
                </div>

                <div>
                    <h3 className="text-base font-medium mb-2">Special Note</h3>
                    <p className="text-sm text-gray-600">
                        We asked ourselves, "How can we make the dash not only look better, but also give the driver a better look outside?" The unexpected answer is having no hood above the available 10.25-inch digital instrument cluster...
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CarDetails;