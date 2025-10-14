/** @format */

import React from 'react';

export default function StudentInfoForm() {
   return (
      <div className='min-h-screen bg-gray-100'>
         {/* Top nav and logo */}
         <div className='flex items-center bg-white h-16 px-4 border-b'>
            <button className='mr-3'>
               <svg
                  width={24}
                  height={24}
                  fill='currentColor'
                  className='text-gray-700'>
                  <rect width='20' height='3' x='2' y='5' rx='1' />
                  <rect width='20' height='3' x='2' y='10.5' rx='1' />
                  <rect width='20' height='3' x='2' y='16' rx='1' />
               </svg>
            </button>
            <img
               src='https://i.ibb.co/Zc7p64r/octavium-logo.png'
               alt='Logo'
               className='h-10'
            />
         </div>
         <div className='py-2 px-6 text-xl font-semibold'>Student Info</div>

         {/* Radio Selector */}
         <div className='flex gap-7 pl-7 text-[15px] font-medium'>
            <label className='flex items-center gap-1'>
               <input
                  type='radio'
                  name='fillingFor'
                  defaultChecked
                  className='accent-blue-600'
               />
               Filling Up for Student
            </label>
            <label className='flex items-center gap-1'>
               <input
                  type='radio'
                  name='fillingFor'
                  className='accent-blue-600'
               />
               Filling Up for Parent
            </label>
         </div>

         <div className='flex gap-4 px-6 pt-3 pb-4'>
            {/* LEFT COLUMN */}
            <div className='w-7/12 flex flex-col gap-4'>
               {/* Student Details */}
               <div className='bg-gray-50 border rounded'>
                  <div className='bg-gray-200 px-4 py-2 font-semibold text-base border-b'>
                     Student Details
                  </div>
                  <div className='grid grid-cols-2 gap-4 px-4 py-4'>
                     <div className='space-y-2'>
                        <label className='block text-xs font-medium'>
                           First Name
                        </label>
                        <input className='border rounded px-2 py-1 w-full' />
                        <label className='block text-xs font-medium mt-2'>
                           DOB
                        </label>
                        <div className='flex gap-2'>
                           <input
                              className='border rounded px-2 py-1 w-24'
                              value='Today'
                              readOnly
                           />
                           {/* Calendar mockup */}
                           <div className='bg-white border rounded shadow text-xs w-56 p-2'>
                              <div className='flex justify-between mb-2 font-semibold'>
                                 <span>September 2021</span>
                                 <span className='text-blue-700 cursor-pointer'>
                                    &#128197;
                                 </span>
                              </div>
                              <div className='grid grid-cols-7 text-center text-gray-500 mb-1'>
                                 <span>SAN</span>
                                 <span>MON</span>
                                 <span>TUE</span>
                                 <span>WED</span>
                                 <span>THU</span>
                                 <span>FRI</span>
                                 <span>SAT</span>
                              </div>
                              <div className='grid grid-cols-7 gap-1 text-center'>
                                 {[...Array(30)].map((_, i) => (
                                    <span
                                       key={i}
                                       className={`px-2 py-1 rounded ${
                                          i === 18
                                             ? 'bg-blue-600 text-white'
                                             : ''
                                       }`}>
                                       {i + 1}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className='mt-3 flex gap-7 items-center'>
                           <label className='text-xs font-medium'>Gender</label>
                           <div className='flex items-center space-x-4'>
                              <label className='flex items-center gap-1'>
                                 <input
                                    type='radio'
                                    name='gender'
                                    defaultChecked
                                    className='accent-blue-600'
                                 />{' '}
                                 Male
                              </label>
                              <label className='flex items-center gap-1'>
                                 <input
                                    type='radio'
                                    name='gender'
                                    className='accent-blue-600'
                                 />{' '}
                                 Female
                              </label>
                              <label className='flex items-center gap-1'>
                                 <input
                                    type='radio'
                                    name='gender'
                                    className='accent-blue-600'
                                 />{' '}
                                 Others
                              </label>
                           </div>
                        </div>
                        <div className='mt-2'>
                           <label className='block text-xs font-medium'>
                              Stream
                           </label>
                           <input className='border rounded px-2 py-1 w-full' />
                        </div>
                        <div className='mt-2'>
                           <label className='block text-xs font-medium'>
                              Mother Tongue
                           </label>
                           <input className='border rounded px-2 py-1 w-full' />
                        </div>
                     </div>
                     <div className='space-y-2 flex flex-col justify-between'>
                        <div>
                           <label className='block text-xs font-medium mb-1'>
                              Last Name
                           </label>
                           <input className='border rounded px-2 py-1 w-full' />
                        </div>
                        <div>
                           <label className='block text-xs font-medium mb-1'>
                              Capture Photo
                           </label>
                           <div className='flex gap-2'>
                              <div className='border w-24 h-20 rounded flex flex-col items-center justify-center text-gray-500 text-xs'>
                                 Capture Image
                              </div>
                              <div className='border w-24 h-20 rounded flex flex-col items-center justify-center text-gray-500 text-xs'>
                                 Preview
                              </div>
                           </div>
                           <div className='flex gap-2 mt-2'>
                              <button className='bg-blue-700 text-white py-1 px-3 rounded text-xs'>
                                 Webcam
                              </button>
                              <button className='bg-gray-200 text-black py-1 px-3 rounded text-xs'>
                                 Select file
                              </button>
                              <button className='bg-blue-400 text-white py-1 px-3 rounded text-xs'>
                                 Browse local
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Student Address */}
               <div className='bg-gray-50 border rounded'>
                  <div className='bg-gray-200 px-4 py-2 font-semibold text-base border-b'>
                     Student Address
                  </div>
                  <div className='px-4 py-4 space-y-2'>
                     <div className='flex gap-2 mb-1'>
                        <div className='w-1/2'>
                           <label className='block text-xs font-medium'>
                              Address line 1
                           </label>
                           <input className='border rounded px-2 py-1 w-full' />
                        </div>
                        <div className='w-1/2'>
                           <label className='block text-xs font-medium'>
                              Address line 2
                           </label>
                           <input className='border rounded px-2 py-1 w-full' />
                        </div>
                     </div>
                     <div className='flex gap-2 items-end'>
                        <div className='w-1/4'>
                           <label className='block text-xs font-medium'>
                              Zipcode
                           </label>
                           <input className='border rounded px-2 py-1 w-full' />
                        </div>
                        <div className='w-1/4'>
                           <label className='block text-xs font-medium'>
                              City
                           </label>
                           <input className='border rounded px-2 py-1 w-full' />
                        </div>
                        <div className='w-1/4'>
                           <label className='block text-xs font-medium'>
                              State
                           </label>
                           <input className='border rounded px-2 py-1 w-full' />
                        </div>
                        <div className='w-1/4'>
                           <label className='block text-xs font-medium'>
                              Country
                           </label>
                           <input
                              className='border rounded px-2 py-1 w-full'
                              value='India'
                              readOnly
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className='w-5/12 flex flex-col gap-4'>
               {/* Student Contact Details */}
               <div className='bg-gray-50 border rounded'>
                  <div className='bg-gray-200 px-4 py-2 font-semibold text-base border-b'>
                     Student Contact Details
                  </div>
                  <div className='px-4 py-4 space-y-2'>
                     <div className='flex gap-2 items-center'>
                        <div className='w-1/2'>
                           <label className='block text-xs font-medium'>
                              Mobile No.
                           </label>
                           <input className='border rounded px-2 py-1 w-full' />
                        </div>
                        <label className='flex items-center gap-1 text-xs mt-5'>
                           <input
                              type='checkbox'
                              className='accent-blue-600'
                              defaultChecked
                           />
                           SMS Opt Out
                        </label>
                     </div>
                     <div className='flex gap-2 items-center'>
                        <div className='w-1/2'>
                           <label className='block text-xs font-medium'>
                              Email Id
                           </label>
                           <input className='border rounded px-2 py-1 w-full' />
                        </div>
                        <label className='flex items-center gap-1 text-xs mt-5'>
                           <input
                              type='checkbox'
                              className='accent-blue-600'
                              defaultChecked
                           />
                           Unsubscribe email
                        </label>
                     </div>
                  </div>
               </div>
               {/* Adding Parent */}
               <div className='bg-gray-50 border rounded'>
                  <div className='bg-gray-200 px-4 py-2 font-semibold text-base border-b'>
                     Adding Parent
                  </div>
                  <div className='px-4 py-3 flex justify-end'>
                     <button className='bg-blue-600 text-white px-6 py-2 rounded'>
                        Add Parent
                     </button>
                  </div>
               </div>
               {/* Student Enquiry Details */}
               <div className='bg-gray-50 border rounded'>
                  <div className='bg-gray-200 px-4 py-2 font-semibold text-base border-b'>
                     Student Enquiry Details
                  </div>
                  <div className='px-4 py-4 grid grid-cols-2 gap-2'>
                     <div>
                        <label className='block text-xs font-medium'>
                           Walkin Date
                        </label>
                        <input
                           type='date'
                           className='border rounded px-2 py-1 w-full'
                        />
                     </div>
                     <div>
                        <label className='block text-xs font-medium'>
                           Time
                        </label>
                        <input
                           className='border rounded px-2 py-1 w-full'
                           value='11:33:23 AM'
                           readOnly
                        />
                     </div>
                     <div>
                        <label className='block text-xs font-medium'>
                           Enquiry received by
                        </label>
                        <select className='border rounded px-2 py-1 w-full'>
                           <option></option>
                        </select>
                     </div>
                     <div>
                        <label className='block text-xs font-medium'>
                           Instrument of Interest
                        </label>
                        <select className='border rounded px-2 py-1 w-full'>
                           <option></option>
                        </select>
                     </div>
                     <div className='col-span-2'>
                        <label className='block text-xs font-medium'>
                           Select Course
                        </label>
                        <select className='border rounded px-2 py-1 w-full'>
                           <option>Course 1</option>
                           <option>Course 2</option>
                           <option>Course 3</option>
                        </select>
                     </div>
                     <div>
                        <label className='block text-xs font-medium'>
                           Lead Source
                        </label>
                        <select className='border rounded px-2 py-1 w-full'>
                           <option></option>
                        </select>
                     </div>
                     <div>
                        <label className='block text-xs font-medium'>
                           Lead Type
                        </label>
                        <select className='border rounded px-2 py-1 w-full'>
                           <option></option>
                        </select>
                     </div>
                     <div className='col-span-2'>
                        <label className='block text-xs font-medium'>
                           Remark
                        </label>
                        <input className='border rounded px-2 py-1 w-full' />
                     </div>
                     <div>
                        <label className='block text-xs font-medium'>
                           Is follow up needed
                        </label>
                        <div className='flex gap-3 mt-1'>
                           <label className='inline-flex items-center'>
                              <input
                                 name='followup'
                                 type='radio'
                                 defaultChecked
                                 className='accent-blue-600'
                              />
                              <span className='ml-1 text-xs'>Yes</span>
                           </label>
                           <label className='inline-flex items-center'>
                              <input
                                 name='followup'
                                 type='radio'
                                 className='accent-blue-600'
                              />
                              <span className='ml-1 text-xs'>No</span>
                           </label>
                        </div>
                     </div>
                     <div>
                        <label className='block text-xs font-medium'>
                           Follow Up Date
                        </label>
                        <input
                           type='date'
                           className='border rounded px-2 py-1 w-full'
                        />
                        <label className='block text-xs font-medium mt-2'>
                           Follow Up Time
                        </label>
                        <input
                           className='border rounded px-2 py-1 w-full'
                           value='11:33:23 AM'
                           readOnly
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* Bottom bar */}
         <div className='w-full flex justify-end px-10 py-4 bg-white border-t gap-3'>
            <button className='bg-gray-300 text-black px-7 py-2 rounded font-semibold'>
               Cancel
            </button>
            <button className='bg-blue-700 text-white px-7 py-2 rounded font-semibold'>
               Submit
            </button>
         </div>
      </div>
   );
}
