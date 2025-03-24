import React, { useState } from 'react'

const AboutUs = () => {
  const faqData = [
    {
      question: 'How does it works?',
      answer: 'Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna ut at et in. Turpis aliquet cras hendrerit enim condimentum. Condimentum interdum risus bibendum urna. Augue aliquet varius faucibus ut integer tristique ut. Pellentesque id nibh sed nulla non nulla.',
    },
    {
      question: 'Can I rent a car without a credit card?',
      answer: 'Yes, some car rental companies allow you to rent a car without a credit card. However, you will likely need to provide a debit card or cash deposit and meet certain age and residency requirements.',
    },
    {
      question: 'What are the requirements for renting a car?',
      answer: 'Generally, you need a valid driver\'s license, be at least 21 years old (or 25 in some cases), and have a credit or debit card. Some companies may also require proof of insurance.',
    },
    {
      question: 'Does Car Rental allow me to tow with or attach a hitch to the rental vehicle?',
      answer: 'Most car rental companies do not allow towing or attaching hitches to their vehicles due to liability and safety concerns. It\'s best to check with the specific company you are renting from.',
    },
    {
      question: 'Does Car Rental offer coverage products for purchase with my rental?',
      answer: 'Yes, most car rental companies offer various coverage products, such as Loss Damage Waiver (LDW), Liability Protection, and Personal Accident Insurance. These products can provide additional protection during your rental period.',
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
            <p className="text-gray-600 text-sm">Home / About Us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-gray-800 text-center md:text-left">
                Where every drive feels extraordinary
              </h3>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Variety Brands</h4>
                <p className="text-gray-600">
                  Platea non auctor fermentum sollicitudin. Eget adipiscing augue sit quam natoque ornare cursus viverra odio.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Awesome Support</h4>
                <p className="text-gray-600">
                  Eget adipiscing augue sit quam natoque ornare cursus viverra odio. Diam quam gravida ultricies velit.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Maximum Freedom</h4>
                <p className="text-gray-600">
                  Diam quam gravida ultricies velit duis consequat integer. Est aliquam posuere vel rhoncus massa volutpat in.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Flexibility On The Go</h4>
                <p className="text-gray-600">
                  Vitae pretium nulla sed quam id nisi semper. Vel non in proin egestas dis. faucibus rhoncus, iaculis dignissim aenean pellentesque nisi.
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
              Mliquam adipiscing velit semper modi. Parus nan eu cursus porttitor laique et gravida. Quis nunc. Mandare gravida ultrices carper.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">Velit semper modi. Parus nan eu cursus porttitor laique et gravida...</p>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">Parus nan eu cursus porttitor laique et gravida. Quis nunc.</p>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">Mliquam adipiscing velit semper modi. Nunc nan eu cursus porttitor.</p>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">Quis nunc ultrices gravida ullamcorper.</p>
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
                  Et aliquet netus at sapien pellentesque mollis nec dignissim maecenas. Amet erat volutpat quisque odio purus feugiat. In gravida neque.
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200  bg-cover " style={{ backgroundImage: "url('/default_avt.jpg')" }}></div> {/* Blurred Profile Image */}
                </div>
              </div>
              <div className="bg-purple-100 p-4 text-center">
                <p className="text-sm text-gray-600">Kuphal LLC</p>
                <p className="font-semibold text-purple-600">Emanuel Boyle</p>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-8">
                <p className="text-4xl text-gray-400 mb-4">“</p>
                <p className="text-gray-700 mb-6">
                  Quam neque odio urna euismod felis. Sit egestas magna in quisque famesdapibus quis sapien magna. Nisl non eget sit pellentesque tristique et.
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 blur-lg"></div> {/* Blurred Profile Image */}
                </div>
              </div>
              <div className="bg-purple-100 p-4 text-center">
                <p className="text-sm text-gray-600">Haag LLC</p>
                <p className="font-semibold text-purple-600">Ryder Malone</p>
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-8">
                <p className="text-4xl text-gray-400 mb-4">“</p>
                <p className="text-gray-700 mb-6">
                  Quam neque odio urna euismod felis. Sit egestas magna in quisque famesdapibus quis sapien magna. Nisl non eget sit pellentesque tristique et.
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 blur-lg"></div> {/* Blurred Profile Image */}
                </div>
              </div>
              <div className="bg-purple-100 p-4 text-center">
                <p className="text-sm text-gray-600">Haag LLC</p>
                <p className="font-semibold text-purple-600">Ryder Malone</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* question and answer part :  */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Car Rental Questions</h2>

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
        <h2 className="text-3xl font-bold mb-4">Looking for a car?</h2>
        <p className="text-xl mb-6">+537 547-6401</p>
        <p className="mb-6 text-sm">
          Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien bibendum ullamcorper in...
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