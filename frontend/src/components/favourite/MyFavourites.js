import BackNav from "../content/BackNav"
import ContentNav from "../content/ContentNav"
import NoFav from '../../assets/noResultFavourites.png'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyFavourites } from "../../redux/FavouriteReducer"
import AnnounceList from "../announce/AnnounceLIst"


const MyFavourites = () => {

    const [isNav, setIsNav] = useState(false)
    const [myFavourites, SetMyFavourites] = useState([])

    const response = useSelector(i => i.favourites.favourites);
    const user = useSelector(i => i.user.user);

    const isLogin = JSON.parse(localStorage.getItem('token'));

    const dispatch = useDispatch()

    useEffect(  () => {
        // console.log('user_id = ', user.user_id !== undefined)
        // console.log(isLogin)

        const fetchFavourites = async () => {
            await dispatch(fetchMyFavourites(isLogin));
        }

        if(user.user_id !== undefined) fetchFavourites()

    }, [user])

    useEffect(() => {
        // const {announce} = response
        if(response) console.log(response)
    
        if(response) {
            const announces = response.map(item => item.announce)
            // console.log(announces)
            SetMyFavourites([...announces])
            // console.log(myFavourites)
        } 

        // SetMyFavourites(response)

    }, [response])

    

    return (
        <div className="flex bg-white justify-center w-full pb-8">
            <div className={`${isNav ? 'w-full' : 'w-[85%]'} bg-white`}>
                { !isNav &&  <BackNav page="My Favourites" setIsNav={setIsNav}/> }
                <div className={`${isNav ? 'block' : 'md:block hidden'}`}><ContentNav setIsNav={setIsNav} activeNav='favourites'/></div>
                
                { !isNav && myFavourites.length <= 0 && 

                        <div className="flex flex-col items-center justify-center mt-6">
                                <img src={NoFav} className="w-80" alt="No Favorites"/>
                                <span className="text-gray-500 mt-6 md:text-xl text-md">You Don't Have Any Announces Saved!</span>
                        </div>
                }      
                        
                { !isNav && myFavourites.length >= 1 && <AnnounceList page={'my-favourites'} announces={myFavourites}/> }
                            
                
                
                
            </div>
        </div>
    )
}

export default MyFavourites




