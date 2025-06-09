import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../../App';
import { toast } from 'react-toastify';

import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx';

import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const PricingTable = ({ token }) => {
  const [listPricing, setListPricing] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  const [sortOrder, setSortOrder] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');



// fetch data from backend -------------------------------------------------------
  const fetchListPricing = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/pricing/listPricingTable`);
      if (data.success) setListPricing(data.pricing);
      else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

// Enavle/Disable -------------------------------------------------------------------------------
  const toggleEnable = async (id, enableStatus) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/pricing/togglePricingEnable`,
        { id, isEnabledPricing: enableStatus },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message || "Status updated");
        fetchListPricing(); // Refresh list
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Server error while toggling");
    }
  };

  
  // remove data ----------------------------------------------------------------------------------------------------
  const removePricing = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/pricing/removePricing`,
        { id },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchListPricing();
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // Data submit -----------------------------------------------------------------------------------------
  const submitUpdate = async () => {
    try {
      const form = new FormData();
      form.append('pricingId', editingItem._id);
      form.append('planName', editingItem.planName);
      form.append('planPeriod', editingItem.planPeriod);
      form.append('price', editingItem.price);
      form.append('currency', editingItem.currency);
      form.append('planDetails', JSON.stringify(editingItem.planDetails));

      const { data } = await axios.put(
        `${backendUrl}/api/pricing/editPricing`,
        form,
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success('Updated successfully!');
        setIsEditing(false);
        fetchListPricing();
      } else {
        toast.error(data.message || 'Update failed.');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error updating item.');
    }
  };

  // Edit -----------------------------------------------------------------------
  const handleEdit = (item) => {
    setEditingItem({
      ...item,
      planDetails: item.planDetails.slice(), // clone array for editing
    });
    setIsEditing(true);
  };



// export To Word --------------------------------------------------------------------------------
  const exportToWord = async (listPricing) => {
    if (!listPricing.length) {
      alert("No pricing data available to export.");
      return;
    }

    // Header row
    const tableHeader = new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Plan Name")] }),
        new TableCell({ children: [new Paragraph("Plan Period")] }),
        new TableCell({ children: [new Paragraph("Description")] }),
        new TableCell({ children: [new Paragraph("Price")] }),
        new TableCell({ children: [new Paragraph("Currency")] }),
        new TableCell({ children: [new Paragraph("Features")] }),
        new TableCell({ children: [new Paragraph("Banner URL")] }),
      ],
    });

    // Data rows
    const dataRows = listPricing.map((item) => {
      return new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(item.planName || "")] }),
          new TableCell({ children: [new Paragraph(item.planPeriod || "")] }),
          new TableCell({ children: [new Paragraph(item.pricingDescription || "")] }),
          new TableCell({ children: [new Paragraph(String(item.price) || "")] }),
          new TableCell({ children: [new Paragraph(item.currency || "")] }),
          new TableCell({ children: [new Paragraph((item.planDetails || []).join(', '))] }),
          new TableCell({ children: [new Paragraph(item.pricingBanner || "")] }),
        ],
      });
    });

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Pricing List",
                  bold: true,
                  size: 28,
                }),
              ],
              spacing: { after: 200 },
            }),
            new Table({
              rows: [tableHeader, ...dataRows],
              width: {
                size: 100,
                type: "pct",
              },
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pricing.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

// PDF Export ---------------------------------------------------------------------------------------
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Plan","Period", "Description", "Price", "Currency", "Features", "Banner"];
    const tableRows = [];

    listPricing.forEach(item => {
      tableRows.push([
        item.planName,
        item.planPeriod,
        item.pricingDescription,
        item.price,
        item.currency,
        item.planDetails.join(" | "),
        item.pricingBanner
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      columnStyles: {
        5: { cellWidth: 40 }
      }
    });

    doc.save("pricing.pdf");
  };

  // export To Excel --------------------------------------------------------------------------
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      listPricing.map(item => ({
        Plan: item.planName,
        Period: item.planPeriod,
        Description: item.pricingDescription,
        Price: item.price,
        Currency: item.currency,
        Features: item.planDetails.join(" | "),
        Banner: item.pricingBanner
      }))
    );
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    FileSaver.saveAs(data, "pricing.xlsx");
  };

  // export To CSV-------------------------------------------------------------------------
  const exportToCSV = () => {
    const rows = listPricing.map(item => ({
      Plan: item.planName,
      Period: item.planPeriod,
      Description: item.pricingDescription,
      Price: item.price,
      Currency: item.currency,
      Features: item.planDetails.join(" | "),
      Banner: item.pricingBanner
    }));

    const csvContent = [
      Object.keys(rows[0]).join(","), // header
      ...rows.map(row => Object.values(row).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "pricing.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

// List Data ----------------------------------------------------------------------------------
  const sortedList = [...listPricing].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.date);
    const dateB = new Date(b.createdAt || b.date);

    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });


// Filter List -----------------------------------------------------------------------------------
  const filteredList = sortedList.filter(item =>
    item.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.planPeriod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.price.toString().includes(searchTerm) ||
    item.currency.toString().includes(searchTerm)
  );


  useEffect(() => {
    fetchListPricing();
  }, []);



  return (
    <>
      <div className="container mx-auto p-2">
        <h2 className="text-2xl font-bold mb-4">All Pricing Plans</h2>


        <input
          type="text"
          placeholder="Search by Plan Name, Currency, Price"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded mb-4 w-full md:w-1/3"
        />

        <div className="flex gap-3 mb-4">
          <button onClick={exportToCSV} className="bg-blue-500 text-white px-3 py-1 rounded">Export CSV</button>
          <button onClick={exportToExcel} className="bg-green-600 text-white px-3 py-1 rounded">Export Excel</button>
          <button onClick={exportToPDF} className="bg-red-500 text-white px-3 py-1 rounded">Export PDF</button>
          <button
            onClick={() => exportToWord(listPricing)}
            className="bg-indigo-600 text-white px-3 py-1 rounded"
          >
            Export Word
          </button>
        </div>

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


        {isEditing && editingItem && (

          <div className="mb-6 p-4 border rounded bg-gray-100">
            <h3 className="text-xl font-semibold mb-3">Edit Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Plan Name"
                value={editingItem.planName}
                onChange={e => setEditingItem({ ...editingItem, planName: e.target.value })}
              />
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Plan Period"
                value={editingItem.planPeriod}
                onChange={e => setEditingItem({ ...editingItem, planPeriod: e.target.value })}
              />
              <input
                type="number"
                className="border p-2 rounded"
                placeholder="Price"
                value={editingItem.price}
                onChange={e => setEditingItem({ ...editingItem, price: e.target.value })}
              />
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Currency"
                value={editingItem.currency}
                onChange={e => setEditingItem({ ...editingItem, currency: e.target.value })}
              />
              <textarea
                className="border p-2 rounded col-span-full"
                placeholder="Features (one per line)"
                value={editingItem.planDetails.join('\n')}
                onChange={e =>
                  setEditingItem({
                    ...editingItem,
                    planDetails: e.target.value.split('\n'),
                  })
                }
              />
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={submitUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsEditing(false);
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
                  selectedItems.forEach(id => removePricing(id));
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
                <div className="col-span-1 border-r border-gray-300 p-2 justify-center items-center flex">
                  <input
                    className='size-4 justify-center items-center text-center'
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => {
                      setSelectAll(e.target.checked);
                      setSelectedItems(e.target.checked ? filteredList.map(item => item._id) : []);
                    }}
                  />
                  <span className='ps-2'>Manage</span>
                </div>
                <div className="col-span-1 border-r border-gray-300 p-2">Plan name</div>
                <div className="col-span-1 border-r border-gray-300 p-2">Price</div>
                <div className="col-span-1 border-r border-gray-300 p-2">Currency</div>
                <div className="col-span-4 border-r border-gray-300 p-2">Features</div>
                <div className="col-span-1 p-2">Edit/Delete</div>
                <div className="col-span-1 p-2">Action</div>
              </div>

              {/* Table Rows */}
              {filteredList.map(item => (
                <div
                  key={item._id}
                  className="grid grid-cols-10 text-sm text-center border-b border-gray-300"
                >
                  {/* Manage */}
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

                  {/* Plan name */}
                  <div className="col-span-1 border-r border-gray-300 p-2 text-center">
                    <p className="font-semibold">{item.planName} / {item.planPeriod}</p>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 border-r border-gray-300 p-2 font-bold">{item.currency}{item.price}</div>

                  {/* Currency */}
                  <div className="col-span-1 border-r border-gray-300 p-2">{item.currency}</div>

                  {/* Features */}
                  <div className="col-span-4 border-r border-gray-300 p-2 text-left">
                    <ul className="list-disc list-inside space-y-1">
                      {item.planDetails.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Edit/Delete */}
                  <div className="flex col-span-1 p-2 justify-center border-r border-gray-300 items-center space-x-2 text-center">
                    <div className='grid grid-cols-1'>

                      <button
                        onClick={() => handleEdit(item)}
                        className="mb-2 border-2 rounded-full px-4 py-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white col-span-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removePricing(item._id)}
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
                        className={`mb-2 border-2 col-span-1 rounded-full px-4 py-1 ${item.isEnabledPricing
                          ? 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                          : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                          }`}
                        onClick={() => toggleEnable(item._id, !item.isEnabledPricing)}
                      >
                        {item.isEnabledPricing ? 'Disable' : 'Enable'}
                      </button>
                      <span className={`mb-2 col-span-1 rounded-lg px-4 py-1 ${item.isEnabledPricing ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {item.isEnabledPricing ? 'Enabled' : 'Disabled'}
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

export default PricingTable;

