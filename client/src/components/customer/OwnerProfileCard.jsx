import React from 'react';

function OwnerProfile({ name, image, bio, reviews, joinDate, numberOfStores }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg ml-0">
      <h2 className="text-xl font-semibold mb-4">Motobile Owner</h2>
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-medium">{name}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{reviews} reviews</span>
            <span className="mx-1">•</span>
            <span>{numberOfStores} places</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-4">{bio}</p>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>Joined in {joinDate}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span>Response rate - 100%</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Fast response - within a few hours</span>
      </div>
      <button className="text-blue-600 font-medium">See host profile</button>
    </div>
  );
}

export default OwnerProfile;