import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createStoreLocation, getAllStoreLocations } from "@/redux/features/owner/storeLocationSlice";
import { resetSuccess } from "@/redux/features/owner/addonSlice";

export default function StoreLocationForm() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [formData, setFormData] = useState({
        province: "48", // Default to Da Nang
        district: "",
        commune: "",
        address: ""
    });


    // redux : 
    const { success, storeLocations, loading, error } = useSelector(state => state.owner_store)
    const dispatch = useDispatch()

    useEffect(() => {
        // Fetch provinces
        axios.get("https://esgoo.net/api-tinhthanh/1/0.htm").then(response => {
            setProvinces(response.data.data);
        });
    }, []);

    useEffect(() => {
        if (formData.province) {
            axios.get(`https://esgoo.net/api-tinhthanh/2/${formData.province}.htm`).then(response => {
                setDistricts(response.data.data);
                setCommunes([]); // Reset communes when province changes
            });
        }
    }, [formData.province]);

    useEffect(() => {
        if (formData.district) {
            axios.get(`https://esgoo.net/api-tinhthanh/3/${formData.district}.htm`).then(response => {
                setCommunes(response.data.data);
            });
        }
    }, [formData.district]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // get province name : 
    const getProvinceNameById = async (provinceId) => {
        try {
            const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
            const listProvince = response.data?.data
            const province = listProvince.find(p => p.id === provinceId)
            return province.name_en
        } catch (error) {
            console.log(error);

        }
    }
    // get district name : 
    const getDistrictNameById = async (districtId) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${formData.province}.htm`)
            const listDistrict = response.data?.data
            const district = listDistrict.find(d => d.id === districtId)
            return district.name_en
        } catch (error) {
            console.log(error);

        }
    }

    // get comnune name : 
    const getCommuneNameById = async (districtId) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${formData.district}.htm`)
            const listDistrict = response.data?.data
            const district = listDistrict.find(d => d.id === districtId)
            return district.name_en
        } catch (error) {
            console.log(error);

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { province, district, commune, address } = formData;
        if (!province || !district || !commune || !address) {
            toast.error('All fields are required')
            return;
        }
        const provinceName = await getProvinceNameById(province)
        const districtName = await getDistrictNameById(district)
        const communeName = await getCommuneNameById(commune)

        console.log({
            province: provinceName,
            district: districtName,
            commune: communeName,
            address
        });
        dispatch(createStoreLocation({ province: provinceName, district: districtName, commune: communeName, address }))
        dispatch(getAllStoreLocations())
        setFormData({
            province: "48", // Default to Da Nang
            district: "",
            commune: "",
            address: ""
        })
    };

    useEffect(() => {
        dispatch(getAllStoreLocations())
    }, [])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-3/5 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Store Location</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Province</label>
                    <select name="province" value={formData.province} onChange={handleChange} className="w-full p-2 border rounded">
                        {provinces.map(province => (
                            <option key={province.id} value={province.id}>{province.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">District</label>
                    <select name="district" value={formData.district} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select District</option>
                        {districts.map(district => (
                            <option key={district.id} value={district.id}>{district.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Commune</label>
                    <select name="commune" value={formData.commune} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select Commune</option>
                        {communes.map(commune => (
                            <option key={commune.id} value={commune.id}>{commune.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter address manually" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
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
    );
}
