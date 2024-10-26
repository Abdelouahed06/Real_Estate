import { Link } from "react-router-dom"


const Login = () => {

    return (
        <div className='flex items-center gap-6'>
          <Link to='/login' className='hover:text-violet-900 transition'>
            Log in
          </Link>
          <Link to='/register' className='bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition'>
            Sign up
          </Link>
        </div>
    )
}

export default Login