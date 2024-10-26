import { useState } from "react"
import ContentNav from "../content/ContentNav"
import Password from "./Password"
import BackNav from "../content/BackNav"
import Profile from "./Profile"

const Setting = ({active}) => {

    const [isProfile, setIsProfile] = useState(active)
    const [isNav, setIsNav] = useState(false)


    return (
        <div className="flex justify-center w-full mb-6">
            <div className={`${isNav ? 'w-full' : 'w-[85%]'} bg-white`}>
            { !isNav &&  <BackNav page="Setting" setIsNav={setIsNav}/> }
                <div className={`${isNav ? 'block' : 'md:block hidden'}`}><ContentNav setIsNav={setIsNav} activeNav='setting'/></div>
                { !isNav && 
                    <div className="flex gap-12 w-full">
                        <div className="mb-6 w-full">

                            <div className="w-full">
                                <div onClick={() => setIsProfile(true)} className="flex items-center justify-between bg-gray-100 p-3 md:w-80 w-full cursor-pointer">
                                    <span className={isProfile ? 'text-blue-500' : 'text-gray-500'}>Modify Your Info</span>
                                    { isProfile ? (
                                            <svg class="av-icon" height="28" width="28" style={{fill: "#2196F3", stroke: 'rgb(46, 107, 255)', strokeWidth: '0px'}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42z"></path>
                                            </svg>
                                        ) : (
                                            <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                                <path fill="none" stroke={isProfile ? "#2196F3" : 'gray'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 12L31 24L19 36"></path>
                                            </svg>
                                        )
                                    }
                                    
                                    
        
                                </div>
                                { isProfile && 
                                    <div className="md:hidden block bg-gray-100 p-3">
                                        <Profile />
                                    </div>
                                }
                                
                            </div>
                            
                            <div>
                                <div onClick={() => setIsProfile(false)} className="flex items-center justify-between bg-gray-100 p-3 md:w-80 w-full mt-3 cursor-pointer">
                                    <span className={!isProfile ? 'text-blue-500' : 'text-gray-500'}>Modify Password</span>
                                    { !isProfile ? (
                                            <svg height="28" width="28" style={{fill: "#2196F3", stroke: 'rgb(46, 107, 255)', strokeWidth: '0px'}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42z"></path>
                                            </svg>
                                        ) : (
                                            <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                                <path fill="none" stroke={isProfile ? "#2196F3" : 'gray'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 12L31 24L19 36"></path>
                                            </svg>
                                        )
                                    }
                                </div>
                                { !isProfile && 
                                    <div className="md:hidden block bg-gray-100 p-3">
                                        <Password />
                                    </div>
                                }
                            </div>
                        </div>
                        { isProfile && <div className="md:block hidden w-full"><Profile /></div> }
                        { !isProfile && <div className="md:block hidden w-full"><Password /></div> }
                        
                    </div>
                    }
                
                
            </div>
        </div>
    )
}

export default Setting