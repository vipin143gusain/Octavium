/** @format */

import React, { useState } from 'react';
import {
   ChevronDown,
   Search,
   Filter,
   RotateCcw,
   Trash2,
   Edit2,
} from 'lucide-react';

const CatalogueManagement = () => {
   // 1. State for Filters
   const [filters, setFilters] = useState({
      discipline: 'Music',
      level1: 'Western',
      level2: 'Contemporary',
      level3: 'POP',
      level4: 'Drums',
   });

   // 2. State for Table Expansion
   const [expandedRows, setExpandedRows] = useState({});

   const toggleRow = (id) => {
      setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
   };

   return (
      <div className='bg-gray-50 min-h-screen p-4 font-sans text-sm'>
         {/* Header */}
         <div className='bg-white p-4 shadow-sm mb-4 flex justify-between items-center'>
            <h1 className='text-xl font-bold text-gray-700'>
               Catalogue Management
            </h1>
         </div>

         {/* Filter Section */}
         <div className='bg-white p-6 border rounded-md shadow-sm mb-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
               <FilterGroup label='Discipline' value={filters.discipline} />
               <FilterGroup label='Level 3 Branch' value={filters.level3} />
               <FilterGroup label='Level 1 Branch' value={filters.level1} />
               <FilterGroup label='Level 4 Branch' value={filters.level4} />
               <FilterGroup label='Level 2 Branch' value={filters.level2} />
               <div className='flex items-end gap-2'>
                  <button className='px-6 py-2 border rounded hover:bg-gray-100'>
                     Cancel
                  </button>
                  <button className='px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
                     Submit
                  </button>
               </div>
            </div>
         </div>

         {/* Data Table */}
         <div className='bg-white border rounded shadow-sm overflow-hidden'>
            {/* Table Controls */}
            <div className='p-3 border-b flex justify-between items-center bg-gray-50'>
               <div className='flex gap-2 items-center'>
                  <select className='border rounded px-2 py-1 bg-white'>
                     <option>10</option>
                  </select>
                  <span>records per page</span>
                  <input
                     type='text'
                     placeholder='Filter by Date Range'
                     className='border rounded px-3 py-1 ml-4 bg-white'
                  />
               </div>
               <div className='flex gap-2'>
                  <div className='relative'>
                     <input
                        type='text'
                        placeholder='Search'
                        className='border rounded pl-8 pr-2 py-1 bg-white'
                     />
                     <Search className='absolute left-2 top-2 w-4 h-4 text-gray-400' />
                  </div>
                  <button className='p-2 bg-green-700 text-white rounded'>
                     <RotateCcw className='w-4 h-4' />
                  </button>
                  <button className='p-2 bg-teal-600 text-white rounded'>
                     <Filter className='w-4 h-4' />
                  </button>
               </div>
            </div>

            {/* The Table Content */}
            <table className='w-full border-collapse'>
               <thead className='bg-white border-b uppercase text-xs font-bold text-gray-600'>
                  <tr>
                     <th className='p-3 text-left'>Stream</th>
                     <th className='p-3 text-left'>Branch 1</th>
                     <th className='p-3 text-left'>Branch 2</th>
                     <th className='p-3 text-left'>Branch 3</th>
                     <th className='p-3 text-left'>Branch 4</th>
                     <th className='p-3 text-left'>Topic</th>
                     <th className='p-3 text-left'>Units</th>
                     <th className='p-3'></th>
                  </tr>
               </thead>
               <tbody>
                  <tr
                     className='border-b hover:bg-gray-50 cursor-pointer'
                     onClick={() => toggleRow(1)}>
                     <td className='p-3'>Music</td>
                     <td className='p-3'>Western</td>
                     <td className='p-3'>Contemporary</td>
                     <td className='p-3'>Rock</td>
                     <td className='p-3'>Guitar</td>
                     <td className='p-3'>Aural</td>
                     <td className='p-3 flex items-center justify-between'>
                        <span>M2, M3, P4, P5, M6 & Octave 1</span>
                        <ChevronDown
                           className={`w-4 h-4 transform ${
                              expandedRows[1] ? 'rotate-180' : ''
                           }`}
                        />
                     </td>
                     <td className='p-3'>
                        <input type='checkbox' />
                     </td>
                  </tr>

                  {/* Expanded Content Section */}
                  {expandedRows[1] && (
                     <tr className='bg-gray-50'>
                        <td colSpan='8' className='p-6'>
                           <div className='bg-white border rounded p-4'>
                              <div className='flex justify-between font-bold border-b pb-2 mb-4'>
                                 <span>TOPICS</span>
                                 <span>UNITS</span>
                              </div>
                              <div className='flex justify-between items-center mb-4'>
                                 <span>TOPIC 1</span>
                                 <span>Aural</span>
                              </div>

                              {/* Rich Text Editor Mockup */}
                              <div className='mb-4'>
                                 <label className='block mb-2 font-semibold'>
                                    Course Content 1
                                 </label>
                                 <div className='border rounded'>
                                    <div className='bg-gray-100 p-2 border-b flex gap-4 text-gray-600'>
                                       <span className='font-bold'>B</span>{' '}
                                       <i>I</i> <u>U</u>{' '}
                                       <Edit2 className='w-4 h-4' />
                                    </div>
                                    <div className='p-4 min-h-[150px] bg-white'>
                                       <div className='border p-2 rounded mb-2 flex justify-between items-center text-xs'>
                                          <span>Image 1.jpg (500kb)</span>
                                          <Trash2 className='w-4 h-4 text-red-500 cursor-pointer' />
                                       </div>
                                       <div className='flex gap-4 items-center mt-6'>
                                          <span>Class Cost</span>
                                          <input
                                             type='text'
                                             value='₹ 10000.00'
                                             className='border rounded px-2 py-1'
                                          />
                                          <button className='bg-blue-600 text-white px-6 py-1 rounded ml-auto'>
                                             Edit
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>

         {/* Footer Submission */}
         <div className='mt-8 flex gap-4 items-center'>
            <label className='font-bold'>Enter the course name</label>
            <input
               type='text'
               className='border rounded px-4 py-2 flex-grow'
               placeholder='Guitar Course for beginners'
            />
            <button className='bg-blue-600 text-white px-8 py-2 rounded font-bold'>
               Create Course
            </button>
         </div>
      </div>
   );
};

// Helper Component for Filters
const FilterGroup = ({ label, value }) => (
   <div>
      <label className='block text-gray-700 font-bold mb-1'>{label}</label>
      <div className='relative'>
         <select className='w-full border rounded p-2 appearance-none bg-white'>
            <option>{value}</option>
         </select>
         <ChevronDown className='absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none' />
      </div>
   </div>
);

export default CatalogueManagement;
