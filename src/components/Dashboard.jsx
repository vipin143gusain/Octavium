/** @format */

import React, { useState, useEffect } from 'react';
import {
   FaBars,
   FaChevronRight,
   FaChevronDown,
   FaSortUp,
   FaSortDown,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

function getSortValue(row, key) {
   switch (key) {
      case 'enquiries':
         return row.enquiries &&
            row.enquiries.length > 0 &&
            row.enquiries[0].walkin_date
            ? row.enquiries[0].walkin_date
            : '';
      case 'addresses':
         return row.addresses &&
            row.addresses.length > 0 &&
            row.addresses[0].city
            ? row.addresses[0].city
            : '';
      case 'first_name':
         return (row.first_name || '') + (row.last_name || '');
      case 'hash_id':
         return row.hash_id || '';
      case 'mobile_number':
         return row.mobile_number || '';
      case 'created_at':
         return row.enquiries &&
            row.enquiries.length > 0 &&
            row.enquiries[0].created_at
            ? row.enquiries[0].created_at
            : '';
      default:
         return row[key] || '';
   }
}

export default function Dashboard() {
   const [expanded, setExpanded] = useState(true);
   const [openMenu, setOpenMenu] = useState(null);
   const [activeSubMenu, setActiveSubMenu] = useState('Students');
   const [studentData, setStudentData] = useState([]);
   const [fromDate, setFromDate] = useState('');
   const [toDate, setToDate] = useState('');
   const [search, setSearch] = useState('');
   const [filtered, setFiltered] = useState([]);
   const [recordsPerPage, setRecordsPerPage] = useState(10);
   const [page, setPage] = useState(1);

   const [selectAll, setSelectAll] = useState(false);

   // State for selected rows
   const [selectedRows, setSelectedRows] = useState([]);

   const navigate = useNavigate();
   const handleView = () => {
      if (selectedRows.length === 1) {
         const hashId = selectedRows[0];
         navigate(`/student-info-form/${hashId}`);
      }
   };

   // Default sort by name for real API
   const [sortConfig, setSortConfig] = useState({
      key: 'first_name',
      direction: 'asc',
   });

   useEffect(() => {
      fetch('http://localhost:8000/api/users', {
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
      })
         .then((res) => res.json())
         .then((data) => setStudentData(data))
         .catch((err) => {
            console.error('API fetch error:', err);
            setStudentData([]);
         });
   }, []);

   useEffect(() => {
      let rows = [...studentData];

      // Filtering (no date filter here, but you could use it for created_at etc)
      if (search.trim().length > 0) {
         const s = search.trim().toLowerCase();
         rows = rows.filter((r) => {
            const combined = [
               r.first_name,
               r.last_name,
               r.mobile_number,
               r.hash_id,
               r.is_active ? 'active' : 'not active',
               r.addresses?.[0]?.city,
               r.enquiries?.[0]?.walkin_date,
               r.enquiries?.[0]?.cource,
               r.enquiries?.[0]?.source,
               r.enquiries?.[0]?.type,
            ]
               .filter(Boolean)
               .join(' ')
               .toLowerCase();

            return combined.includes(s);
         });
      }

      // Sorting
      if (sortConfig.key) {
         rows.sort((a, b) => {
            let aVal = getSortValue(a, sortConfig.key);
            let bVal = getSortValue(b, sortConfig.key);
            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
         });
      }

      setFiltered(rows);
      setPage(1);
   }, [studentData, sortConfig, fromDate, toDate, search]);

   const totalPages = Math.ceil(filtered.length / recordsPerPage);
   const pagedRows = filtered.slice(
      (page - 1) * recordsPerPage,
      page * recordsPerPage
   );

   useEffect(() => {
      if (selectedRows.length === 0) {
         setSelectAll(false);
      } else if (selectedRows.length === pagedRows.length) {
         setSelectAll(true);
      } else {
         setSelectAll(false);
      }
   }, [selectedRows, pagedRows]);

   function handlePageChange(p) {
      if (p < 1 || p > totalPages) return;
      setPage(p);
   }

   function handleSort(key) {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
         direction = 'desc';
      }
      setSortConfig({ key, direction });
   }

   // Checkbox handlers
   const handleRowCheckboxChange = (id, checked) => {
      setSelectedRows((prev) =>
         checked
            ? Array.from(new Set([...prev, id]))
            : prev.filter((rowId) => rowId !== id)
      );
   };

   const isChecked = (id) => selectedRows.includes(id);

   // Determine button enabled/disabled state
   const onlyOneSelected = selectedRows.length === 1;
   const multipleSelected = selectedRows.length > 1;

   function renderSortIcon(key) {
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
   }

   return (
      <div className='h-screen w-screen bg-[#EDEDED] flex flex-col'>
         {/* Top nav bar */}
         <div className='h-14 bg-[#EDEDED] flex items-center px-6 shadow-sm'>
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
               className={`bg-[#EDEDED] pt-8 pb-6 transition-all duration-300 ${
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
                        {/* Add fromDate/toDate filters if needed */}
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

                        {/* Action buttons with conditional enables */}
                        {selectedRows.length > 0 && (
                           <div className='flex gap-2'>
                              <button
                                 onClick={handleView}
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
                     </div>
                     <div className='overflow-x-auto'>
                        <table className='min-w-full border border-gray-300 mt-2'>
                           <thead>
                              <tr className='bg-[#f7f7f7] text-xs font-semibold border-b'>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('enquiries')}>
                                    ENQUIRY/WALK IN DATE{' '}
                                    {renderSortIcon('enquiries')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('hash_id')}>
                                    ENQUIRY ID {renderSortIcon('hash_id')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('first_name')}>
                                    STUDENT NAME {renderSortIcon('first_name')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('mobile_number')}>
                                    MOBILE {renderSortIcon('mobile_number')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('addresses')}>
                                    AREA {renderSortIcon('addresses')}
                                 </th>

                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('addresses')}>
                                    ENQUIRY TAKEN BY
                                    {renderSortIcon('addresses')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('addresses')}>
                                    COURSE PACKAGE
                                    {renderSortIcon('addresses')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('addresses')}>
                                    LEAD TYPE
                                    {renderSortIcon('addresses')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('addresses')}>
                                    LEAD SOURCE
                                    {renderSortIcon('addresses')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('addresses')}>
                                    STATUS
                                    {renderSortIcon('addresses')}
                                 </th>
                                 <th
                                    className='px-1 py-2 border-r cursor-pointer select-none'
                                    onClick={() => handleSort('addresses')}>
                                    CREATED DATE
                                    {renderSortIcon('addresses')}
                                 </th>

                                 <th>
                                    <input
                                       type='checkbox'
                                       checked={selectAll}
                                       onChange={(e) => {
                                          const checked = e.target.checked;
                                          setSelectAll(checked);
                                          if (checked) {
                                             // ✅ select all visible rows by hash_id
                                             setSelectedRows(
                                                pagedRows.map((r) => r.hash_id)
                                             );
                                          } else {
                                             setSelectedRows([]);
                                          }
                                       }}
                                    />
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              {pagedRows.map((row, idx) => (
                                 <tr key={idx} className='text-sm border-b'>
                                    <td className='px-2 py-1 border-r'>
                                       {row.enquiries &&
                                       row.enquiries.length > 0
                                          ? row.enquiries[0].walkin_date ||
                                            'No enquirie'
                                          : 'No enquirie'}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.hash_id}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.first_name} {row.last_name}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.mobile_number}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.addresses &&
                                       row.addresses.length > 0
                                          ? row.addresses[0].city ||
                                            'No address'
                                          : 'No address'}
                                    </td>
                                    <td className='px-2 py-1 border-r'>N/A</td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.enquiries &&
                                       row.enquiries.length > 0
                                          ? row.enquiries[0].cource || 'N/A'
                                          : 'No course'}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.enquiries &&
                                       row.enquiries.length > 0
                                          ? row.enquiries[0].type || 'N/A'
                                          : 'No type'}
                                    </td>
                                    <td className='px-2 py-1 border-r'>
                                       {row.enquiries &&
                                       row.enquiries.length > 0
                                          ? row.enquiries[0].source || 'N/A'
                                          : 'No source'}
                                    </td>

                                    <td className='px-2 py-1 border-r'>
                                       {row.is_active ? (
                                          <span className='text-green-600 font-bold'>
                                             Active
                                          </span>
                                       ) : (
                                          <span className='text-red-600 font-bold'>
                                             Not Active
                                          </span>
                                       )}
                                    </td>

                                    <td className='px-2 py-1 border-r'>
                                       {row.enquiries &&
                                       row.enquiries.length > 0
                                          ? row.enquiries[0].created_at ||
                                            'No created date'
                                          : 'No created date'}
                                    </td>

                                    <td className='px-2 py-1 text-center'>
                                       <input
                                          type='checkbox'
                                          checked={isChecked(row.hash_id)}
                                          onChange={(e) =>
                                             handleRowCheckboxChange(
                                                row.hash_id,
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
