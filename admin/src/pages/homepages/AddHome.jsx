import React, { useState } from 'react';
import axios from 'axios';
import {backendUrl} from '.././../App'
import { toast } from 'react-toastify';

const AddHome = ({token}) => {

    const [homeDescription, setHomeDescription] = useState('');
    const [homeTitle, sethomeTitle] = useState('');
    const [homeButton, sethomeButton] = useState('');
    const [homeBanner, setHomeBanner] = useState(null);
  
  
    const onSubmitHandler = async (e) =>{
      e.preventDefault();
      try {
        const formData = new FormData();
        homeBanner && formData.append('homeBanner', homeBanner);
      formData.append('homeDescription', homeDescription);
      formData.append('homeTitle', homeDescription);
      formData.append('homeButton', homeDescription);
        
      const response = await axios.post(
        backendUrl + "/api/home/addHome",
        formData,
        {headers: {token}}
      );
      // 'Content-Type': 'multipart/form-data', // ✅ Important!
      
  
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message)
        setHomeDescription('')
        setHomeBanner(null)
      } else{
        toast.error(response.data.message)
      }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }
  
  
    return (
     <form onSubmit={onSubmitHandler} className=' flex flex-col gap-6 max-w-1lg'>
  <h1 className='text-xl font-bold text-center lg:text-start'>Add Home Section</h1>
  <div className='flex flex-col gap-6 mx-8 '>
     {/* Upload Banner */}
     <div className='w-50'>
          <p className='mb-2'>Upload Home Banner</p>
          <label htmlFor="homeBanner" className="cursor-pointer">
            <img
              className="w-50"
              src={!homeBanner ? "/assets/uploadBanner.png" : URL.createObjectURL(homeBanner) }
              alt="Upload Banner"
            />
          </label>
          <input onChange={(e)=>setHomeBanner(e.target.files[0])} type="file" id="homeBanner" hidden />
        </div>
  {/* Title */}
         <div className=''>
          <p className='mb-2'>Home Title</p>
          <textarea
            value={homeTitle}
            onChange={(e) => sethomeTitle(e.target.value)}
            className='w-lg px-3 py-2 border border-gray-400 rounded'
            placeholder='Type here...'
          />
        </div>
         {/* Description */}

         <div className=''>
          <p className='mb-2'>Home Description</p>
          <textarea
            value={homeDescription}
            onChange={(e) => setHomeDescription(e.target.value)}
            className='w-lg px-3 py-2 border border-gray-400 rounded'
            placeholder='Type here...'
          />
        </div>
        {/* Button */}
         <div className=''>
          <p>Home Button</p>
          <input
            value={homeButton}
            onChange={(e) => sethomeButton(e.target.value)}
            className='w-lg px-3 py-2 border border-gray-400 rounded'
            placeholder='Type Title'
          />
        </div>
  
        <button type="submit" className='bg-blue-600 text-white px-6 py-2 rounded cursor-pointer max-w-lg'>
          Submit
        </button>
  
  </div>
     </form>
    )
  }

export default AddHome
