/** @format */

import React, { useState, useEffect } from 'react';
import {
   FaBars,
   FaChevronRight,
   FaChevronDown,
   FaSortUp,
   FaSortDown,
} from 'react-icons/fa';

const SIDEBAR_OPTIONS = [
   {
      label: 'Profile Management',
      children: ['Students', 'Parents', 'Mentor', 'Admin'],
   },
   { label: 'Option 2' },
   { label: 'Option 3' },
   { label: 'Option 4' },
   { label: 'Option 5' },
];

const FAKE_STUDENT_DATA = [
   {
      date: '09-Aug-2025 09:15 AM',
      enquiryId: '1001',
      name: 'Vipin Gusain',
      mobile: '9876543100',
      area: 'Hyderabad',
      takenBy: 'Anil Sinha',
      package: 'Keyboard',
      leadType: 'Walk-in',
      leadSource: 'Newspaper',
      status: 'Admitted',
      createdDate: '09-Aug-2025 09:16 AM',
   },
   {
      date: '12-Aug-2025 11:35 AM',
      enquiryId: '1002',
      name: 'Gaurav Rajan',
      mobile: '9821122334',
      area: 'Delhi',
      takenBy: 'Priya Verma',
      package: 'Guitar',
      leadType: 'Phone',
      leadSource: 'Google',
      status: 'Non Admitted',
      createdDate: '12-Aug-2025 11:40 AM',
   },
   {
      date: '19-Jul-2025 03:50 PM',
      enquiryId: '1003',
      name: 'Shriram',
      mobile: '9899887766',
      area: 'Pune',
      takenBy: 'Vikas Jain',
      package: 'Drums',
      leadType: 'Online',
      leadSource: 'Instagram',
      status: 'Admitted',
      createdDate: '19-Jul-2025 04:05 PM',
   },
   {
      date: '01-Aug-2025 02:05 PM',
      enquiryId: '1004',
      name: 'Vadiraj Aralappanavar',
      mobile: '9966442200',
      area: 'Ahmedabad',
      takenBy: 'Smita Rao',
      package: 'Vocal',
      leadType: 'Walk-in',
      leadSource: 'Friend',
      status: 'Admitted',
      createdDate: '01-Aug-2025 02:07 PM',
   },
   {
      date: '03-Aug-2025 10:25 AM',
      enquiryId: '1005',
      name: 'Sandeep Gupta',
      mobile: '9933221100',
      area: 'Bangalore',
      takenBy: 'Ritu Chauhan',
      package: 'Piano',
      leadType: 'Phone',
      leadSource: 'School',
      status: 'Non Admitted',
      createdDate: '03-Aug-2025 10:27 AM',
   },
   {
      date: '15-Jul-2025 04:11 PM',
      enquiryId: '1006',
      name: 'Monika Singh',
      mobile: '9812345678',
      area: 'Kolkata',
      takenBy: 'Manoj Nayak',
      package: 'Guitar',
      leadType: 'Online',
      leadSource: 'Website',
      status: 'Admitted',
      createdDate: '15-Jul-2025 04:15 PM',
   },
   {
      date: '25-Jul-2025 12:45 PM',
      enquiryId: '1007',
      name: 'Ankit Arora',
      mobile: '9876501234',
      area: 'Chennai',
      takenBy: 'Kiran Patil',
      package: 'Keyboard',
      leadType: 'Walk-in',
      leadSource: 'Flyer',
      status: 'Non Admitted',
      createdDate: '25-Jul-2025 12:47 PM',
   },
   {
      date: '28-Jul-2025 02:50 PM',
      enquiryId: '1008',
      name: 'Pooja Nair',
      mobile: '9898989898',
      area: 'Mumbai',
      takenBy: 'Jaspreet Kaur',
      package: 'Piano',
      leadType: 'Phone',
      leadSource: 'Facebook',
      status: 'Admitted',
      createdDate: '28-Jul-2025 03:10 PM',
   },
   {
      date: '18-Aug-2025 09:59 AM',
      enquiryId: '1009',
      name: 'Rahul Rathod',
      mobile: '9900112233',
      area: 'Lucknow',
      takenBy: 'Priyanka Mehta',
      package: 'Drums',
      leadType: 'Online',
      leadSource: 'Google',
      status: 'Admitted',
      createdDate: '18-Aug-2025 10:01 AM',
   },
   {
      date: '24-Aug-2025 05:30 PM',
      enquiryId: '1010',
      name: 'Sneha Vyas',
      mobile: '9876123456',
      area: 'Surat',
      takenBy: 'Aashish Joshi',
      package: 'Vocal',
      leadType: 'Walk-in',
      leadSource: 'Banner',
      status: 'Non Admitted',
      createdDate: '24-Aug-2025 05:35 PM',
   },
];

/// Helper for date comparison
function parseDate(str) {
   let [day, month, yearAndRest] = str.split('-');
   let [year, time, ampm] = yearAndRest.trim().split(' ');
   return new Date(`${month} ${day} ${year} ${time} ${ampm}`);
}

export default function Dashboard() {
   const [expanded, setExpanded] = useState(true);
   const [openMenu, setOpenMenu] = useState(null);
   const [activeSubMenu, setActiveSubMenu] = useState('Students');

   // Table filter/search/pagination state
   const [studentData, setStudentData] = useState([]);
   const [fromDate, setFromDate] = useState('');
   const [toDate, setToDate] = useState('');
   const [search, setSearch] = useState('');
   const [filtered, setFiltered] = useState([]);
   const [recordsPerPage, setRecordsPerPage] = useState(10);
   const [page, setPage] = useState(1);

   // Initialize sortConfig with default sort key and direction to show icon on load
   const [sortConfig, setSortConfig] = useState({
      key: 'date',
      direction: 'asc',
   });

   // State for selected rows
   const [selectedRows, setSelectedRows] = useState([]);

   useEffect(() => {
      setTimeout(() => setStudentData(FAKE_STUDENT_DATA), 400);
   }, []);

   useEffect(() => {
      let rows = [...studentData];
      // Apply sorting first
      if (sortConfig.key) {
         rows.sort((a, b) => {
            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];

            // Parse dates for proper comparison
            if (sortConfig.key === 'date' || sortConfig.key === 'createdDate') {
               aVal = parseDate(aVal);
               bVal = parseDate(bVal);
            } else {
               aVal = aVal.toString().toLowerCase();
               bVal = bVal.toString().toLowerCase();
            }

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
         });
      }

      // Filtering based on date range and search
      if (fromDate)
         rows = rows.filter((r) => parseDate(r.date) >= new Date(fromDate));
      if (toDate)
         rows = rows.filter((r) => parseDate(r.date) <= new Date(toDate));
      if (search.trim().length > 0) {
         const s = search.trim().toLowerCase();
         rows = rows.filter((r) =>
            Object.values(r).join(' ').toLowerCase().includes(s)
         );
      }

      setFiltered(rows);
      setPage(1);
   }, [studentData, sortConfig, fromDate, toDate, search]);

   // Pagination data
   const totalPages = Math.ceil(filtered.length / recordsPerPage);
   const pagedRows = filtered.slice(
      (page - 1) * recordsPerPage,
      page * recordsPerPage
   );

   // Handle page change
   function handlePageChange(p) {
      if (p < 1 || p > totalPages) return;
      setPage(p);
   }

   // Handle sorting on header click
   const handleSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
         direction = 'desc';
      }
      setSortConfig({ key, direction });
   };

   // Show both sort directions as faded and highlight active one
   const renderSortIcon = (key) => {
      return (
         <span
            className='inline-flex items-center  ml-1 flex flex-col text-gray-400'
            style={{ lineHeight: 0.8, fontSize: 10 }}>
            <FaSortUp
               className={`${
                  sortConfig.key === key && sortConfig.direction === 'asc'
                     ? 'text-black'
                     : 'text-gray-400'
               } cursor-pointer`}
               onClick={(e) => {
                  e.stopPropagation();
                  setSortConfig({ key, direction: 'asc' });
               }}
               title='Sort ascending'
            />
            <FaSortDown
               className={`${
                  sortConfig.key === key && sortConfig.direction === 'desc'
                     ? 'text-black'
                     : 'text-gray-400'
               } cursor-pointer`}
               onClick={(e) => {
                  e.stopPropagation();
                  setSortConfig({ key, direction: 'desc' });
               }}
               title='Sort descending'
            />
         </span>
      );
   };

   // Checkbox handlers
   const handleRowCheckboxChange = (id, checked) => {
      setSelectedRows((prev) =>
         checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
      );
   };
   const isChecked = (id) => selectedRows.includes(id);

   // Determine button enabled/disabled state
   const onlyOneSelected = selectedRows.length === 1;
   const multipleSelected = selectedRows.length > 1;

   return (
      <div className='h-screen w-screen bg-gray-100 flex flex-col'>
         {/* Top nav bar */}
         <div className='h-14 bg-gray-100 flex items-center px-6 shadow-sm'>
            <button onClick={() => setExpanded((exp) => !exp)} className='mr-5'>
               <FaBars size={24} />
            </button>
            <span className='text-gray-400 text-lg'>
               {expanded ? 'Collapse' : 'expand'}
            </span>
         </div>

         <div className='flex flex-1 overflow-hidden'>
            {/* Sidebar */}
            <div
               className={`bg-gray-100 pt-8 pb-6 transition-all duration-300 ${
                  expanded ? 'w-64' : 'w-16'
               }`}>
               <div className='flex flex-col h-full'>
                  <div className='flex items-center mb-7 px-4'>
                     <img
                        src='https://i.ibb.co/Zc7p64r/octavium-logo.png'
                        alt='Octavium Logo'
                        className='w-20 h-12 object-contain'
                     />
                  </div>
                  <div className='flex-1 flex flex-col gap-2'>
                     {SIDEBAR_OPTIONS.map((option, idx) => (
                        <div key={option.label}>
                           <button
                              className={`flex items-center gap-3 w-full py-3 px-4 rounded ${
                                 idx === 0 && expanded
                                    ? 'bg-gray-200 font-semibold'
                                    : 'hover:bg-gray-200'
                              }`}
                              onClick={() =>
                                 expanded && option.children
                                    ? setOpenMenu(openMenu === idx ? null : idx)
                                    : null
                              }>
                              {expanded && (
                                 <>
                                    <span className='flex-1 text-left text-gray-800'>
                                       {option.label}
                                    </span>
                                    {option.children &&
                                       (openMenu === idx ? (
                                          <FaChevronDown className='ml-auto' />
                                       ) : (
                                          <FaChevronRight className='ml-auto' />
                                       ))}
                                 </>
                              )}
                           </button>
                           {/* Submenu */}
                           {expanded && openMenu === idx && option.children && (
                              <div className='ml-10 mt-2 space-y-2'>
                                 {option.children.map((child) => (
                                    <button
                                       key={child}
                                       className={`block w-full text-left py-2 px-3 rounded bg-gray-100 hover:bg-gray-200 ${
                                          activeSubMenu === child
                                             ? 'bg-gray-200 font-semibold'
                                             : ''
                                       }`}
                                       onClick={() => setActiveSubMenu(child)}>
                                       {child}
                                    </button>
                                 ))}
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className='flex-1 bg-white p-6 overflow-y-auto'>
               {activeSubMenu === 'Students' && (
                  <>
                     <div className='text-2xl font-bold mb-3'>Student Info</div>
                     <div className='flex flex-row items-end gap-8 mb-5'>
                        <div>
                           <span className='font-semibold mr-3'>Branch</span>
                           <select className='border border-gray-300 px-3 py-1 rounded min-w-[320px] text-sm'>
                              <option>
                                 Organization Level (No Branch/Company Selected)
                              </option>
                           </select>
                        </div>
                        <div>
                           <button className='bg-gray-200 text-black px-6 py-1 rounded shadow ml-2'>
                              Cancel
                           </button>
                           <button className='bg-[#51B04A] text-white px-6 py-1 rounded shadow ml-2'>
                              Submit
                           </button>
                        </div>
                     </div>

                     {/* ACTION BUTTONS SHOWN ONLY IF CHECKBOXES SELECTED */}
                     {/* {selectedRows.length > 0 && (
                        <div className='flex gap-2 mb-3'>
                           <button className='bg-[#e3f1ff] text-black px-6 py-1 rounded border border-blue-200 shadow'>
                              View
                           </button>
                           <button className='bg-[#e3f1ff] text-black px-6 py-1 rounded border border-blue-200 shadow'>
                              Edit
                           </button>
                           <button className='bg-[#2196f3] text-white px-6 py-1 rounded shadow'>
                              Add New
                           </button>
                           <button className='bg-[#f44336] text-white px-6 py-1 rounded shadow'>
                              Delete
                           </button>
                        </div>
                     )} */}

                     <div className='flex items-center mb-2 gap-2'>
                        <select
                           className='border border-gray-300 px-2 py-1 rounded w-20'
                           value={recordsPerPage}
                           onChange={(e) =>
                              setRecordsPerPage(Number(e.target.value))
                           }>
                           {[5, 10, 25, 50, 100].map((num) => (
                              <option key={num} value={num}>
                                 {num}
                              </option>
                           ))}
                        </select>
                        <span className='mr-2 text-sm'>records per page</span>
                        <label className='mr-1 text-sm'>
                           From:
                           <input
                              type='date'
                              className='border border-gray-300 px-2 py-1 rounded ml-1'
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                           />
                        </label>
                        <label className='mr-4 text-sm'>
                           To:
                           <input
                              type='date'
                              className='border border-gray-300 px-2 py-1 rounded ml-1'
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                           />
                        </label>

                        {/* Action buttons with conditional enables */}
                        {selectedRows.length > 0 && (
                           <div className='flex gap-2'>
                              <button
                                 disabled={!onlyOneSelected}
                                 className={`px-6 py-1 rounded border border-blue-200 shadow text-sm ${
                                    onlyOneSelected
                                       ? 'bg-[#e3f1ff] text-black'
                                       : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                 }`}>
                                 View
                              </button>
                              <button
                                 disabled={!onlyOneSelected}
                                 className={`px-6 py-1 rounded border border-blue-200 shadow text-sm ${
                                    onlyOneSelected
                                       ? 'bg-[#e3f1ff] text-black'
                                       : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                 }`}>
                                 Edit
                              </button>
                              <button
                                 disabled={!onlyOneSelected}
                                 className={`px-6 py-1 rounded shadow text-sm ${
                                    onlyOneSelected
                                       ? 'bg-[#2196f3] text-white'
                                       : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                 }`}>
                                 Add New
                              </button>
                              <button
                                 disabled={
                                    selectedRows.length === 0 ? true : false
                                 }
                                 className={`px-6 py-1 rounded shadow text-sm ${
                                    selectedRows.length > 0
                                       ? 'bg-[#f44336] text-white'
                                       : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                 }`}>
                                 Delete
                              </button>
                           </div>
                        )}
                        <div className='ml-auto flex items-center'>
                           <input
                              placeholder='Search'
                              className='border border-gray-300 px-3 py-1 rounded text-sm mr-1'
                              style={{ width: 120 }}
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                           />
                           <button
                              className='bg-green-600 text-white px-2 py-1 rounded mr-1'
                              onClick={() => setSearch('')}
                              title='Reset Search'>
                              &#8635;
                           </button>
                           <button className='bg-teal-600 text-white px-2 py-1 rounded ml-1'>
                              &#9881;
                           </button>
                        </div>
                     </div>
                     <div className='overflow-x-auto'>
                        <table className='min-w-full border border-gray-300 mt-2'>
                           <thead>
                              <tr className='bg-[#f7f7f7] text-xs font-semibold border-b'>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('date')}>
                                    ENQUIRY/WALK IN DATE{' '}
                                    {renderSortIcon('date')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('enquiryId')}>
                                    ENQUIRY ID {renderSortIcon('enquiryId')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('name')}>
                                    STUDENT NAME {renderSortIcon('name')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('mobile')}>
                                    MOBILE {renderSortIcon('mobile')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('area')}>
                                    AREA {renderSortIcon('area')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('takenBy')}>
                                    ENQUIRY TAKEN BY {renderSortIcon('takenBy')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('package')}>
                                    COURSE PACKAGE {renderSortIcon('package')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('leadType')}>
                                    LEAD TYPE {renderSortIcon('leadType')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('leadSource')}>
                                    LEAD SOURCE {renderSortIcon('leadSource')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('status')}>
                                    STATUS {renderSortIcon('status')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('createdDate')}>
                                    CREATED DATE {renderSortIcon('createdDate')}
                                 </th>
                                 <th className='px-1 py-2'></th>
                              </tr>
                           </thead>

                           <tbody>
                              {pagedRows.map((row, idx) => (
                                 <tr key={idx} className='text-sm border-b'>
                                    <td className='px-2 py-1 border-r'>
                                       {row.date}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.enquiryId}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.name}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.mobile}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.area}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.takenBy}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.package}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.leadType}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.leadSource}
                                    </td>
                                    <td
                                       className={`px-2 py-1 border-r font-semibold ${
                                          row.status === 'Admitted'
                                             ? 'text-[#51B04A]'
                                             : 'text-yellow-600'
                                       }`}>
                                       {row.status}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.createdDate}
                                    </td>
                                    <td className='px-2 py-1 text-center'>
                                       <input
                                          type='checkbox'
                                          checked={isChecked(row.enquiryId)}
                                          onChange={(e) =>
                                             handleRowCheckboxChange(
                                                row.enquiryId,
                                                e.target.checked
                                             )
                                          }
                                       />
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <div className='flex justify-between items-center'>
                        <div className='text-xs mt-2 text-gray-600 text-left'>
                           {filtered.length === 0
                              ? 'No entries found'
                              : `Showing ${
                                   filtered.length === 0
                                      ? 0
                                      : (page - 1) * recordsPerPage + 1
                                } to ${Math.min(
                                   filtered.length,
                                   page * recordsPerPage
                                )} of ${filtered.length} entries`}
                        </div>
                        <div className='flex gap-2 mt-3 justify-end'>
                           <button
                              className={`px-3 py-1 rounded border ${
                                 page === 1 ? 'bg-gray-200 text-gray-600' : ''
                              }`}
                              onClick={() => handlePageChange(page - 1)}>
                              Prev
                           </button>
                           {[...Array(totalPages)].map((_, i) => (
                              <button
                                 key={i}
                                 className={`px-3 py-1 rounded border ${
                                    page === i + 1
                                       ? 'bg-[#51B04A] text-white'
                                       : 'bg-white text-gray-600'
                                 }`}
                                 onClick={() => handlePageChange(i + 1)}>
                                 {i + 1}
                              </button>
                           ))}
                           <button
                              className={`px-3 py-1 rounded border ${
                                 page === totalPages
                                    ? 'bg-gray-200 text-gray-600'
                                    : ''
                              }`}
                              onClick={() => handlePageChange(page + 1)}>
                              Next
                           </button>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}
