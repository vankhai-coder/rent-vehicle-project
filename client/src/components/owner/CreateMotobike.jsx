import { getAllAddOns, resetSuccess } from "@/redux/features/owner/addonSlice";
import { createMotobike } from "@/redux/features/owner/createMotobikeSlice";
import { getAllMotobikeTypes } from "@/redux/features/owner/motobikeTypeSlice";
import { getAllStoreLocations } from "@/redux/features/owner/storeLocationSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CreateMotobikeForm = () => {
    const dispatch = useDispatch();

    // Selectors to get data from Redux state
    const { storeLocations, motobikeTypes, addons, loading, success, error, createMotobikeSuccess } = useSelector(
        (state) => state.owner_create_motobike
    );

    const [formData, setFormData] = React.useState({
        vehicleNumber: "",
        pricePerDay: 0,
    });



    const [selectedState, setSelectedState] = React.useState({
        storeLocation: "",
        motobikeType: "",
        selectedAddons: [],
    });

    // Fetch data on component mount
    useEffect(() => {
        dispatch(getAllStoreLocations());
        dispatch(getAllMotobikeTypes());
        dispatch(getAllAddOns());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setSelectedState({ ...selectedState, [name]: value });
    };

    const handleAddonSelection = (addonId) => {
        setSelectedState((prevState) => {
            const isSelected = prevState.selectedAddons.includes(addonId);
            return {
                ...prevState,
                selectedAddons: isSelected
                    ? prevState.selectedAddons.filter((id) => id !== addonId)
                    : [...prevState.selectedAddons, addonId],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('create value : ', {
            vehicleNumber: formData.vehicleNumber,
            pricePerDay: formData.pricePerDay,
            storeLocation: selectedState.storeLocation,
            motobikeType: selectedState.motobikeType,
            freeAddons: selectedState.selectedAddons,
        });

        // Dispatch createMotobike with the selected state values
        dispatch(
            createMotobike({
                vehicleNumber: formData.vehicleNumber,
                pricePerDay: formData.pricePerDay,
                storeLocation: selectedState.storeLocation,
                motobikeType: selectedState.motobikeType,
                freeAddons: selectedState.selectedAddons,
            })

        )
        // clear form : 
        setSelectedState({
            storeLocation: "",
            motobikeType: "",
            selectedAddons: [],
        })
        setFormData({
            vehicleNumber: "",
            pricePerDay: 0,
        })

    };
    useEffect(() => {
        if (createMotobikeSuccess) {
            toast.success('Create Motobike Successfully!')
            dispatch(resetSuccess())
        }
    }, [createMotobikeSuccess])

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow-md rounded-md space-y-6 max-w-2xl mx-auto"
        >
            <h1 className="text-2xl font-bold mb-4">Create Motobike</h1>

            {/* Input for Vehicle Number */}
            <div>
                <label className="block text-sm font-medium mb-2">Vehicle Number</label>
                <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleInputChange}
                    placeholder="Enter vehicle number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
            </div>

            {/* Input for Price Per Day */}
            <div>
                <label className="block text-sm font-medium mb-2">Price Per Day</label>
                <input
                    type="number"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={handleInputChange}
                    placeholder="Enter price per day"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
            </div>

            {/* Select for Store Location */}
            <div>
                <label className="block text-sm font-medium mb-2">Store Location</label>
                <select
                    name="storeLocation"
                    value={selectedState.storeLocation}
                    onChange={handleSelectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                >
                    <option value="" disabled>
                        Select a store location
                    </option>
                    {storeLocations.map((location) => (
                        <option
                            key={location.storeLocationId}
                            value={location.storeLocationId}
                        >
                            {`${location.address}, ${location.commune}, ${location.district}, ${location.province}`}
                        </option>
                    ))}
                </select>
            </div>

            {/* Select for Motobike Type */}
            <div>
                <label className="block text-sm font-medium mb-2">Motobike Type</label>
                <select
                    name="motobikeType"
                    value={selectedState.motobikeType}
                    onChange={handleSelectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                >
                    <option value="" disabled>
                        Select a motobike type
                    </option>
                    {motobikeTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table of Addons */}
            <div>
                <h2 className="text-sm font-medium mb-2">Addons</h2>
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2">Select</th>
                            <th className="p-2">Image</th>
                            <th className="p-2">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addons.map((addon) => (
                            <tr key={addon._id} className="border-b">
                                <td className="p-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedState.selectedAddons.includes(addon._id)}
                                        onChange={() => handleAddonSelection(addon._id)}
                                    />
                                </td>
                                <td className="p-2 text-center">
                                    <img
                                        src={addon.image}
                                        alt={addon.name}
                                        className="h-10 w-10 mx-auto"
                                    />
                                </td>
                                <td className="p-2">{addon.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                disabled={loading}
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
            {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        </form>
    );
};

export default CreateMotobikeForm;
