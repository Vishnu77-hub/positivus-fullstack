import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const SubscriptionTable = ({ token }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filter, setFilter] = useState('All');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);



  const now = new Date();
  // const isExpired = sub.status === "Accepted" && new Date(sub.expiryDate) < now;

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/subscription/admin/list`);
      if (res.data.success) {
        setSubscriptions(res.data.subscriptions);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch subscriptions");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/subscription/admin/update-status`, {
        subscriptionId: id,
        newStatus: status
      });

      if (res.data.success) {
        toast.success(`Marked as ${status}`);
        fetchSubscriptions();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/subscription/admin/subscription/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // if authentication is required
        },
      });
  
      console.log('Subscription deleted:', response.data);
      fetchSubscriptions(); // Refetch to reflect the change
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };
  
  





  const exportSinglePDF = (sub) => {
    const doc = new jsPDF();
    doc.text(`Subscription Details for ${sub.name}`, 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Name', sub.name],
        ['Email', sub.email],
        ['Phone', sub.phone],
        ['Plan', sub.planName],
        ['Price', `$${sub.price}`],
        ['Period', sub.planPeriod],
        ['Status', sub.status],
      ],
    });
    doc.save(`${sub.name}-subscription.pdf`);
  };

  const exportAllPDF = () => {
    const doc = new jsPDF();
    doc.text("All User Subscriptions", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Name', 'Email', 'Phone', 'Plan', 'Price', 'Period', 'Status']],
      body: subscriptions.map(sub => [
        sub.name,
        sub.email,
        sub.phone,
        sub.planName,
        `$${sub.price}`,
        sub.planPeriod,
        sub.status
      ]),
    });

    doc.save("All-Subscriptions.pdf");
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const target = `${sub.email} ${sub.phone}`.toLowerCase();
    return filter === 'All'
      ? target.includes(searchTerm.toLowerCase())
      : sub.status === filter && target.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Subscriptions</h2>
      {/* <div className="grid grid-cols-8 gap-3 mb-4"> */}
      <input
        type="text"
        className="p-2 border rounded mb-4 w-full md:w-1/3"
        placeholder="Search by Email or Phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="sortOrder">Sort by:</label>
        <select
          className="border p-2 rounded col-span-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <button onClick={exportAllPDF} className="col-span-1 bg-blue-600 hover:bg-blue-700 text-white px-1 py-1 rounded mb-2">
        Export All to PDF
      </button>

      {selectedItems.length > 0 && (
        <div className="mb-4 flex gap-3">
          <button
            onClick={() => selectedItems.forEach(id => handleDelete(id))}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Delete Selected
          </button>
          <button
            onClick={() => selectedItems.forEach(id => handleStatusChange(id, 'Accepted'))}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Accept Selected
          </button>
          <button
            onClick={() => selectedItems.forEach(id => handleStatusChange(id, 'Rejected'))}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
          >
            Reject Selected
          </button>
        </div>
      )}


      {/* </div> */}

      <div className="overflow-x-auto">
        <table className="overflow-x-auto min-w-[1200px] text-sm border border-gray-300">
          <thead className="bg-gray-100 text-gray-700 text-left overflow-x-auto">
            <tr className='text-center'>
              <th className="p-3 border-r border-gray-300">
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectAll}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectAll(checked);
                      const ids = checked ? filteredSubscriptions.map(sub => sub._id) : [];
                      setSelectedItems(ids);
                    }}
                  />
                  <span className="pl-2"></span>
                </div>
              </th>

              <th className="p-3 border-r border-gray-300">Name</th>
              <th className="p-3 border-r border-gray-300">Email</th>
              <th className="p-3 border-r border-gray-300">Phone</th>
              <th className="p-3 border-r border-gray-300">Plan</th>
              <th className="p-3 border-r border-gray-300">Price</th>
              <th className="p-3 border-r border-gray-300">Period</th>
              <th className="p-3 border-r border-gray-300">Status</th>
              <th className="p-3 border-r border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredSubscriptions.map((sub) => (
                <motion.tr
                  key={sub._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3 border-r border-gray-300 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedItems.includes(sub._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(prev => [...prev, sub._id]);
                        } else {
                          setSelectedItems(prev => prev.filter(id => id !== sub._id));
                          setSelectAll(false); // Uncheck "Select All"
                        }
                      }}
                    />
                  </td>

                  <td className="p-3 border-r border-gray-300">{sub.name}</td>
                  <td className="p-3 border-r border-gray-300">{sub.email}</td>
                  <td className="p-3 border-r border-gray-300">{sub.phone}</td>
                  <td className="p-3 border-r border-gray-300">{sub.planName}</td>
                  <td className="p-3 border-r border-gray-300">${sub.price}</td>
                  <td className="p-3 border-r border-gray-300">{sub.planPeriod}</td>
                  <td className="p-3 border-r border-gray-300">
                    {(() => {
                      const expired = sub.status === "Accepted" && new Date(sub.expiryDate) < now;
                      const badgeClass = expired
                        ? 'bg-gray-300 text-gray-700'
                        : sub.status === 'Accepted'
                          ? 'bg-green-100 text-green-700'
                          : sub.status === 'Rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700';

                      return (
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${badgeClass}`}>
                          {expired ? 'Expired' : sub.status}
                        </span>
                      );
                    })()}
                  </td>

                  <td className="p-3 space-x-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange(sub._id, 'Accepted')}
                      disabled={sub.status === 'Accepted'}
                      className="col-span-1 bg-green-500 hover:bg-green-600 text-white px-3 w-full py-1 rounded disabled:opacity-50"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(sub._id, 'Rejected')}
                      disabled={sub.status === 'Rejected'}
                      className="col-span-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 w-full rounded disabled:opacity-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="col-span-1 bg-gray-700 hover:bg-gray-800 text-white px-3 w-full py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => exportSinglePDF(sub)}
                      className="col-span-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 w-full py-1 rounded"
                    >
                      Export PDF
                    </button>

                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SubscriptionTable;
