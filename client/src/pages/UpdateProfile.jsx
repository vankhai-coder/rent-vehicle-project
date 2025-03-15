import React from 'react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { Loader } from 'lucide-react';

const UpdateProfile = () => {

  const [fullName, setFullName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [commune, setCommune] = React.useState('');
  const [image, setImage] = React.useState('');
  const [driverLicense, setDriverLicense] = React.useState({ before: '', after: '' });
  const [identityCard, setIdentityCard] = React.useState({ before: '', after: '' });

  const { userImage } = useSelector(state => state.user)

  // handle file change : 
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        setImage(reader.result); // Set Base64 string
      };
    }
  };
  // handle file change for driver license :
  const handleDriverLicenseChangeBefore = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        setDriverLicense({ ...driverLicense, before: reader.result }); // Set Base64 string
      };
    }
  }
  const handleDriverLicenseChangeAfter = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        setDriverLicense({ ...driverLicense, after: reader.result }); // Set Base64 string
      };
    }
  }
  // handle file change for identity card :
  const handleIdentityCardChangeBefore = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        setIdentityCard({ ...identityCard, before: reader.result }); // Set Base64 string
      };
    }
  }
  const handleIdentityCardChangeAfter = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        setIdentityCard({ ...identityCard, after: reader.result }); // Set Base64 string
      };
    }
  }

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">General Information</h2>

      {/* Avatar Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Upload avatar</label>
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
            <img
              src={`${userImage || '/default_avt.jpg'}`} // Replace with actual avatar URL
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="file"
              id="avatar"
              className="hidden"
              accept='image/*'
              onChange={handleFileChange}
            />
            <label
              htmlFor="avatar"
              className="bg-[#5819E0] hover:bg-blue-900 rounded-2xl text-white py-2 px-4  cursor-pointer"
            >
              Choose File
            </label>
            <span className="text-xs text-gray-400 mt-1">
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </span>
          </div>
        </div>
      </div>

      {/* FullName and age */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Phone and User Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Femail</option>
          </select>
        </div>
      </div>

      {/* Province and District :*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Province</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value="Verified" // Replace with actual value
          >
            <option value="Verified">Verified</option>
            <option value="Unverified">Unverified</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">District</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value="Verified" // Replace with actual value
          >
            <option value="Verified">Verified</option>
            <option value="Unverified">Unverified</option>
          </select>
        </div>
      </div>

      {/* Commune and address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Commune</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value="Verified" // Replace with actual value
          >
            <option value="Verified">Verified</option>
            <option value="Unverified">Unverified</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Diver licenes : */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Driver Licenes Before</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleDriverLicenseChangeBefore}
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {/* preview image :  */}
          <div className='mt-1'>
            {driverLicense.before && (
              <img src={driverLicense.before} alt="Preview" className="size-20  ml-4 rounded" />
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Driver Licenes After</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleDriverLicenseChangeAfter}
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {/* preview image : */}
          <div className='mt-1'>
            {driverLicense.after && (
              <img src={driverLicense.after} alt="Preview" className="size-20  ml-4 rounded" />
            )}
          </div>
        </div>

      </div>

      {/* Identity Card : */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Identity Card Before</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleIdentityCardChangeBefore}
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {/* preview image :  */}
          <div className='mt-1'>
            {identityCard.before && (
              <img src={identityCard.before} alt="Preview" className="size-20  ml-4 rounded" />
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Identity Card After</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleIdentityCardChangeAfter}
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {/* preview image : */}
          <div className='mt-1'>
            {identityCard.after && (
              <img src={identityCard.after} alt="Preview" className="size-20  ml-4 rounded" />
            )}
          </div>
        </div>
      </div>

      <div>
        <Button
          className='bg-[#5819E0] hover:bg-[#5819F9] rounded-xl mx-auto flex my-5'
          // log all the data : 

          onClick={() => console.log({ fullName, age, phone,image, driverLicense, identityCard })}
        >   
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfile;