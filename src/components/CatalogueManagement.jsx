/** @format */

import React from 'react';

const CatalogueManagement = () => {
   return (
      <div className='min-h-screen bg-gray-100'>
         {/* Header */}
         <header className='flex items-center gap-4 px-6 py-4 bg-gray-200'>
            <div className='w-10 h-10 bg-black rounded' />
            <h1 className='text-xl font-semibold'>Catalogue Management</h1>
         </header>

         <div className='p-6 space-y-6'>
            {/* Branch */}
            <div>
               <label className='block mb-1 text-sm font-medium'>Branch</label>
               <select className='w-full p-2 border rounded'>
                  <option>
                     Organization Level (No Branch/Company Selected)
                  </option>
               </select>
            </div>

            {/* Search Company By – Block 1 */}
            <div className='p-4 bg-white border rounded'>
               <h2 className='mb-4 font-semibold'>Search Company By</h2>

               <div className='grid gap-4 md:grid-cols-2'>
                  {/* Discipline */}
                  <div>
                     <label className='block mb-1 text-sm'>Discipline</label>
                     <select className='w-full p-2 border rounded'>
                        <option>Music</option>
                        <option>Art & Craft</option>
                        <option>Dance</option>
                     </select>
                  </div>

                  {/* Level 3 */}
                  <div>
                     <label className='block mb-1 text-sm'>
                        Level 3 Branch
                     </label>
                     <select className='w-full p-2 border rounded'>
                        <option>POP</option>
                     </select>
                  </div>

                  {/* Level 4 */}
                  <div>
                     <label className='block mb-1 text-sm'>
                        Level 4 Branch
                     </label>
                     <select className='w-full p-2 border rounded'>
                        <option>Drums</option>
                     </select>
                  </div>
               </div>

               <div className='flex justify-end gap-3 mt-4'>
                  <button className='px-4 py-2 text-sm bg-gray-300 rounded'>
                     Cancel
                  </button>
                  <button className='px-4 py-2 text-sm text-white bg-green-600 rounded'>
                     Submit
                  </button>
               </div>
            </div>

            {/* Search Company By – Block 2 */}
            <div className='p-4 bg-white border rounded'>
               <h2 className='mb-4 font-semibold'>Search Company By</h2>

               <div className='grid gap-4 md:grid-cols-2'>
                  <div>
                     <label className='block mb-1 text-sm'>Discipline</label>
                     <select className='w-full p-2 border rounded'>
                        <option>Music</option>
                     </select>
                  </div>

                  <div>
                     <label className='block mb-1 text-sm'>
                        Level 3 Branch
                     </label>
                     <div className='p-2 border rounded'>
                        <label className='flex items-center gap-2'>
                           <input type='checkbox' defaultChecked />
                           POP
                        </label>
                        <label className='flex items-center gap-2'>
                           <input type='checkbox' defaultChecked />
                           Rock
                        </label>
                        <label className='flex items-center gap-2'>
                           <input type='checkbox' defaultChecked />
                           Jazz
                        </label>
                        <label className='flex items-center gap-2'>
                           <input type='checkbox' defaultChecked />
                           Vocal
                        </label>
                     </div>
                  </div>

                  <div>
                     <label className='block mb-1 text-sm'>
                        Level 1 Branch
                     </label>
                     <select className='w-full p-2 border rounded'>
                        <option>Western</option>
                     </select>
                  </div>

                  <div>
                     <label className='block mb-1 text-sm'>
                        Level 2 Branch
                     </label>
                     <select className='w-full p-2 border rounded'>
                        <option>Contemporary</option>
                     </select>
                  </div>
               </div>

               <div className='flex justify-end gap-3 mt-4'>
                  <button className='px-4 py-2 text-sm bg-gray-300 rounded'>
                     Cancel
                  </button>
                  <button className='px-4 py-2 text-sm text-white bg-green-600 rounded'>
                     Submit
                  </button>
               </div>
            </div>

            {/* Upload / Download */}
            <div className='grid gap-4 md:grid-cols-2'>
               <div className='flex gap-2'>
                  <button className='flex-1 py-3 font-semibold text-white bg-black rounded'>
                     Upload Catalogue
                  </button>
                  <button className='flex-1 py-3 font-semibold text-white bg-green-600 rounded'>
                     Download Template
                  </button>
                  <button className='flex-1 py-3 font-semibold text-white bg-blue-600 rounded'>
                     Upload
                  </button>
               </div>

               <button className='py-3 font-semibold text-white bg-blue-600 rounded'>
                  Download Catalogue
               </button>
            </div>

            {/* Topics Table */}
            <div className='bg-white border rounded'>
               <table className='w-full text-sm border-collapse'>
                  <thead>
                     <tr className='bg-gray-200'>
                        <th className='p-2 border'>TOPICS</th>
                        <th className='p-2 border'>UNITS</th>
                     </tr>
                  </thead>

                  <tbody>
                     {/* Topic 1 */}
                     <tr>
                        <td className='p-2 font-semibold border'>TOPIC 1</td>
                        <td className='p-2 border'>Aural</td>
                     </tr>

                     <tr>
                        <td colSpan='2' className='p-4 border'>
                           <textarea
                              className='w-full h-32 p-2 border rounded'
                              placeholder='Course Content'
                           />

                           <div className='mt-3 space-y-2'>
                              <div className='flex justify-between p-2 border rounded'>
                                 <span>Image 1.jpg (500kb)</span>
                                 <span className='text-red-500 cursor-pointer'>
                                    ✕
                                 </span>
                              </div>

                              <div className='flex justify-between p-2 border rounded'>
                                 <span>Image 2.jpg (410kb)</span>
                                 <span className='text-red-500 cursor-pointer'>
                                    ✕
                                 </span>
                              </div>
                           </div>

                           <div className='flex items-center justify-between mt-4'>
                              <div>
                                 <label className='block mb-1 text-sm'>
                                    Class Cost
                                 </label>
                                 <input
                                    className='p-2 border rounded'
                                    value='₹ 10000.00'
                                    readOnly
                                 />
                              </div>

                              <button className='px-4 py-2 text-white bg-blue-600 rounded'>
                                 Edit
                              </button>
                           </div>
                        </td>
                     </tr>

                     {/* Topic 2 */}
                     <tr>
                        <td className='p-2 font-semibold border'>TOPIC 2</td>
                        <td className='p-2 border'>Songs</td>
                     </tr>

                     {/* Topic 3 */}
                     <tr>
                        <td className='p-2 font-semibold border'>TOPIC 3</td>
                        <td className='p-2 border'>Technical Pieces</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default CatalogueManagement;
