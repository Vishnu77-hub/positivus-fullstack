import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../../App';
import { toast } from 'react-toastify';

const HeadingPricingTable = ({ token }) => {
    const [headingData, setHeadingData] = useState([]);
    const [sortOrder, setSortOrder] = useState('newest');
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);


    const [isEditingHeading, setIsEditingHeading] = useState(false);
    const [editingHeadingItem, setEditingHeadingItem] = useState(null);
    const [newBannerFile, setNewBannerFile] = useState(null);


// fetch data from backend -------------------------------------------------------
    const fetchListHeadingPricing = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/pricing/listHeadingPricingTable`);
            if (data.success) setHeadingData(data.headingPricing);
            else toast.error(data.message);
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    };

// Enable/Disable -------------------------------------------------------------------------------
    const toggleEnable = async (id, enableStatus) => {
        try {
            const { data } = await axios.put(
                `${backendUrl}/api/pricing/toggleHeadingPricingEnable`,
                { id, isEnabledHeadingPricing: enableStatus },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message || "Status updated");
                fetchListHeadingPricing(); // Refresh list
            } else {
                toast.error(data.message || "Failed to update status");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Server error while toggling");
        }
    };


  // remove data ---------------------------------------------------------------------------------------------------
    const removeHeadingPricing = async (id) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/pricing/removeHeadingPricing`,
                { id },
                { headers: { token } }
            );
            if (data.success) {
                toast.success(data.message);
                fetchListHeadingPricing();
            } else toast.error(data.message);
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    };


  // Data submit -----------------------------------------------------------------------------------------
    const submitUpdateHeading = async () => {
        try {
            const form = new FormData();
            form.append('headingPricingId', editingHeadingItem._id);
            form.append('pricingDescription', editingHeadingItem.pricingDescription);
            if (newBannerFile) {
                form.append('pricingBanner', newBannerFile);
            }

            const { data } = await axios.put(
                `${backendUrl}/api/pricing/editHeadingPricing`,
                form,
                {
                    headers: {
                        token,
                    },
                }
            );
            if (data.success) {
                toast.success('Updated successfully!');
                setIsEditingHeading(false);
                setNewBannerFile(null);
                fetchListHeadingPricing();
            } else {
                toast.error(data.message || 'Update failed.');
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Error updating item.');
        }
    };


  // Edit -----------------------------------------------------------------------
    const handleEditHeading = (item) => {
        setEditingHeadingItem({ ...item });
        setIsEditingHeading(true);
    };

// List Data ----------------------------------------------------------------------------------
    const sortedList = Array.isArray(headingData)
    ? [...headingData].sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date);
        const dateB = new Date(b.createdAt || b.date);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    })
    : [];
    
// filter list -----------------------------------------------------------------------------
    const filteredList = sortedList.filter(item =>
        item.pricingDescription?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    

useEffect(() => {
    fetchListHeadingPricing();
}, []);



    return (
        <>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Banner & Description</h2>
                <input
                    type="text"
                    placeholder="Search by Pricing Description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded mb-4 w-full md:w-1/3"
                    />
                <div className="mb-4 flex items-center gap-2">
                    <label htmlFor="sortOrder">Sort by:</label>
                    <select
                        id="sortOrder"
                        className="border px-2 py-1 rounded"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        >
                        <option value="newest">Newly Added First</option>
                        <option value="oldest">Older First</option>
                    </select>
                </div>


                {isEditingHeading && editingHeadingItem && (
                    <div className="mb-6 p-4 border rounded bg-gray-100">
                        <h3 className="text-xl font-semibold mb-3">Edit Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <textarea
                                className="border p-2 rounded col-span-full"
                                placeholder="Description"
                                value={editingHeadingItem.pricingDescription}
                                onChange={e => setEditingHeadingItem({ ...editingHeadingItem, pricingDescription: e.target.value })}
                            />
                            <div className="col-span-full">
                                <label className="block mb-1">Banner Image (optional):</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setNewBannerFile(e.target.files[0])}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-4">
                            <button
                                className="bg-green-600 text-white px-4 py-3 rounded"
                                onClick={submitUpdateHeading}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-3 rounded"
                                onClick={() => {
                                    setIsEditingHeading(false);
                                    setNewBannerFile(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                <div className="container mx-auto p-4">
                    {selectedItems.length > 0 && (
                        <div className="flex gap-3 mb-4">
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() => {
                                    selectedItems.forEach(id => removeHeadingPricing(id));
                                    setSelectedItems([]);
                                    setSelectAll(false);
                                }}
                            >
                                Delete Selected
                            </button>
                            <button
                                className="bg-green-600 text-white px-3 py-1 rounded"
                                onClick={() => {
                                    selectedItems.forEach(id => toggleEnable(id, true));
                                    setSelectedItems([]);
                                    setSelectAll(false);
                                }}
                            >
                                Enable Selected
                            </button>
                            <button
                                className="bg-gray-600 text-white px-3 py-1 rounded"
                                onClick={() => {
                                    selectedItems.forEach(id => toggleEnable(id, false));
                                    setSelectedItems([]);
                                    setSelectAll(false);
                                }}
                            >
                                Disable Selected
                            </button>
                        </div>
                    )}

                    {/* Table Wrapper with horizontal scroll for small screens */}

                    <div className="overflow-x-auto">
                        <div className="overflow-x-auto min-w-[900px] border border-gray-300">

                            {/* Table Header Row */}

                            <div className="grid grid-cols-10 bg-gray-100 text-center font-semibold border-b border-gray-300">
                                <div className="col-span-1 border-r border-gray-300 p-2 flex justify-center items-center">
                                    <input
                                        className='size-4 justify-center items-center text-center'
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={(e) => {
                                            setSelectAll(e.target.checked);
                                            setSelectedItems(e.target.checked ? filteredList.map(item => item._id) : []);
                                        }}
                                    /> <span className='ps-2'>Manage</span>
                                </div>
                                <div className="col-span-1 border-r border-gray-300 p-2">Banner</div>
                                <div className="col-span-6 border-r border-gray-300 p-2">Pricing Description</div>
                                <div className="col-span-1 border-r border-gray-300 p-2">Edit/Delete</div>
                                <div className="col-span-1 p-2">Action</div>
                            </div>

                            {/* Table Rows */}
                            {filteredList.map(item => (
                                <div
                                    key={item._id}
                                    className="grid grid-cols-10 text-sm text-center border-b border-gray-300"
                                >
                                    <div className='col-span-1 border-r border-gray-300 p-2 flex justify-center items-center'>
                                        <input
                                            className='size-4 justify-center items-center text-center'
                                            type="checkbox"
                                            checked={selectedItems.includes(item._id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedItems([...selectedItems, item._id]);
                                                } else {
                                                    setSelectedItems(selectedItems.filter(id => id !== item._id));
                                                    setSelectAll(false);
                                                }
                                            }}
                                        />

                                    </div>

                                    {/* Banner */}
                                    <div className="col-span-1 border-r border-gray-300 p-2 flex justify-center items-center">
                                        <img
                                            src={item.pricingBanner}
                                            alt="Banner"
                                            className="w-20 h-16 object-contain rounded border"
                                        />
                                    </div>

                                    {/* Plan Description */}
                                    <div className="col-span-6 border-r border-gray-300 p-2 text-center">
                                        {/* <p className="font-semibold">{item.planName}</p> */}
                                        <p className="text-start">{item.pricingDescription}</p>
                                    </div>

                                    {/* Edit/Delete */}
                                    <div className="flex col-span-1 p-2 justify-center border-r border-gray-300 items-center space-x-2 text-center">
                                        <div className='grid grid-cols-1'>

                                            <button
                                                onClick={() => handleEditHeading(item)}
                                                className="mb-2 border-2 rounded-full px-4 py-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white col-span-1"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => removeHeadingPricing(item._id)}
                                                className="mb-2 border-2 rounded-full px-4 py-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white col-span-1"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex col-span-1 p-2 justify-center items-center space-x-2 text-center">
                                        <div className='grid grid-cols-1 '>
                                            <button
                                                className={`mb-2 border-2 col-span-1 rounded-full px-4 py-1 ${item.isEnabledHeadingPricing
                                                    ? 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                                                    : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                                                    }`}
                                                onClick={() => toggleEnable(item._id, !item.isEnabledHeadingPricing)}
                                            >
                                                {item.isEnabledHeadingPricing ? 'Disable' : 'Enable'}
                                            </button>
                                            <span className={`mb-2 col-span-1 rounded-lg px-4 py-1 ${item.isEnabledHeadingPricing ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                {item.isEnabledHeadingPricing ? 'Enabled' : 'Disabled'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeadingPricingTable;
