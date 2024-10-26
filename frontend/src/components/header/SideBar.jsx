import { useState } from "react"
import BtnAddAnnounce from "../announce/BtnAddAnnounce"
import NavList from "./NavList"
import { useSelector } from "react-redux";


const SideBar = ({toggle, isToggle}) => {
    const user = useSelector(i => i.user.user);

    const [showSideBar, SetShowSideBar] = useState(true)

    return (
        <div className={`${showSideBar ? 'md:hidden block' : 'hidden'} md:hidden block absolute top-0 left-0 h-screen bg-white shadow-lg z-1 w-80`}>
            <button className="p-2" type="button">
                <svg onClick={() => toggle(!isToggle)} height="32" width="32" style={{ fill: 'rgb(102, 102, 102)', stroke: 'rgb(102, 102, 102)', strokeWidth: '0px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                    </path> 
                </svg>
            </button>
            <div className="flex flex-col justify-center">
                <div className='flex items-center gap-1 px-3 mt-4'>
                    <svg height="40" width="40" style={{ fill: 'rgb(208, 208, 208)', stroke: 'rgb(208, 208, 208)', strokeWidth: '0px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z">
                        </path>    
                    </svg>
                    <span className='mr-1'>{user.username}</span>
                </div>
                <NavList  SetShowSideBar={SetShowSideBar}/>
                <div className="flex justify-center m-4">
                    <BtnAddAnnounce isToggle={isToggle} toggle={toggle}/>
                </div>
            </div>
        </div>
    )
}


export default SideBar