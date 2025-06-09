import React, { useState } from 'react';
import axios from 'axios';
import {backendUrl} from '.././../App'
import { toast } from 'react-toastify';

const PricingHeading = ({token}) => {

  const [pricingDescription, setPricingDescription] = useState('');
  const [pricingBanner, setPricingBanner] = useState(null);


  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const formData = new FormData();
      pricingBanner && formData.append('pricingBanner', pricingBanner);
    formData.append('pricingDescription', pricingDescription);
      
    const response = await axios.post(
      backendUrl + "/api/pricing/addHeadingPricing",
      formData,
      {headers: {token}}
    );
    // 'Content-Type': 'multipart/form-data', // ✅ Important!
    

    console.log(response.data);
    if (response.data.success) {
      toast.success(response.data.message)
      // setPlanName('')
      // setPrice('')
      // setFeatures([])
      // setFeatureInput('')
      setPricingDescription('')
      setPricingBanner(null)
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
<h1 className='text-xl font-bold text-center lg:text-start'>Add Banner and Description for Pricing Section</h1>
<div className='flex flex-col gap-6 mx-8 '>
   {/* Upload Banner */}
   <div className='w-50'>
        <p className='mb-2'>Upload Pricing Banner</p>
        <label htmlFor="pricingBanner" className="cursor-pointer">
          <img
            className="w-50"
            src={!pricingBanner ? "/assets/uploadBanner.png" : URL.createObjectURL(pricingBanner) }
            alt="Upload Banner"
          />
        </label>
        <input onChange={(e)=>setPricingBanner(e.target.files[0])} type="file" id="pricingBanner" hidden />
      </div>

       {/* Description */}
       <div className=''>
        <p className='mb-2'>Pricing Description</p>
        <textarea
          value={pricingDescription}
          onChange={(e) => setPricingDescription(e.target.value)}
          className='w-lg px-3 py-2 border border-gray-400 rounded'
          placeholder='Type here...'
        />
      </div>

      <button type="submit" className='bg-blue-600 text-white px-6 py-2 rounded cursor-pointer max-w-lg'>
        Submit
      </button>

</div>
   </form>
  )
}

export default PricingHeading
