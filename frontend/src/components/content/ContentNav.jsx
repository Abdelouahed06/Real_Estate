import { useState } from "react"
import { Link } from "react-router-dom"




const ContentNav = ({activeNav, setIsNav}) => {

    const [selectedNav, setSelectedNav] = useState(activeNav !== undefined ? activeNav : '')
    const handleClick = (page) => {
        setSelectedNav('announces')
        setIsNav(false)
    }

    return (
        <ul className="flex md:flex-row flex-col md:mx-0 mx-4 bg-white mb-4">
            <Link to='/my-announces'>
                <li onClick={() => handleClick('announces')} className={`flex items-center justify-between border-b border-solid px-4 py-4 hover:bg-gray-200 cursor-pointer  ${selectedNav === "announces" ? "border-b-2 border-blue-600" : "border-b border-gray-300"}`}>
                    <div className="flex items-center gap-2">
                    <svg height="19" width="19" style={{ fill: selectedNav === "announces"? 'blue' : 'rgb(74, 74, 74)', stroke: 'rgb(74, 74, 74)', strokeWidth: '0px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M14.4 20.999H4.9a1.837 1.837 0 01-1.899-1.9V9.6a1.837 1.837 0 011.9-1.9h3.8V3.9a1.837 1.837 0 011.9-1.899h9.498a1.837 1.837 0 011.9 1.9V13.4a1.838 1.838 0 01-1.9 1.9h-3.8v3.8a1.838 1.838 0 01-1.9 1.899zM4.9 9.6v9.5h9.5v-3.8h-3.8a1.838 1.838 0 01-1.9-1.9V9.6H4.9zm5.7-5.7v9.5h9.5V3.9h-9.5z">
                        </path>
                    </svg>
                        <span className={selectedNav === "announces" ? "text-blue-600" : "text-gray-600"}>My Announces</span>  
                    </div>
                    <svg className="md:hidden block" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                        <path fill="none" stroke={selectedNav === "announces" ? 'blue' : 'rgb(74, 74, 74)'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 12L31 24L19 36"></path>
                    </svg>
                </li>
            </Link>

            <Link to='/my-favourites'>
                <li onClick={() => handleClick('favourites')} className={`flex items-center justify-between border-solid px-4 py-4 hover:bg-gray-200 cursor-pointer ${selectedNav === "favourites" ? "border-b-2 border-blue-600" : "border-b border-gray-300"}`}>
                    <div className="flex items-center gap-2">
                            <svg height="19" width="19" style= {{ fill: selectedNav === "favourites"? 'blue' : 'rgb(74, 74, 74)', stroke: 'rgb(74, 74, 74)', strokeWidth: '0px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                <path 
                                    fill-rule="evenodd" d="M2.405 12.33c-1.231-3.824.407-7.833 4.078-9.015a6.562 6.562 0 015.25.541l.263.158.268-.159a6.571 6.571 0 014.982-.619l.266.08c3.673 1.182 5.317 5.192 4.082 9.03a12.42 12.42 0 01-2.977 4.736 34.695 34.695 0 01-5.995 4.665l-.23.143a.732.732 0 01-.762.006l-.245-.147a34.717 34.717 0 01-6.005-4.673 12.427 12.427 0 01-2.975-4.747zm9.194-6.363l-.185-.132a4.784 4.784 0 00-4.162-.606c-2.664.856-3.872 3.808-2.94 6.696a10.232 10.232 0 002.448 3.899A31.118 31.118 0 0012.135 20L12 19.916l.438-.275a31.11 31.11 0 004.304-3.342l.495-.47a10.226 10.226 0 002.45-3.889c.934-2.9-.279-5.854-2.944-6.71a4.793 4.793 0 00-4.336.728.686.686 0 01-.81.009z" clip-rule="evenodd">
                                </path>
                            </svg>
                            <span className={selectedNav === "favourites" ? "text-blue-600" : "text-gray-600"}>My favourites</span>  
                        </div>
                        <svg className="md:hidden block" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                            <path fill="none" stroke={selectedNav === "favourites" ? 'blue' : 'rgb(74, 74, 74)'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 12L31 24L19 36"></path>
                        </svg>
                </li>
            </Link>

            <Link to='/setting/profile'>
                <li onClick={() => handleClick('setting')} className={`flex items-center justify-between border-b border-solid px-4 py-4 hover:bg-gray-200 cursor-pointer ${selectedNav === "setting" ? "border-b-2 border-blue-600" : "border-b border-gray-300"}`}>
                        <div className="flex items-center gap-2">
                            <svg height="19" width="19" style={{ fill: selectedNav === "setting"? 'blue' : 'rgb(74, 74, 74)', stroke: 'rgb(74, 74, 74)', strokeWidth: '0px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    fill="none" d="M0 0h24v24H0z"></path><path d="M3.34 17a10.018 10.018 0 01-.978-2.326 3 3 0 00.002-5.347A9.99 9.99 0 014.865 4.99a3 3 0 004.631-2.674 9.99 9.99 0 015.007.002 3 3 0 004.632 2.672A9.99 9.99 0 0120.66 7c.433.749.757 1.53.978 2.326a3 3 0 00-.002 5.347 9.99 9.99 0 01-2.501 4.337 3 3 0 00-4.631 2.674 9.99 9.99 0 01-5.007-.002 3 3 0 00-4.632-2.672A10.018 10.018 0 013.34 17zm5.66.196a4.993 4.993 0 012.25 2.77c.499.047 1 .048 1.499.001A4.993 4.993 0 0115 17.197a4.993 4.993 0 013.525-.565c.29-.408.54-.843.748-1.298A4.993 4.993 0 0118 12c0-1.26.47-2.437 1.273-3.334a8.126 8.126 0 00-.75-1.298A4.993 4.993 0 0115 6.804a4.993 4.993 0 01-2.25-2.77c-.499-.047-1-.048-1.499-.001A4.993 4.993 0 019 6.803a4.993 4.993 0 01-3.525.565 7.99 7.99 0 00-.748 1.298A4.993 4.993 0 016 12a4.99 4.99 0 01-1.273 3.334 8.126 8.126 0 00.75 1.298A4.993 4.993 0 019 17.196zM12 15a3 3 0 110-6 3 3 0 010 6zm0-2a1 1 0 100-2 1 1 0 000 2z">
                                </path>
                            </svg>
                            <span className={selectedNav === "setting" ? "text-blue-600" : "text-gray-600"}>Setting</span>  
                        </div>
                        <svg className="md:hidden block" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                            <path fill="none" stroke={selectedNav === "setting" ? 'blue' : 'rgb(74, 74, 74)'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 12L31 24L19 36"></path>
                        </svg>
                </li>
            </Link>

            
        </ul>
    )
}

export default ContentNav