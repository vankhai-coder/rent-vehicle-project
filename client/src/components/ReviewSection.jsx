import React from 'react';

function ReviewSection({ numberOfReviews, arrayOfReviews }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4">Reviews ({numberOfReviews} reviews)</h2>

      {/* Star Rating Section */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className="size-9 text-yellow-400"
            viewBox="0 5 25 25"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3.636l2.83 5.733 6.27.913a.833.833 0 01-.469 1.42l-4.542 3.514 1.072 6.25a.833.833 0 01-1.208.88l-5.66-2.982-5.66 2.982a.833.833 0 01-1.208-.88l1.072-6.25L.4 11.702a.833.833 0 01-.469-1.42l6.27-.913L10 3.636z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>

      {/* Review Input Section */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Share your thoughts..."
          className="border rounded-l-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-2.293 2.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Review List */}
      {arrayOfReviews.map((review, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-start">
            <img
              src={review.image}
              alt={review.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
                <div className="flex">
                  {[...Array(review.star)].map((_, starIndex) => (
                    <svg
                      key={starIndex}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3.636l2.83 5.733 6.27.913a.833.833 0 01-.469 1.42l-4.542 3.514 1.072 6.25a.833.833 0 01-1.208.88l-5.66-2.982-5.66 2.982a.833.833 0 01-1.208-.88l1.072-6.25L.4 11.702a.833.833 0 01-.469-1.42l6.27-.913L10 3.636z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.review}</p>
            </div>
          </div>
        </div>
      ))}

      {/* View More Reviews Button */}
      <button className="text-blue-600 font-medium">View more {numberOfReviews - arrayOfReviews.length} reviews</button>
    </div>
  );
}

export default ReviewSection;