import { ImSpinner2 } from 'react-icons/im'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Announce from './Announce';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnnounces, fetchDeleteAnnounces } from '../../redux/AnnounceReducer';

const AnnounceList = ({ announces, page }) => {

  const status = useSelector(i => i.announces?.status);
  // const token = JSON.parse(localStorage.getItem('token'));

  // const dispatch = useDispatch()

  useEffect(()=>{
    console.log(announces)
  },[announces])


  if (status === 'loading') {
    return (
      <ImSpinner2 className='mx-auto animate-spin text-violet-700 text-4xl mt-[200px]' />
    )
  }
  // if (announces && announces.length < 1) {
  //   return <div className='text-center text-3xl text-gray-400 mt-48'>Sorry, nothing found</div>
  // }



  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'>
          {announces && announces.map((announce, index) => (
            <div> 
                <Announce announce={announce} page={page} key={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default AnnounceList;
