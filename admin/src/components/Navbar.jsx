import React from 'react'
// import {assets} from "./../assets"
const Navbar = ({setToken}) => {
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };
  return (
    <div className='sticky top-0 z-50 bg-blue-50'>
      <div className='flex items-center py-2 px-[4%] justify-between'>
        <div className='w-[max(10%,80px)]'>
        <img className="img-fluid" src="/assets/logo.svg" alt="logo.svg" />
        <p className='text-sm'>Admin Panel</p>
        </div>
       

      <button onClick={()=>handleLogout()} className='bg-gray-600 text-white px-5 py-2 sm:py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
</div>
<hr className='hidden lg:block'/>
</div>
  )
}

export default Navbar
