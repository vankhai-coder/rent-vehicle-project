import React from "react";

const Footer = () => {
  return (
    <div className="px-4 md:px-6 lg:px-8">
      <div
        className="w-full h-[200px] md:h-[250px] lg:h-[320px] my-12 md:my-16 lg:my-24 bg-cover bg-center border border-black rounded-lg md:rounded-xl"
        style={{ backgroundImage: `url('/footer.png')` }}
      ></div>
    </div>
  );
};

export default Footer;
