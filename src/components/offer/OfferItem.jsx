import React from 'react';

const OfferItem = ({ img, text, imgIcon ,lorem}) => {
    return (
        <div className=' bg-white rounded-lg p-5 flex flex-col justify-center items-center gap-y-5 md: w-full card-desc'>
            <div className='w-[160px] h-[160px] rounded-full bg-[#f4f4f4] flex items-center justify-center'>
                <img src={img} alt="" className='w-[50%] h-[50%]' />
            </div>
            <h3 className='text-primary text-xl font-semibold'>{text}</h3>
            <p className='text-dark text-center align-middle'>{lorem}</p>
            <img src={imgIcon} alt="" className='w-[50px] rounded-full object-cover' />
        </div>
    );
};

export default OfferItem;