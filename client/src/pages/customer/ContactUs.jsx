import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div>
            {/* first part  */}
            <div className="font-sans text-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
                    <p className="text-sm text-gray-600 mb-8">Home / Contact Us</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column (Book Your Car Form) */}
                        <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                            <p className='font-semibold mb-4'>For fastest support, please contact us at the information below.</p>
                            <div className=" mb-4">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                                    FPT University Da Nang
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                                    thaibaovu0212@gmail.com
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <p className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                                    +84 69 726 078
                                </p>
                            </div>
                            
                        </div>


                        {/* Right Column (Blurred Image) */}
                        <div className="bg-cover bg-center rounded-lg shadow-md " style={{ backgroundImage: 'url(/blur-image.png)' }}></div>
                        {/* Replace '/car-blur.jpg' with your blurred image */}
                    </div>

                </div>
            </div>

            {/* second part  */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Latest blog posts & news</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Blog Post 1 */}
                        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                            <div className="aspect-w-16 aspect-h-9 bg-cover bg-center opacity-50 blur-lg" style={{ backgroundImage: 'url(/blog-image-1.jpg)' }}></div> {/* Replace with your image */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">How To Choose The Right Vehicle</h3>
                                <p className="text-sm text-gray-600">News / 27 March 2024</p>
                            </div>
                        </div>
                        {/* Blog Post 2 */}
                        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                            <div className="aspect-w-16 aspect-h-9 bg-cover bg-center opacity-50 blur-lg" style={{ backgroundImage: 'url(/blog-image-2.jpg)' }}></div> {/* Replace with your image */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Which plan is right for me?</h3>
                                <p className="text-sm text-gray-600">News / 27 March 2024</p>
                            </div>
                        </div>
                        {/* Blog Post 3 */}
                        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md">
                            <div className="aspect-w-16 aspect-h-9 bg-cover bg-center opacity-50 " style={{ backgroundImage: 'url(/blog-1.png)' }}></div> {/* Replace with your image */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Enjoy Speed, Choice & Total Control</h3>
                                <p className="text-sm text-gray-600">News / 27 March 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs