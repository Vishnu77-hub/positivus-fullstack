import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ListUser = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedActive, setSelectedActive] = useState([]);
  const [selectedInactive, setSelectedInactive] = useState([]);
  const [selectAllActive, setSelectAllActive] = useState(false);
  const [selectAllInactive, setSelectAllInactive] = useState(false);

  const navigate = useNavigate();

  const classifyUsers = (users) => {
    const now = new Date().getTime();
    const active = [];
    const inactive = [];

    users.forEach(user => {
      const logoutTime = user.lastLogout ? new Date(user.lastLogout).getTime() : null;
      if (!logoutTime || (now - logoutTime <= 24000)) {
        active.push(user);
      } else {
        inactive.push(user);
      }
    });

    // Sort
    const sortFn = (a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    };

    setActiveUsers(active.sort(sortFn));
    setInactiveUsers(inactive.sort(sortFn));
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/auth");

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setUsers(res.data.users);
        classifyUsers(res.data.users);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/auth");
      }
      toast.error("Error fetching users");
    }
  };

  const handleBulkDelete = async (type) => {
    const idsToDelete = type === 'active' ? selectedActive : selectedInactive;
  
    if (!idsToDelete.length) return toast.warn("No users selected to delete.");
  
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/admin/user`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { ids: idsToDelete }, // Passing ids as body for bulk delete
      });
  
      if (res.data.success) {
        toast.success("Users deleted successfully");
        fetchUsers(); // Refetch user data after deletion
        setSelectedActive([]);
        setSelectedInactive([]);
        setSelectAllActive(false);
        setSelectAllInactive(false);
      }
    } catch (error) {
      toast.error("Failed to delete users");
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, [sortOrder]);

  const filteredActiveUsers = activeUsers.filter(user =>
    (`${user.email} ${user.phone}`).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInactiveUsers = inactiveUsers.filter(user =>
    (`${user.email} ${user.phone}`).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportPDF = (data, title) => {
    const doc = new jsPDF();
    doc.text(title, 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [['#', 'Name', 'Email', 'Phone', 'Registered', 'Last Login']],
      body: data.map((user, i) => [
        i + 1,
        user.name,
        user.email,
        user.phone,
        new Date(user.createdAt).toLocaleDateString(),
        user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'
      ])
    });
    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
  };

  const handleSelectAll = (users, checked, type) => {
    const ids = checked ? users.map(u => u._id) : [];
    type === 'active' ? setSelectedActive(ids) : setSelectedInactive(ids);
    type === 'active' ? setSelectAllActive(checked) : setSelectAllInactive(checked);
  };

  const handleSelectOne = (id, type) => {
    const selected = type === 'active' ? selectedActive : selectedInactive;
    const setSelected = type === 'active' ? setSelectedActive : setSelectedInactive;

    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const exportSingleUser = (user) => {
    const doc = new jsPDF();
    doc.text(`User Details - ${user.name}`, 14, 15);
    autoTable(doc, {
      startY: 20,
      body: [
        ['Name', user.name],
        ['Email', user.email],
        ['Phone', user.phone],
        ['Registered On', new Date(user.createdAt).toLocaleDateString()],
        ['Last Login', user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never']
      ]
    });
    doc.save(`${user.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <h2 className="text-2xl font-bold mb-4">Total Users: {users.length}</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Search by email/phone"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select className="p-2 border rounded" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <button onClick={() => exportPDF(users, 'All Users')} className="bg-green-500 text-white px-3 py-2 rounded">
            Export All
          </button>
        </div>
      </div>

      {/* Active Users Table */}
      <UserTable
        title="Active Users"
        users={filteredActiveUsers}
        selected={selectedActive}
        selectAll={selectAllActive}
        handleSelectAll={(checked) => handleSelectAll(filteredActiveUsers, checked, 'active')}
        handleSelectOne={(id) => handleSelectOne(id, 'active')}
        exportPDF={() => exportPDF(filteredActiveUsers, 'Active Users')}
        exportSingleUser={exportSingleUser}
        handleDelete={() => handleBulkDelete('active')}
      />

      <UserTable
        title="Inactive Users"
        users={filteredInactiveUsers}
        selected={selectedInactive}
        selectAll={selectAllInactive}
        handleSelectAll={(checked) => handleSelectAll(filteredInactiveUsers, checked, 'inactive')}
        handleSelectOne={(id) => handleSelectOne(id, 'inactive')}
        exportPDF={() => exportPDF(filteredInactiveUsers, 'Inactive Users')}
        exportSingleUser={exportSingleUser}
        handleDelete={() => handleBulkDelete('inactive')}
      />

    </div>
  );
};

// Reusable Table Component
const UserTable = ({ title, users, selected, selectAll, handleSelectAll, handleSelectOne, exportPDF, exportSingleUser, handleDelete }) => (
  <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">
    <div className="flex justify-between items-center px-4 py-2">
      <h3 className="text-xl font-semibold">{title}: {users.length}</h3>
      <div className="flex gap-2">
        <button onClick={exportPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
          Export PDF
        </button>
        <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
          Delete Selected
        </button>
      </div>
    </div>

    <table className="min-w-full text-sm text-left text-gray-700">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="p-3">
            <input type="checkbox" checked={selectAll} onChange={(e) => handleSelectAll(e.target.checked)} />
          </th>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Registered</th>
          <th>Last Login</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => (
          <tr key={user._id} className="border-b hover:bg-gray-100 transition">
            <td className="p-3">
              <input type="checkbox" checked={selected.includes(user._id)} onChange={() => handleSelectOne(user._id)} />
            </td>
            <td>{i + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</td>
            <td>
              <button
                onClick={() => exportSingleUser(user)}
                className="bg-gray-600 text-white px-2 py-1 rounded"
              >
                Export Row
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ListUser;
