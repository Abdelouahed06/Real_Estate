import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/UserReducer";

const Password = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const token = JSON.parse(localStorage.getItem('token'));
    const user = useSelector(i => i.user.user);
    const status = useSelector(i => i.user.status);
    const dispatch = useDispatch();
  //   const { loading, error, successMessage } = useSelector((state) => state.password);
  
    const handleSubmit = async (e) => {
        console.log('click')
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        // Handle password mismatch error
        return alert('passwords not identical');
      }
      const data = {
          currentPassword: currentPassword,
          newPassword: newPassword,
          token: token,
          userId: user.user_id
      }
      await dispatch(changePassword(data));
    };
    return (
        
        <form onSubmit={handleSubmit} className="relative p-6 pb-10 w-full">
            <div>
                <label className="block mb-2" htmlFor="current-password"><span className="text-red-500 mr-1">*</span>Current Password</label>
                <input value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)} className="block border border-solid border-gray-300 rounded-lg text-base p-2.5 w-full" id="current-password" type="password" placeholder="Current Password"/>
            </div>
            <div className="mt-4">
                <label className="block mb-2" htmlFor="new-password"><span className="text-red-500 mr-1">*</span>New Password</label>
                <input value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}  className="block border border-solid border-gray-300 rounded-lg text-base p-2.5 w-full" id="new-password" type="password" placeholder="New Password"/>
            </div>
            <div className="mt-4 mb-8">
                <label className="block mb-2" htmlFor="confirm-password"><span className="text-red-500 mr-1">*</span>Confirm Password</label>
                <input value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} className="block border border-solid border-gray-300 rounded-lg text-base p-2.5 w-full" id="confirm-password" type="password" placeholder="Confirm Password"/>
            </div>
            <button type={status === 'loading' ? 'button' : 'submit'} className="absolute right-0 mr-6 bg-blue-500 text-white w-40 rounded-lg p-2 disabled">{status === 'loading' ? '....' :'Update Password'}</button>
        </form>
    )

}

export default Password