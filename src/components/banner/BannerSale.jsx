import React from "react";

const BannerSale = () => {
  return (
    <div className="mb-10">
      <div className="container h-[220px] lg:h-[246px] w-full relative overflow-hidden banner-sale">
        <img
          src="http://cdn.shopify.com/s/files/1/0115/0272/collections/collection-banner_iPhone_Cases_Desktop.jpg?v=1625072679"
          alt=""
          className="w-[96%] max-sm:w-[90%] h-full rounded-lg object-cover absolute inset-0 left-2/4 -translate-x-2/4 -z-10"
        />
        <div className="absolute w-[20%] h-full top-0 left-[50%] skew-x-[45deg] bottom-0 bg-white bg-opacity-0 banner-left"></div>
        <div className=" banner-right absolute w-[20%] h-full top-0 right-[50%] skew-x-[45deg] bottom-0 bg-white bg-opacity-0"></div>
        <div className="h-full w-[100%] md:w-[50%] lg:w-[45%] max-md:mx-auto md:ml-auto text-[20px] md:text-[20px] lg:text-[26px] text-white flex flex-col justify-center max-md:items-center gap-y-4">
          <p>iPhone model of the times</p>
          <h3 className="font-bold text-[30px] md:text-[35px] lg:text-[45px] max-md:text-center">
            The pinnacle of mobile
          </h3>
          <p>Extra 30% Off</p>
        </div>
      </div>
    </div>
  );
};

export default BannerSale;
