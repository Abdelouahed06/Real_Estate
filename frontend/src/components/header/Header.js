
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import NavHeader from './NavHeader';
// import NavBar from './NavBar';
import Login from './Login';
import Profile from './Profile';
import SideBar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/UserReducer'

const Header = () => {

    const isLogin = JSON.parse(localStorage.getItem('token'));
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(user)
        if (isLogin) {
            dispatch(fetchUser(isLogin))
        }
    }, [isLogin])

    const [toggleMobileNav, setToggleMobileNav] = useState(false)

    const handleMobileNavToggle = () => {
        setToggleMobileNav(!toggleMobileNav)
    }


    return (
        <header className='relative md:py-2 py-4 shadow z-20'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <svg onClick={handleMobileNavToggle} className={`cursor-pointer ${isLogin ? 'md:hidden block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18"></path>
                    </svg>
                    <Link to='/'>
                        <h2 className='text-2xl font-bold'>HomeLand</h2>

                    </Link>
                </div>

                {isLogin ? <Profile /> : <Login />}


            </div>
            {toggleMobileNav && <SideBar isToggle={toggleMobileNav} toggle={setToggleMobileNav} />}
        </header>

    )
}

export default Header