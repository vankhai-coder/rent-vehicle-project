import { getAllMotobikes } from "@/redux/features/owner/motobikeSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatNumberWithCommas } from '@/utils/formatFunction'

const ViewAllMotobike = () => {

    const dispatch = useDispatch();
    const { motobikes, loading, error } = useSelector((state) => state.owner_motobike);

    useEffect(() => {
        dispatch(getAllMotobikes());
    }, [dispatch]);

    return (
        <div>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Motorbike List</h1>
                {loading ? (
                    <p className="text-center text-blue-600">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : (
                    <div className="overflow-x-auto shadow-md">
                        <table className="table-auto border-collapse border border-gray-300 w-full">
                            <thead className="bg-gray-100 border-b border-gray-300">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Owner Name</th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Motorbike Name</th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Vehicle Number</th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Price Per Day</th>
                                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Store Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {motobikes.map((bike) => (
                                    <tr key={bike.vehicleNumber} className="hover:bg-gray-50 border-b border-gray-300">
                                        <td className="px-4 py-2 text-gray-700">{bike.ownerName}</td>
                                        <td className="px-4 py-2 text-gray-700">{bike.motobikeName}</td>
                                        <td className="px-4 py-2 text-gray-700">{bike.vehicleNumber}</td>
                                        <td className="px-4 py-2 text-gray-700">{formatNumberWithCommas(bike.pricePerDay)}</td>
                                        <td className="px-4 py-2 text-gray-700">{bike.storeLocation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewAllMotobike