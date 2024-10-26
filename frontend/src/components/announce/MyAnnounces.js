import { useEffect, useState } from 'react'
import NoFav from '../../assets/noResultAnnounces.png'
import BackNav from '../content/BackNav'
import ContentNav from '../content/ContentNav'
import BtnAddAnnounce from './BtnAddAnnounce'
import { ImSpinner2 } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDeleteAnnounces, fetchGetOneAnnounce, fetchMyAnnounces } from '../../redux/AnnounceReducer'
import AnnounceList from './AnnounceLIst'


const MyAnnounces = () => {

    const [isNav, setIsNav] = useState(false)
    const token = JSON.parse(localStorage.getItem('token'));
    const user = useSelector(i => i.user.user);
    const status = useSelector(i => i.announces.status);
    const dispatch = useDispatch()
    // const house = useSelector(i => i.announces.announces);
    

    useEffect(() => {
        const handleMyAnnounces = async () => {
            const data = {
                userId: user.user_id,
                token: token
            };
            await dispatch(fetchMyAnnounces(data));
        };
        handleMyAnnounces();
    }, [dispatch, user.user_id, token]);

    const announces = useSelector(i => i.announces.myAnnounces) || [];

    useEffect(()=>{
        console.log(announces)
    },[announces])


    if (status === 'loading') {
        return (
            <ImSpinner2 className='mx-auto animate-spin text-violet-700 text-4xl mt-[200px]' />
        )
    }
    return (

        <div className="flex justify-center w-full mb-6">
            <div className={`${isNav ? 'w-full' : 'w-[85%]'} bg-white`}>
                {!isNav && <BackNav page="My Announces" setIsNav={setIsNav} />}
                <div className={`${isNav ? 'block' : 'md:block hidden'}`}><ContentNav activeNav='announces' setIsNav={setIsNav} /></div>

                {!isNav && announces.length <= 0 && <div>

                    {/* if there is no saved announces */}
                    <div className="flex flex-col items-center justify-center mt-6">
                        <img src={NoFav} className="w-60" alt="No Favorites" />
                        <span className="text-gray-500 my-6 md:text-xl text-md">You Don't Have Any Announces Yet!</span>
                        <BtnAddAnnounce />
                    </div>
                    {/* <House /> */}
                </div>
                }
                {!isNav && announces.length >= 1 &&
                    <AnnounceList announces={announces} page='my-announces' />
                }
            </div>
        </div>
    )
}

export default MyAnnounces