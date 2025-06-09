
import React, { useState } from 'react';
import axios from 'axios';
import {backendUrl} from '.././../App'
import { toast } from 'react-toastify';

const AddPricing = ({token}) => {
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState('');
  // const [pricingDescription, setPricingDescription] = useState('');
  // const [pricingBanner, setPricingBanner] = useState(null);
  const [price, setPrice] = useState('');
  const [planName, setPlanName] = useState('');
  const [planPeriod, setPlanPeriod] = useState('');


  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const formData = new FormData();
      // pricingBanner && formData.append('pricingBanner', pricingBanner);
    // formData.append('pricingDescription', pricingDescription);
    formData.append('planDetails', JSON.stringify(features));
    formData.append('price', price);
    formData.append('currency', '$');
    formData.append('planName', planName);
    formData.append('planPeriod', planPeriod);
      
    const response = await axios.post(backendUrl + "/api/pricing/addPricing",formData,{
      headers:{token,
        'Content-Type': 'multipart/form-data', // ✅ Important!
      }})

    console.log(response.data);
    if (response.data.success) {
      toast.success(response.data.message)
      setPlanName('')
      setPlanPeriod('')
      setPrice('')
      // setPricingDescription('')
      // setPricingBanner(null)
      setFeatures([])
      setFeatureInput('')
    } else{
      toast.error(response.data.message)
    }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  const handleAddFeature = (e) => {
    if (featureInput.trim() !== '') {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    const updated = [...features];
    updated.splice(index, 1);
    setFeatures(updated);
  };


  return (
    
    <form onSubmit={onSubmitHandler} className=' flex flex-col gap-6 w-full'>
      <h1 className='text-xl font-bold text-center lg:text-start'>Add Pricing Plan</h1>
<div className='flex flex-col gap-6 mx-8 '>

      {/* Feature List */}
      <div>
        <p className='mb-2'>Plan Details</p>
        <div className='flex gap-2'>
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            className='border px-3 py-2 rounded w-full lg:w-2xl'
            placeholder='Enter a feature...'
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className='bg-green-600 text-white px-4 py-2 rounded'
          >
            Add
          </button>
        </div>

        <ul className='mt-4 space-y-2'>
          {features.map((item, index) => (
            <li key={index} className='flex justify-between items-center bg-gray-100 p-2 rounded'>
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className='text-red-500 font-bold'
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className='w-full'>
        <p className='mb-2'>Plan Price</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='w-full px-3 py-2 border border-gray-400 rounded'
          placeholder='Enter price (e.g. 500)'
        />
      </div>
      {/* Plan name */}
      <div className='w-full'>
        <p className='mb-2'>Name of the Plan</p>
        <input
          type="text"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className='w-full px-3 py-2 border border-gray-400 rounded'
          placeholder='Enter Plan Name (e.g. Basic, Epic)'
        />
      </div>
      {/* Plan Period */}
      <div className='w-full'>
        <p className='mb-2'>Name of the Plan</p>
        <input
          type="text"
          value={planPeriod}
          onChange={(e) => setPlanPeriod(e.target.value)}
          className='w-full px-3 py-2 border border-gray-400 rounded'
          placeholder='Enter Plan Name (e.g. Basic, Epic)'
        />
      </div>

      <button type="submit" className='bg-blue-600 text-white px-6 py-2 rounded cursor-pointer'>
        Submit
      </button>
      </div>

    </form>
  );
};

export default AddPricing;
