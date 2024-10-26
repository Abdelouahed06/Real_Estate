import { useState } from "react"
import NavList from "./NavList"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Profile = () => {

    const user = useSelector(i => i.user.user);

    const [toggleProfileNav, setToggleProfileNav] = useState(false)

    const handleProfileNavToggle = () => {
        setToggleProfileNav(!toggleProfileNav)
    }

    const [showSideBar, SetShowSideBar] = useState(true)


    // const [toggleMobileNav, setToggleMobileNav] = useState(false)


    return (
        <div className='md:flex hidden items-center gap-8'>
            {/* profile */}
            <div  onClick={handleProfileNavToggle} className='relative flex items-center gap-1 border border-solid border-gray-300 rounded-24 p-2 cursor-pointer'>
                <svg class="av-icon" height="32" width="32" style={{ fill: 'rgb(208, 208, 208)', stroke: 'rgb(208, 208, 208)', strokeWidth: '0px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z">
                    </path>    
                </svg>
                <span className='mr-1'>{user.username}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="0.8em" height="0.8em" viewBox="0 0 14 14">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M.5 3.85L6.65 10a.48.48 0 0 0 .7 0l6.15-6.15"></path>
                </svg>
                { toggleProfileNav && <NavList SetShowSideBar={SetShowSideBar}/>}

            </div>

            

            {/* add announce */}
            <Link to='/add-announce'>
                <div className='flex items-center gap-2 bg-red-500 rounded-lg p-2 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                        <path fill="white" d="M8 19.385V9.61q0-.673.475-1.141Q8.95 8 9.621 8h9.764q.666 0 1.14.475q.475.474.475 1.14v6.29q0 .332-.13.633q-.132.3-.349.518l-3.465 3.465q-.218.217-.518.348q-.3.131-.632.131h-6.29q-.667 0-1.141-.475Q8 20.051 8 19.385ZM3.025 6.596q-.13-.671.257-1.213q.387-.541 1.06-.664l9.62-1.694q.67-.13 1.212.257q.542.387.664 1.06l.212 1.273h-1.012l-.213-1.192q-.038-.211-.23-.336q-.193-.125-.424-.087L4.52 5.713q-.269.039-.404.25q-.134.212-.096.481l1.596 9.016v1.936q-.342-.167-.581-.475q-.24-.308-.315-.706L3.025 6.596ZM9 9.616v9.769q0 .269.173.442t.442.173H16l4-4V9.615q0-.269-.173-.442T19.385 9h-9.77q-.269 0-.442.173T9 9.615Zm5.5 4.884Zm-.5.5v2.5q0 .213.144.356q.144.144.357.144t.356-.144Q15 17.713 15 17.5V15h2.5q.213 0 .356-.144q.144-.144.144-.357t-.144-.356Q17.713 14 17.5 14H15v-2.5q0-.213-.144-.356Q14.712 11 14.5 11t-.356.144Q14 11.288 14 11.5V14h-2.5q-.213 0-.356.144q-.144.144-.144.357t.144.356q.144.143.356.143H14Z"></path>
                    </svg>
                    <p className='text-white'>Add New Announce</p>
                </div>
            </Link>

            

        </div>
    )
}

export default Profile