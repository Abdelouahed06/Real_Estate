import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRegister } from '../../redux/AuthReducer';
import Cities from '../../Cities.json'


const EyeIcon = ({ handleClick, isPasswordVisible }) => (
  <div className="absolute bottom-4 right-3 cursor-pointer" onClick={handleClick}>
    {isPasswordVisible ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <path d="M3 13c3.6-8 14.4-8 18 0"></path>
          <path fill="currentColor" d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"></path>
        </g>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19.5 16l-2.475-3.396M12 17.5V14m-7.5 2l2.469-3.388M3 8c3.6 8 14.4 8 18 0"></path>
      </svg>
    )}
  </div>
);

function Register() {

  const dispatch = useDispatch()
  const location = useNavigate()
  const response = useSelector(i => i.auth.response);
  const status = useSelector(i => i.auth.status);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    phone_num: '',
    password: '',
    city: ''
  })

  const handleForm = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(fetchRegister(userInfo))
    console.log(response)
    if (localStorage.getItem('token')) {
      window.location.href = '/'
    }
  }
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <section className="bg-gray flex items-center justify-center p-4">
      <div className="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-4 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Sign Up</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input className="p-2 mt-8 rounded-xl border w-full outline-none" type="text" name="username" value={userInfo.username} onChange={handleForm} placeholder="full name" />
            {response.error && response.error.username && <span className='text-[12px] text-red-700'>{response.error.username[0]}</span>}

            <input className="p-2 rounded-xl border w-full outline-none" type="email" name="email" value={userInfo.email} onChange={handleForm} placeholder="email" />
            {response.error && response.error.email && <span className='text-[12px] text-red-700'>{response.error.email[0]}</span>}

            <div className="relative">
              <input className="p-2 rounded-xl border w-full outline-none" type={isPasswordVisible ? "text" : "password"} name="password" value={userInfo.password} onChange={handleForm} placeholder="Password" />
              <EyeIcon handleClick={togglePasswordVisibility} isPasswordVisible={isPasswordVisible} />
            </div>
            {response.error && response.error.password && <span className='text-[12px] text-red-700'>{response.error.password[0]}</span>}
              <select name="city" value={userInfo.city} onChange={handleForm} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 transition duration-300" required>
                <option selected>Select City</option>
                { Cities && Cities.map((city, i) => ( 
                  <option value={city} key={i}>{city}</option>
                ))}
              </select>
            <input className="p-2 rounded-xl border w-full outline-none" type="number" name="phone_num" value={userInfo.phone_num} onChange={handleForm} placeholder="phone number" />
            {response.error && response.error.phone_num && <span className='text-[12px] text-red-700'>{response.error.phone_num[0]}</span>}
            <button type={status === 'loading' ? 'button' : 'submit'} className="bg-violet-500 rounded-xl text-white py-2 hover:scale-105 duration-300 flex justify-center items-center">
              {status === 'loading' ? '....' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400 w-full" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400 w-full" />
          </div>
          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>I have an account!</p>
            <Link to='/login' className="py-2 px-5 bg-white hover:bg-violet-300 border rounded-xl duration-300">Login</Link>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl h-full w-full object-cover"
            src={'https://via.placeholder.com/600x800'}
            alt="PicRegist"
          />
        </div>
      </div>
    </section>
  );
}

export default Register;