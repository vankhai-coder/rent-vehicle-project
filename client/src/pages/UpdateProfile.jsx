import React from 'react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { Loader } from 'lucide-react';

const UpdateProfile = () => {

  const { userImage } = useSelector(state => state.user)

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

      {/* First and Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            value="Helene" // Replace with actual value
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            value="Engels" // Replace with actual value
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Email and User Permissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value="helene@company.com" // Replace with actual value
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">User Permissions</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value="Operational" // Replace with actual value
          >
            <option value="Operational">Operational</option>
            <option value="Admin">Admin</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>

      {/* Email Status and Job Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email Status</label>
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
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <input
            type="text"
            value="React Developer" // Replace with actual value
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* User Role and Account */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">User Role</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value="Owner" // Replace with actual value
          >
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Account</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value="PRO Account" // Replace with actual value
          >
            <option value="PRO Account">PRO Account</option>
            <option value="Basic Account">Basic Account</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>

      {/* Password and Confirm Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="********" // Replace with actual value
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Confirm password</label>
          <input
            type="password"
            placeholder="********" // Replace with actual value
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <Button
          className='bg-[#5819E0] hover:bg-[#5819F9] rounded-2xl mx-auto flex my-5'
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfile;