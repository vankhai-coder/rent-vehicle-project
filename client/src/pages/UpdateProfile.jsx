import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '@/redux/features/userProfile';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const UpdateProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user profile data from Redux store:
  const {
    fullName, age, phone, gender, address, province, district, commune, image, driverLicense, identityCard, loading
  } = useSelector(state => state.userProfile);

  // Local state to store and manage user profile data:
  const [fullNameU, setFullName] = React.useState('');
  const [ageU, setAge] = React.useState('');
  const [phoneU, setPhone] = React.useState('');
  const [genderU, setGender] = React.useState('');
  const [addressU, setAddress] = React.useState('');
  const [provinceU, setProvince] = React.useState('');
  const [districtU, setDistrict] = React.useState('');
  const [communeU, setCommune] = React.useState('');
  const [imageU, setImage] = React.useState('');
  const [driverLicenseU, setDriverLicense] = React.useState({ before: '', after: '' });
  const [identityCardU, setIdentityCard] = React.useState({ before: '', after: '' });

  // Fetch user profile when the component mounts:
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  // Update local state when Redux store data changes:
  useEffect(() => {
    if (!loading) {
      setFullName(fullName || '');
      setAge(age || '');
      setPhone(phone || '');
      setGender(gender || 'male');
      setAddress(address || '');
      setProvince(province || '');
      setDistrict(district || '');
      setCommune(commune || '');
      setImage(image || '');
      setDriverLicense(driverLicense || { before: '', after: '' });
      setIdentityCard(identityCard || { before: '', after: '' });
    }
  }, [fullName, age, phone, gender, address, province, district, commune, image, driverLicense, identityCard, loading]);


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
        setDriverLicense({ ...driverLicenseU, before: reader.result }); // Set Base64 string
      };
    }
  }
  const handleDriverLicenseChangeAfter = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        setDriverLicense({ ...driverLicenseU, after: reader.result }); // Set Base64 string
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
        setIdentityCard({ ...identityCardU, before: reader.result }); // Set Base64 string
      };
    }
  }
  // handle file change for identity card :
  const handleIdentityCardChangeAfter = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        setIdentityCard({ ...identityCardU, after: reader.result }); // Set Base64 string
      };
    }
  }
  // handle update profile :
  const handleUpdateProfile = async () => {

    // Update profile - only send the fields that have been changed:
    const updatedFields = {};

    if (fullNameU !== fullName) updatedFields.fullName = fullNameU;
    if (ageU !== age) updatedFields.age = ageU;
    if (phoneU !== phone) updatedFields.phone = phoneU;
    if (genderU !== gender) updatedFields.gender = genderU;
    if (addressU !== address) updatedFields.address = addressU;
    if (provinceU !== province) updatedFields.province = provinceU;
    if (districtU !== district) updatedFields.district = districtU;
    if (communeU !== commune) updatedFields.commune = communeU;
    if (imageU !== image) updatedFields.image = imageU;
    if (!_.isEqual(driverLicenseU, driverLicense)) updatedFields.driverLicense = driverLicenseU;
    if (!_.isEqual(identityCardU, identityCard)) updatedFields.identityCard = identityCardU;

    console.log('updatedFields', updatedFields);
    // Update profile - only send the fields that have been changed:
    if (Object.keys(updatedFields).length === 0) {
      toast.error('No changes detected !');
      return;
    }

    await dispatch(updateUserProfile(updatedFields));
    if (!loading) {
      toast.success('Update profile success !');
      // navigate('/');
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
              src={`${imageU || '/default_avt.jpg'}`} // Replace with actual avatar URL
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
            value={fullNameU}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            type="number"
            value={ageU}
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
            value={phoneU}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={genderU}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male" selected={genderU === 'male'} >Male</option>
            <option value="female" selected={genderU === 'female'} >Femail</option>
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
            placeholder='ex : 76 Nguyen Hue'
            type="text"
            value={addressU}
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
            {driverLicenseU?.before && (
              <img src={driverLicenseU?.before} alt="Preview" className="size-20  ml-4 rounded" />
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
            {driverLicenseU?.after && (
              <img src={driverLicenseU?.after} alt="Preview" className="size-20  ml-4 rounded" />
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
            {identityCardU?.before && (
              <img src={identityCardU?.before} alt="Preview" className="size-20  ml-4 rounded" />
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
            {identityCardU?.after && (
              <img src={identityCardU?.after} alt="Preview" className="size-20  ml-4 rounded" />
            )}
          </div>
        </div>
      </div>

      {/* Update button :  */}
      <div>
        <Button
          className='bg-[#5819E0] hover:bg-[#5819F9] rounded-xl mx-auto flex my-5 w-1/4'
          // log all the data : 

          onClick={handleUpdateProfile}
        >
          {loading ? <Loader className='animate-spin mx-auto' size={20} /> : 'Update Profile'}
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfile;