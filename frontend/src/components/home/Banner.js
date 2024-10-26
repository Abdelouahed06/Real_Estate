import React from 'react';
import Image from '../../assets/img/house-banner.png';
import Search from './Search';

const Banner = ({ price, city, type, setPrice, setCity, setType, handleFilter }) => {

  return(
    <section className='h-full max-h-[640px] mt-12 mb-8 xl:mb-24'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
          <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'>
              <span className='text-violet-700'>Rent</span> Your Dream House With Us.
          </h1>
          <p className='max-w-[480px] mb-8'>
            Welcome to HomeLand, your premier destination for buying, selling, and renting properties of all kinds. Whether you're searching for your dream home, a lucrative investment opportunity, or a cozy rental, we've got you covered.
          </p>
        </div>
        <div className='hidden flex-1 lg:flex justify-end items-end'>
          <img src={Image} alt=''/>
        </div>
      </div>
      <Search price={price} city={city} type={type} setPrice={setPrice} setCity={setCity} setType={setType} handleFilter={handleFilter}/>
    </section>
    
  )
};

export default Banner;
