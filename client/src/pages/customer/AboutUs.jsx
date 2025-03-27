import React, { useState } from 'react'

const AboutUs = () => {
  const faqData = [
    {
      question: 'How does it works?',
      answer: 'You search your vehicle type and location and select the vehicle you want to rent.',
    },
    {
      question: 'Can I rent a motoblie without a credit card?',
      answer: ' Yes, you can rent a motorcycle without a credit card as long as you have a valid driver\'s license.',
    },
    {
      question: 'What are the requirements for renting a motobile?',
      answer: 'You must be at least 18 years old and have a valid driver\'s license.',
    },
    {
      question: 'Does Motobile Rental allow me to tow with or attach a hitch to the rental vehicle?',
      answer: 'Yes, most car rental companies allow towing or attaching a hitch to the rental vehicle, depending on the specific company you are renting from.',
    },
    {
      question: 'Does Motobile Rental offer coverage products for purchase with my rental?',
      answer: 'Yes, most car rental companies offer coverage products for purchase with your rental.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (

    <div>
      {/* first part :  */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">About Us</h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-gray-800 text-center md:text-left">
              where every experience is best
              </h3>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Variety Brands</h4>
                <p className="text-gray-600">
                We offer you the best variety of vehicles. You can choose from a wide range of vehicles to suit your needs. Whether you are looking for a car, motorcycle, or RV, we have got you covered.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Awesome Support</h4>
                <p className="text-gray-600">
                  If you have any queston tell to us. We are here to help you 24/7.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Maximum Freedom</h4>
                <p className="text-gray-600">
                  Rent vehickes you want , go to every where you want.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Flexibility On The Go</h4>
                <p className="text-gray-600">
                  Rent a vehicle from us and make your trip unforgettable, we are here to help you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* second part -video :  */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg overflow-hidden">
        {/* Blurred Background Image (You'll need to replace with your actual image) */}
        <div className="absolute inset-0 bg-[url('your-blurred-image.jpg')] bg-cover bg-center blur-lg"></div>

        {/* Play Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.718 7.718a1 1 0 011.414 0L10 9.586l1.868-1.868a1 1 0 111.414 1.414L11.414 11l1.868 1.868a1 1 0 01-1.414 1.414L10 12.414l-1.868 1.868a1 1 0 01-1.414-1.414L8.586 11 6.718 9.132a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Statistics Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 py-8 px-4 md:px-16 flex justify-around items-center">
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-700">20k+</p>
            <p className="text-sm text-gray-600">Happy customers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-700">540+</p>
            <p className="text-sm text-gray-600">Count of cars</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-700">25+</p>
            <p className="text-sm text-gray-600">Years of experience</p>
          </div>
        </div>
      </div>
      {/* third part : */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div className="text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Unlock unforgettable memories on the road</h2>
            <p className="text-gray-600 mb-6">
              Let us take you on a journey to explore the world. We offer a wide range of vehicles to suit your needs. Whether you are looking for a car, motorcycle, or RV, we have got you covered. Our vehicles are well-maintained and ready to hit the road. Rent a vehicle from us and make your trip unforgettable.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">With a wide range of vehicles to choose from.</p>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">We offer a wide range of vehicles to choose from.</p>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">Give you the best experience.</p>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">We have got you covered.</p>
              </li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="rounded-lg overflow-hidden">
            <div className=" h-[60vh] bg-cove bg-center rounded-4xl flex justify-center items-center" style={{ backgroundImage: "url('/home-page-hero.png')" }}>
            </div>
          </div>
        </div>
      </div>

      {/* fourth part : */}

      {/* fifth part review : */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Reviews from our customers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Review Card 1 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-8">
                <p className="text-4xl text-gray-400 mb-4">“</p>
                <p className="text-gray-700 mb-6">
                  This is the best vehicle rental service I have ever used. The staff is friendly and the vehicles are in great condition. I highly recommend this service to anyone looking for a reliable vehicle rental service.
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200  bg-cover " style={{ backgroundImage: "url('/default_avt.jpg')" }}></div> {/* Blurred Profile Image */}
                </div>
              </div>
              <div className="bg-purple-100 p-4 text-center">
                <p className="text-sm text-gray-600">RV FC</p>
                <p className="font-semibold text-purple-600">Van Khai</p>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-8">
                <p className="text-4xl text-gray-400 mb-4">“</p>
                <p className="text-gray-700 mb-6">
                This is the best vehicle rental service I have ever used. The staff is friendly and the vehicles are in great condition. I highly recommend this service to anyone looking for a reliable vehicle rental service.
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 blur-lg"></div> {/* Blurred Profile Image */}
                </div>
              </div>
              <div className="bg-purple-100 p-4 text-center">
                <p className="text-sm text-gray-600">RV FC</p>
                <p className="font-semibold text-purple-600">Thai Bao</p>
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-8">
                <p className="text-4xl text-gray-400 mb-4">“</p>
                <p className="text-gray-700 mb-6">
                This is the best vehicle rental service I have ever used. The staff is friendly and the vehicles are in great condition. I highly recommend this service to anyone looking for a reliable vehicle rental service.
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 blur-lg"></div> {/* Blurred Profile Image */}
                </div>
              </div>
              <div className="bg-purple-100 p-4 text-center">
                <p className="text-sm text-gray-600">RV FC</p>
                <p className="font-semibold text-purple-600">Son Tung</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* question and answer part :  */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Vehicle Rental Questions</h2>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="font-semibold">{item.question}</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform transform ${openIndex === index ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openIndex === index && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* last part : */}
      <div className="bg-gradient-to-r mb-12 from-purple-600 to-indigo-600 rounded-2xl shadow-lg overflow-hidden relative">
      {/* Blurred Car Image Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-40 blur-lg" style={{ backgroundImage: 'url(/car-image.jpg)' }}></div> 
      {/* Replace '/car-image.jpg' with your car image */}

      <div className="relative z-10 p-8 text-white text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Looking for a vehicle?</h2>
        <p className="text-xl mb-6">+84 697 260 78</p>
        <p className="mb-6 text-sm">
         Contact with us to get the best vehicle for your trip.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full">
          Book now
        </button>
      </div>
    </div>

    </div>
  )
}

export default AboutUs