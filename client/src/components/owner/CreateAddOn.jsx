import { createAddon, getAllAddOns } from '@/redux/features/owner/addonSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const CreateAddOn = () => {

    // redux : 
    const { addons, loading, error } = useSelector(state => state.owner_addon)
    const dispatch = useDispatch()

    // 
    useEffect(() => {
        dispatch(getAllAddOns())
    }, [])

    useEffect(() => {
        toast.error(error)
    }, [error])

    // Form state
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name && image) {
            // Convert the image file to base64
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
                const base64Image = reader.result; // Get the base64 string
                // Dispatch the action with name and base64 image
                dispatch(createAddon({ name, image: base64Image }));

                // Reset form inputs
                setName(''); // Reset name input
                setImage(null); // Reset file input
            };
            reader.onerror = (error) => {
                console.error('Error converting image to base64:', error);
            };
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            {/* Form */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Create Add-On</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Add-On Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter add-on name"
                            required
                        />
                    </div>

                    {/* Image Field */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Create Add-On'}
                    </button>
                </form>
            </div>

            {/* List of Add-Ons */}
            <div className="mt-8 w-full">
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Add-Ons List</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {addons.map((addon, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                            <div className="w-20 h-20 rounded-full overflow-hidden border flex items-center justify-center">
                                <img
                                    src={addon.image}
                                    alt={addon.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-700">{addon.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CreateAddOn