import { Link } from "react-router-dom"



const BackNav = ({page, setIsNav}) => {



    return (
        // <Link to='/contentNav'>
            <div onClick={() => setIsNav(true)} className="w-full md:hidden flex items-center gap-4 border-b border-solid border-gray-300 p-4 mb-6 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="gray" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"></path>
                </svg>
                <span className="text-gray-600 text-lg">{page}</span>
            </div>
        // </Link>
        
    )
}

export default BackNav