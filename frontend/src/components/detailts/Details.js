import { useEffect, useState } from 'react';
import img2 from '../../assets/house1lg.png'
import House1Lg from '../../assets/img/houses/house1lg.png';
import House2Lg from '../../assets/img/houses/house2lg.png';
import House3Lg from '../../assets/img/houses/house3lg.png';
import House4Lg from '../../assets/img/houses/house4lg.png';
import House5Lg from '../../assets/img/houses/house5lg.png';
import House6Lg from '../../assets/img/houses/house6lg.png';
import House7Lg from '../../assets/img/houses/house7lg.png';
import House8Lg from '../../assets/img/houses/house8lg.png';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddToFavourite, fetchRemoveFromMyFavourite, getAnnouneDetails } from '../../redux/FavouriteReducer';

const Details = () => {

    // const images = [House1Lg, House2Lg, House3Lg, House4Lg, House5Lg, House6Lg, House7Lg, House8Lg]

    const response = useSelector(i => i.favourites.announce);
    const status = useSelector(i => i.favourites.status);


    const [announce, setAnnounce] = useState(null)
    const [isFave, setIsFav] = useState(false)


    const [step, setStep] = useState(1)

    const nextStep = () => {
        setStep(step+1)
    }

    const prevStep = () => {
        setStep(step-1)
    }

    function convertDate(dateString) {

        const date = new Date(dateString);
        const currentDate = new Date();
        const diff = currentDate - date;

        const seconds = Math.floor(diff / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const months = Math.floor(days / 30)
        const years = Math.floor(months / 12)

        if(years >= 1) {
            console.log('years: ', years)
            return years === 1 ? 'One year ago' : `${years} years ago`
        } else if(months >= 1) {
            console.log('months: ', months)
            return months === 1 ? 'One month ago' : `${months} months ago`
        } else if(days >= 1) {
            console.log('days: ', days)
            return days === 1 ? 'One day ago' : `${days} days ago`
        } else if(hours >= 1) {
            console.log('hours: ', hours)
            return hours === 1 ? 'One hour ago' : `${hours} hours ago`
        } else if(minutes >= 1) {
            console.log('minutes: ', minutes)
            return minutes === 1 ? 'One minute ago' : `${minutes} minutes ago`
        } else {
            console.log('seconds: ', seconds)
            return seconds === 1 ? 'One second ago' : `${seconds} seconds ago`
        }
    
        
    }
    

    const token = JSON.parse(localStorage.getItem('token'));

    const dispatch = useDispatch()

    const { id } = useParams()

    // const history = useHistory()
    const navigate = useNavigate()

    const goBack = () => {
    // window.location.href = '/'   
    navigate('/') 
    }

    const handleFavClick = async () => {
        if(isFave) {
            // remove from favourite
            await dispatch(fetchRemoveFromMyFavourite({announce_id: id, token}))
            if(status === 'succeeded') setIsFav(false)
            console.log('remove: ', isFave, status)
        } else {
            // add to favourite
            await dispatch(fetchAddToFavourite({announce_id: id, token}))
            if(status === 'succeeded') setIsFav(true)

            console.log('add: ', isFave, status)


        }
    }

    useEffect(() => {
        if(Object.keys(response).length !== 0) { 
            console.log(response.isFavourite) 
            setAnnounce(response.announce)
            setIsFav(response.isFavourite)
        }
    }, [response])


    useEffect(() => {
        console.log(id)
        dispatch(getAnnouneDetails({announce_id: id, token}))
    }, [])

    useEffect(() => {
        console.log('announce: ', announce)
    }, [announce])


    return (

        <div className='flex flex-col py-6 items-center bg-[#fff]' > 
            
            {/* image container */}
            <div className='flex justify-center w-[100%] bg-[#fff]'>
                <div className='relative md:w-[70%] w-[90%] md:h-80 h-64 bg-gray-200'>

                    <img className='object-contain w-full h-full' src={announce && `http://127.0.0.1:8000/images/${announce.images[step-1].image}`} />
                    {/* <Link to={'/'}> */}
                    <div onClick={goBack} className='absolute shadow-lg bg-white rounded-full p-2 cursor-pointer top-1 left-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="rgb(71, 71, 71)" d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2H7.825Z"></path>
                        </svg>
                    </div>
                    {/* </Link> */}
                    {isFave ? (
                            <div onClick={handleFavClick} className="absolute shadow-lg top-1 right-1 rounded-full bg-white p-1 w-fit cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 21 21">
                                    <path fill="red" stroke="red" strokeLinecap="round" strokeLinejoin="round" d="M10.5 6.5c.5-2.5 4.343-2.657 6-1c1.603 1.603 1.5 4.334 0 6l-6 6l-6-6a4.243 4.243 0 0 1 0-6c1.55-1.55 5.5-1.5 6 1z"></path>
                                </svg>
                            </div>
                        ) : (
                            <div onClick={handleFavClick} className="absolute shadow-lg top-1 right-1 rounded-full bg-white p-1 w-fit cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 21 21">
                                    <path fill="white" stroke="rgb(71, 71, 71)" strokeLinecap="round" strokeLinejoin="round" d="M10.5 6.5c.5-2.5 4.343-2.657 6-1c1.603 1.603 1.5 4.334 0 6l-6 6l-6-6a4.243 4.243 0 0 1 0-6c1.55-1.55 5.5-1.5 6 1z"></path>
                                </svg>
                            </div>
                        )
                    }
                    { announce && step < announce.images.length && <div onClick={nextStep}  className='absolute bg-gray-600 opacity-80 shadow-lg p-2 top-[50%] translate-y-[-50%] right-1 rounded-full cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                <path fill="white" d="m5.157 13.069l4.611-4.685a.546.546 0 0 0 0-.768L5.158 2.93a.552.552 0 0 1 0-.771a.53.53 0 0 1 .759 0l4.61 4.684a1.65 1.65 0 0 1 0 2.312l-4.61 4.684a.53.53 0 0 1-.76 0a.552.552 0 0 1 0-.771"></path>
                            </svg>
                        </div>
                    }
                    { announce && step !== 1 && <div onClick={prevStep} className='absolute bg-gray-600 opacity-80 shadow-lg p-2 top-[50%] translate-y-[-50%] left-1 rounded-full cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                <path fill="white" d="M10.843 13.069L6.232 8.384a.546.546 0 0 1 0-.768l4.61-4.685a.552.552 0 0 0 0-.771a.53.53 0 0 0-.759 0l-4.61 4.684a1.65 1.65 0 0 0 0 2.312l4.61 4.684a.53.53 0 0 0 .76 0a.552.552 0 0 0 0-.771"></path>
                            </svg>
                        </div>
                    }
                    <div className='absolute shadow-lg flex items-center gap-2 px-2 py-1 bg-white rounded-lg bottom-1 left-1 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                            <path fill="currentColor" d="M208 34H80a14 14 0 0 0-14 14v18H48a14 14 0 0 0-14 14v128a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14v-18h18a14 14 0 0 0 14-14V48a14 14 0 0 0-14-14ZM78 48a2 2 0 0 1 2-2h128a2 2 0 0 1 2 2v74.2l-20.1-20.1a14 14 0 0 0-19.8 0L94.2 178H80a2 2 0 0 1-2-2Zm100 160a2 2 0 0 1-2 2H48a2 2 0 0 1-2-2V80a2 2 0 0 1 2-2h18v98a14 14 0 0 0 14 14h98Zm30-30h-96.83l67.41-67.41a2 2 0 0 1 2.83 0L210 139.17V176a2 2 0 0 1-2 2Zm-88-68a22 22 0 1 0-22-22a22 22 0 0 0 22 22Zm0-32a10 10 0 1 1-10 10a10 10 0 0 1 10-10Z"></path>
                        </svg>
                        <span>{`${step}/${announce && announce.images.length}`}</span>
                    </div>
                </div>
            </div>

            {/* content container */}
            <div className='flex flex-col py-8 items-center w-[100%]'>
                {/* info */}
                <div className='flex md:flex-row flex-col md:justify-between md:items-center md:w-[70%] w-[90%] md:px-12 px-2'> 
                    <div>
                        <p className='text-2xl text-gray-800'>{announce && announce.title}</p>
                        <div className='flex items-center bg-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <g fill="none">
                                    <path fill="currentColor" fill-rule="evenodd" d="M12.398 17.804C13.881 17.034 19 14.016 19 9A7 7 0 1 0 5 9c0 5.016 5.119 8.035 6.602 8.804a.855.855 0 0 0 .796 0M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6" clip-rule="evenodd"/>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18.062 16.5c.615.456.938.973.938 1.5s-.323 1.044-.938 1.5c-.614.456-1.498.835-2.562 1.098c-1.064.263-2.271.402-3.5.402s-2.436-.139-3.5-.402s-1.948-.642-2.562-1.098C5.323 19.044 5 18.527 5 18s.323-1.044.938-1.5"/>
                                </g>
                            </svg>
                            <span className='mr-6 ml-2 text-gray-700'>{announce && announce.city}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm96 240h-96a16 16 0 0 1-16-16V128a16 16 0 0 1 32 0v128h80a16 16 0 0 1 0 32Z"></path>
                            </svg>
                            <span className='ml-2 text-gray-700'>{announce && convertDate(announce.created_at)}</span>
                        </div>
                        
                       
                    </div>
                    <div>
                        <p className='text-2xl text-blue-600 font-medium'>{announce && announce.price}</p>
                    </div>
                </div>
                <hr className='h-px md:w-[60%] w-[80%] my-4 bg-gray-300 border-0'/>
                {/* publisher contact */}
                <div className='flex md:w-[70%] w-[90%] md:px-12 px-2 justify-between'>
                    <div className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"></path>
                                <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"></path>
                            </g>
                        </svg>
                        <span className='text-xl text-gray-800'>{announce && announce.user.username}</span>
                    </div>
                    <div title={announce && announce.user.phone_num} className='flex items-center p-2 gap-1 rounded-xl bg-blue-500 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="white" d="M19.2 20q-2.702 0-5.418-1.244t-5.005-3.533q-2.27-2.288-3.523-5.021Q4 7.469 4 4.8V4h4.438l.849 4.083l-2.697 2.51q.685 1.186 1.418 2.167q.732.98 1.527 1.769q.802.84 1.808 1.57q1.007.73 2.295 1.44l2.612-2.708l3.75.756V20h-.8Z"></path>
                        </svg>
                        <p><a className='text-white' href={`tel:+212${announce && announce.user.phone_num.substring(1)}`}>Contact Buyer</a></p>
                    </div>
                    
                </div>

                <hr className='h-px md:w-[60%] w-[80%] my-4 bg-gray-300 border-0'/>

                {/* rooms - bathrooms - space */}
                <div className='flex items-center justify-around md:w-[70%] w-[90%] md:px-12 px-2'>
                    <div className='flex flex-col items-center gap-4'>
                        <div title='Rooms' className='bg-gray-200 rounded-full p-2 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 6.5a4 4 0 0 1 8 0Zm2 3v1m-1.5 2v1m3.5-1v1m3.5-1v1M9 9.5v1m-2-8v-2"></path>
                            </svg>
                        </div>
                        
                        <span>{announce && announce.num_bathrooms}</span>
                    </div>
                    <div className='flex flex-col items-center gap-4' >
                        <div title='Bathrooms' className='bg-gray-200 rounded-full p-2 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M5.615 16.462H6.5v-1.577h11v1.577h.885v-3.427q0-.39-.2-.815q-.2-.424-.55-.678V9.846q0-.69-.463-1.153q-.462-.462-1.153-.462h-2.904q-.39 0-.669.142T12 8.762q-.167-.247-.446-.389q-.279-.142-.67-.142H7.982q-.69 0-1.153.462q-.463.463-.463 1.153v1.696q-.35.254-.55.678q-.2.424-.2.815v3.427ZM6.5 14v-1q0-.425.288-.713T7.5 12h9q.425 0 .713.288T17.5 13v1h-11Zm.75-2.885V9.731q0-.27.173-.443t.442-.173h3.077q.27 0 .443.173q.173.174.173.443v1.384H7.25Zm5.192 0V9.731q0-.27.173-.443t.443-.173h3.077q.269 0 .442.173t.173.443v1.384h-4.308ZM4.615 21q-.69 0-1.152-.462Q3 20.075 3 19.385V4.615q0-.69.463-1.152Q3.925 3 4.615 3h14.77q.69 0 1.152.463q.463.462.463 1.152v14.77q0 .69-.462 1.152q-.463.463-1.153.463H4.615Zm0-1h14.77q.23 0 .423-.192q.192-.193.192-.423V4.615q0-.23-.192-.423Q19.615 4 19.385 4H4.615q-.23 0-.423.192Q4 4.385 4 4.615v14.77q0 .23.192.423q.193.192.423.192ZM4 20V4v16Z"></path>
                            </svg>
                        </div>
                        
                        <span>{announce && announce.num_rooms}</span>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <div title='Area' className='bg-gray-200 rounded-full p-2 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                                <path fill="currentColor" d="M27 22.142V9.858A3.992 3.992 0 1 0 22.142 5H9.858A3.992 3.992 0 1 0 5 9.858v12.284A3.992 3.992 0 1 0 9.858 27h12.284A3.992 3.992 0 1 0 27 22.142ZM26 4a2 2 0 1 1-2 2a2.002 2.002 0 0 1 2-2ZM4 6a2 2 0 1 1 2 2a2.002 2.002 0 0 1-2-2Zm2 22a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2Zm16.142-3H9.858A3.994 3.994 0 0 0 7 22.142V9.858A3.995 3.995 0 0 0 9.858 7h12.284A3.994 3.994 0 0 0 25 9.858v12.284A3.993 3.993 0 0 0 22.142 25ZM26 28a2 2 0 1 1 2-2a2.003 2.003 0 0 1-2 2Z"></path>
                            </svg>
                        </div>
                        
                        <span>{announce && announce.space} m2</span>
                    </div>

                </div>

                <hr className='h-px md:w-[60%] w-[80%] my-4 bg-gray-300 border-0'/>


                {/* description */}
                <div className='md:w-[70%] w-[90%] md:px-12 px-2'>
                    <span className='text-xl text-gray-700'>Description</span>
                    <p className='text-gray-600 mt-2'>{announce && announce.description}</p>
                </div>
            </div>


        </div>

        
    )


}

export default Details