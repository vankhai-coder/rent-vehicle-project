import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createMotobikeType, getAllMotobikeTypes } from "@/redux/features/owner/motobikeTypeSlice";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

export default function MotobikeTypeForm() {
    const dispatch = useDispatch();
    const { motobikeTypes, error, loading, success } = useSelector((state) => state.owner_motobike_type);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        color: "",
        description: "",
        height: "",
        weight: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
     await   dispatch(createMotobikeType(formData));
        setFormData({ name: "", image: "", color: "", description: "", height: "", weight: "" });
    };

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    useEffect(() => {
        if (success) {
            toast.success(success)
        }
    }, [success])

    useEffect(() => {
        dispatch(getAllMotobikeTypes())
    }, [])

    return (
        <div className="flex flex-col items-center p-6">
            {/* Form Section */}
            <form
                onSubmit={handleSubmit}
                className=" p-6 bg-white shadow-lg rounded-lg flex flex-col gap-4"
            >
                <h2 className="text-xl font-bold text-center">Add New Motobike Type</h2>
                <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <Input type="file" accept="image/*" onChange={handleImageUpload} required />
                <Input name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
                <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <Input name="height" placeholder="Height" value={formData.height} onChange={handleChange} required />
                <Input name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} required />
                <Button type="submit" className="mt-2">
                    {loading ? <Loader className="animate-spin" /> : 'Create'}
                </Button>
            </form>

            {/* Display Motobike Types */}
            <div className="grid grid-cols-2 gap-6 mt-8">
                {motobikeTypes.map((type, index) => (
                    <Card key={index} className="p-4 shadow-md rounded-lg">
                        <img src={type.image} alt={type.name} className="w-full h-32 object-cover rounded-md" />
                        <h3 className="text-lg font-bold mt-2">{type.name}</h3>
                        <p className="text-sm text-gray-500">{type.description}</p>
                        <p className="text-sm">Height: {type.height} cm</p>
                        <p className="text-sm">Weight: {type.weight} kg</p>
                        <p className="text-sm font-semibold">Color: {type.color}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
