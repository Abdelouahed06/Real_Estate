import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateUser } from "../../redux/UserReducer";

const Profile = () => {
    const isLogin = JSON.parse(localStorage.getItem('token'));
    const dispatch = useDispatch()
    const user = useSelector(i => i.user.user);
    const status = useSelector(i => i.user.status);
    const [userInfo, setUserInfo] = useState({
        username: '',
        phone_num: '',
        city: '',
        email: ''
    })

    useEffect(() => {
        setUserInfo({
            username: user.username,
            phone_num: user.phone_num,
            city: user.city,
            email: user.email
        })
    }, [user])

    const handleForm = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            userId: user.user_id,
            userInfo: userInfo,
            token: isLogin
        }
        await dispatch(fetchUpdateUser(data))
    }
    return (

        <form onSubmit={handleSubmit} className="relative p-6 pb-10 w-full">
            <div>
                <label className="block mb-2" htmlFor=""><span className="text-red-500 mr-1">*</span>Name</label>
                <input className="block border border-solid border-gray-300 rounded-lg text-base p-2.5 w-full" id="current-password" name="username" value={userInfo.username} onChange={handleForm} type="text" placeholder="Name" />
            </div>
            <div className="mt-4">
                <label className="block mb-2" htmlFor=""><span className="text-red-500 mr-1">*</span>Phone</label>
                <input className="block border border-solid border-gray-300 rounded-lg text-base p-2.5 w-full" id="" name="phone_num" value={userInfo.phone_num} onChange={handleForm} type="number" placeholder="Phone" />
            </div>
            <div className="mt-4 mb-8">
                <label className="block mb-2" htmlFor=""><span className="text-red-500 mr-1">*</span>City</label>
                <input className="block border border-solid border-gray-300 rounded-lg text-base p-2.5 w-full" id="confirm-password" name="city" value={userInfo.city} onChange={handleForm} type="text" placeholder="City" />
            </div>
            <div className="mt-4 mb-8">
                <label className="block mb-2" htmlFor=""><span className="text-red-500 mr-1">*</span>Email</label>
                <input disabled className="block border border-solid border-gray-300 rounded-lg text-base p-2.5 w-full" id="confirm-password" name="email" value={userInfo.email} onChange={handleForm} type="email" placeholder="Email" />
            </div>
            <button type={status === 'loading' ? 'button' : 'submit'} className="absolute right-0 mr-6 w-28 bg-blue-500 text-white rounded-lg p-2 disabled">{status === 'loading' ? '....' : 'Update Info'}</button>
        </form>
    )

}

export default Profile