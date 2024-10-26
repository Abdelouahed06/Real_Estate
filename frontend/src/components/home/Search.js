import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'

import { RiSearch2Line } from 'react-icons/ri'
import City from '../dropdown/City';
import Price from '../dropdown/Price';
import PropertyType from '../dropdown/PropertyType';
import { useDispatch } from 'react-redux';
import { fetchFilterAnnounces } from '../../redux/AnnounceReducer';
// import { fetchFilterAnnounces } from '../redux/AnnounceReducer';

const Search = ({ price, city, type, setPrice, setCity, setType, handleFilter }) => {



  return (
    <div className='bg-white px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 lg:bg-transparent lg:backdrop-blur rounded-lg'>
      <City setCity={setCity} city={city} />
      <PropertyType setType={setType} type={type} />
      <Price setPrice={setPrice} price={price} />
      {/* <button onClick={() => handleClick()} className='bg-violet-700 hover:bg-violet-800 transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center text-white text-lg'> */}

      <button onClick={() => handleFilter()} className='bg-violet-700 hover:bg-violet-800 transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center text-white text-lg'>
        <RiSearch2Line />
      </button>
    </div>
  )
};

export default Search;
