/** @format */

import React, { useState } from 'react';
import {
   ChevronDown,
   Search,
   RotateCcw,
   Filter,
   Upload,
   Download,
   Plus,
   Minus,
   X,
} from 'lucide-react';
import TopicAccordion from './TopicAccordion';

const BulkUploadManagement = () => {
   return (
      <div className='bg-gray-100 min-h-screen p-6 font-sans text-[13px] text-gray-700'>
         {/* 1. Top Header with Logo */}
         <div className='bg-white border-b p-4 mb-6 flex justify-between items-center shadow-sm'>
            <h1 className='text-xl font-semibold text-gray-800'>Bulk Upload</h1>
         </div>

         {/* 2. Branch Selection */}
         <div className='bg-white p-5 border rounded-sm shadow-sm mb-6'>
            <label className='block font-bold mb-2'>Branch</label>
            <select className='w-1/3 border p-2 rounded bg-white outline-none'>
               <option>Organization Level (No Branch/Company Selected)</option>
            </select>

            {/* 3. Search Company By Section */}
            <div className='mt-6 border p-6 rounded-sm relative'>
               <span className='absolute -top-3 left-4 bg-white px-2 font-semibold text-gray-500'>
                  Search Company By
               </span>
               <div className='grid grid-cols-2 gap-x-12 gap-y-6'>
                  <SearchableMultiSelect
                     label='Discipline'
                     placeholder='Music'
                     options={['Art & Craft', 'Dance']}
                  />
                  <Dropdown label='Level 3 Branch' value='POP' />
                  <SearchableMultiSelect
                     label='Level 1 Branch'
                     placeholder='western'
                     options={[]}
                  />
                  <Dropdown label='Level 4 Branch' value='Drums' />
                  <Dropdown label='Level 2 Branch' value='Cotemporary' />

                  <div className='flex items-end justify-start gap-3'>
                     <button className='bg-gray-200 px-8 py-2 rounded text-gray-700'>
                        Cancle
                     </button>
                     <button className='bg-[#5cb85c] px-8 py-2 rounded text-white font-semibold'>
                        Submit
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* 4. Segmented Upload/Download Action Bar */}
         <div className='flex border rounded-md shadow-sm mb-8 overflow-hidden bg-white h-14'>
            <button className='flex-1 flex items-center justify-center gap-2 font-bold text-gray-700 hover:bg-gray-50'>
               Upload Catalogue
            </button>
            <button className='flex-1 flex items-center justify-center gap-2 bg-[#5cb85c] text-white font-bold hover:bg-green-600 border-x border-white/20'>
               <Download className='w-5 h-5' /> Download Template
            </button>
            <button className='flex-1 flex items-center justify-center gap-2 bg-[#5172e4] text-white font-bold hover:bg-blue-600'>
               <Upload className='w-5 h-5' /> Upload
            </button>
         </div>

         {/* 5. Repeated Search Filter (As per Screenshot) */}
         <div className='bg-white p-5 border rounded-sm shadow-sm mb-10'>
            <div className='relative border p-6 rounded-sm'>
               <span className='absolute -top-3 left-4 bg-white px-2 font-semibold text-gray-500'>
                  Search Company By
               </span>
               <div className='grid grid-cols-2 gap-x-12 gap-y-6'>
                  <SearchableMultiSelect
                     label='Discipline'
                     placeholder='Music'
                     options={['Art & Craft', 'Dance']}
                  />
                  <Dropdown label='Level 3 Branch' value='POP' />
                  <Dropdown label='Level 2 Branch' value='Cotemporary' />
                  <div className='flex items-end justify-start gap-3'>
                     <button className='bg-gray-200 px-8 py-2 rounded'>
                        Cancle
                     </button>
                     <button className='bg-[#5cb85c] px-8 py-2 rounded text-white'>
                        Submit
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <TopicAccordion />

         {/* 6. Footer Bulk Action Buttons */}
         <div className='flex justify-center gap-16 mt-12 pb-10'>
            <button className='bg-[#5172e4] text-white px-20 py-3 rounded-md font-bold text-base shadow-lg hover:bg-blue-700'>
               Bulk Upload
            </button>
            <button className='bg-[#5172e4] text-white px-20 py-3 rounded-md font-bold text-base shadow-lg hover:bg-blue-700'>
               Bulk Download
            </button>
         </div>
      </div>
   );
};

// --- Helper Components ---

const SearchableMultiSelect = ({ label, placeholder, options }) => (
   <div className='space-y-1'>
      <label className='block text-gray-700 font-bold'>{label}</label>
      <div className='border rounded bg-white'>
         <div className='flex justify-between items-center p-2 border-b cursor-pointer'>
            <div className='flex items-center gap-2 text-gray-500 italic'>
               <Minus className='w-3 h-3 border' /> {placeholder}
            </div>
            <ChevronDown className='w-4 h-4 text-gray-400' />
         </div>
         <div className='p-2 space-y-2 max-h-40 overflow-y-auto'>
            <div className='relative mb-2'>
               <input
                  type='text'
                  placeholder='Type to Search'
                  className='w-full border p-1 text-xs outline-none'
               />
            </div>
            {options.map((opt, i) => (
               <label
                  key={i}
                  className='flex items-center gap-2 text-xs cursor-pointer hover:text-blue-600'>
                  <input type='checkbox' className='w-3 h-3' /> {opt}
               </label>
            ))}
         </div>
      </div>
   </div>
);

const Dropdown = ({ label, value }) => (
   <div className='space-y-1'>
      <label className='block text-gray-700 font-bold'>{label}</label>
      <div className='relative'>
         <select className='w-full border p-2 rounded bg-white appearance-none outline-none'>
            <option>{value}</option>
         </select>
         <ChevronDown className='absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none' />
      </div>
   </div>
);

export default BulkUploadManagement;
