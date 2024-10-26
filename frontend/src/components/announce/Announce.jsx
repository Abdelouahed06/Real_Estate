import { useEffect } from 'react';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteIcon } from '../../assets/svg/DeleteIcon';
import { EditIcon } from '../../assets/svg/EditIcon';
import { fetchDeleteAnnounces } from '../../redux/AnnounceReducer';
import { fetchRemoveFromMyFavourite } from '../../redux/FavouriteReducer';


const Announce = ({ announce, page }) => {


  const { type, city, address, num_rooms, num_bathrooms, space, price,announce_id } = announce;

  const token = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch()

  const handleDeleteAnnounce = async () => {

    const data = {
      announceId: announce.announce_id,
      token: token
    }
    await dispatch(fetchDeleteAnnounces(data))
  }

  const removeFromFavourite = async () => {
    console.log(token)
    await dispatch(fetchRemoveFromMyFavourite({announce_id: announce.announce_id, token}))
  }

  return (
    <div className='relative bg-white shadow-1 p-5 rounded-tl-[100px]  w-full max-w-[352px] h-[580px] mx-auto cursor-pointer hover:shadow-2xl transition'>
      <Link to={`/property/${announce_id}`}>
        <img src={`http://127.0.0.1:8000/images/${announce.images[0].image}`} alt='' className='object-cover rounded-tl-[100px] rounded-br-[100px] w-full h-[60%] mb-10' />
        <div className='mb-2 flex gap-x-2 text-sm'>
          <div className='bg-green-600 rounded-full text-white px-3'>
            {type}
          </div>
          <div className='bg-violet-500 rounded-full text-white px-3'>
            {city}
          </div>
        </div>
        <div className='text-lg font-semibold max-w-[260px]'>
          {address}
        </div>
        <div className='flex gap-x-4 my-4'>
          <div className='flex items-center text-gray-600 gap-1'>
            <div className='text-[20px]'>
              <BiBed />
            </div>
            <div>{num_bathrooms}</div>
          </div>
          <div className='flex items-center text-gray-600 gap-1'>
            <div className='text-[20px]'>
              <BiBath />
            </div>
            <div>{num_rooms}</div>
          </div>
          <div className='flex items-center text-gray-600 gap-1'>
            <div className='text-[20px]'>
              <BiArea />
            </div>
            <div>{space} m²</div>
          </div>
        </div>
        <div className='text-lg font-semibold text-violet-600 mb-4'>
          {price}
        </div>
      </Link>

      { page === 'my-announces' && <div className='flex gap-1 absolute top-2 right-2'>
          <div className='opacity-80 p-2 shadow-lg bg-gray-200 rounded-full cursor-pointer'>
              <EditIcon />
          </div>
          <div onClick={handleDeleteAnnounce} className='opacity-80 p-2 shadow-lg bg-gray-200 rounded-full cursor-pointer'>
              <DeleteIcon />
          </div> 
        </div> 
      }
      { page === 'my-favourites' && 
          <div onClick={removeFromFavourite} className='absolute top-2 right-2 opacity-80 p-2 shadow-lg bg-gray-200 rounded-full cursor-pointer'>
            <DeleteIcon />
          </div>
          
      }
      

    </div>
  )
};

export default Announce;