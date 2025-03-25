import { getAllStoreLocations } from "@/redux/features/owner/storeLocationSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ViewAllStoreLocation = () => {
    // redux : 
    const { storeLocations } = useSelector(state => state.owner_store)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllStoreLocations())
    }, [])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <table className="w-full border-collapse border border-gray-300 mt-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Owner Name</th>
                        <th className="border border-gray-300 px-4 py-2">Province</th>
                        <th className="border border-gray-300 px-4 py-2">District</th>
                        <th className="border border-gray-300 px-4 py-2">Commune</th>
                        <th className="border border-gray-300 px-4 py-2">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {storeLocations.map((location, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{location.ownerName}</td>
                            <td className="border border-gray-300 px-4 py-2">{location.province}</td>
                            <td className="border border-gray-300 px-4 py-2">{location.district}</td>
                            <td className="border border-gray-300 px-4 py-2">{location.commune}</td>
                            <td className="border border-gray-300 px-4 py-2">{location.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ViewAllStoreLocation