/** @format */

import React from 'react';

export default function OrganizationViewPage() {
   return (
      <div className='min-h-screen bg-gray-100 p-6'>
         {/* Header */}
         <div className='mb-4 text-gray-400'>Organization view page</div>

         <div className='bg-white border shadow'>
            {/* Top bar */}
            <div className='flex items-center gap-3 p-4 border-b'>
               <button className='text-2xl'>☰</button>
               <img src='/logo.png' alt='logo' className='h-10' />
            </div>

            <div className='grid grid-cols-12 gap-4 p-4'>
               {/* LEFT PANEL */}
               <aside className='col-span-3 space-y-4'>
                  <Card title='Organization Logo'>
                     <img src='/logo.png' className='w-full mb-3' />
                     <FileRow />
                  </Card>

                  <Card title='Favicon'>
                     <img src='/logo.png' className='w-full mb-3' />
                     <FileRow />
                  </Card>

                  <Card title='Set Color Theme'>
                     <div className='grid grid-cols-3 gap-2'>
                        {[
                           '#53B700',
                           '#FF3F01',
                           '#0E97F2',
                           '#B715DE',
                           '#1854E3',
                           '#A0880B',
                           '#6A0B31',
                           '#FB8200',
                           '#1E92A4',
                        ].map((c) => (
                           <div
                              key={c}
                              className='h-8 rounded'
                              style={{ background: c }}
                           />
                        ))}
                     </div>
                  </Card>

                  <Card title='Google Drive Integration'>
                     <button className='w-full bg-blue-600 text-white py-2 rounded'>
                        Sign in with Google
                     </button>
                     <p className='text-xs mt-2'>Status: Disconnected</p>
                  </Card>

                  <Card title='Whatsapp Business API'>
                     <table className='w-full text-xs border'>
                        <thead className='bg-gray-200'>
                           <tr>
                              <th className='border px-1'>Business</th>
                              <th className='border px-1'>Mobile</th>
                              <th className='border px-1'>Status</th>
                              <th className='border px-1'>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td colSpan='4' className='text-center p-2'>
                                 No records found
                              </td>
                           </tr>
                        </tbody>
                     </table>
                     <button className='w-full mt-2 bg-blue-600 text-white py-2 rounded'>
                        Login with Facebook
                     </button>
                  </Card>

                  <Card title='Total Storage'>
                     <div className='text-center'>
                        <div className='text-sm'>1024 MB</div>
                        <div className='mx-auto my-3 h-24 w-24 rounded-full border-8 border-blue-600 flex items-center justify-center'>
                           20%
                        </div>
                        <div className='text-xs'>
                           0 MB Used | 1024 MB Remaining
                        </div>
                     </div>
                  </Card>
               </aside>

               {/* RIGHT CONTENT */}
               <main className='col-span-9'>
                  {/* Tabs */}
                  <div className='flex mb-4'>
                     <button className='px-6 py-2 border bg-blue-500 text-white'>
                        View
                     </button>
                     <button className='px-6 py-2 border bg-gray-100'>
                        Edit
                     </button>
                  </div>

                  <div className='border'>
                     <div className='bg-gray-200 px-4 py-2 font-semibold'>
                        Organization Details
                     </div>
                     <table className='w-full text-sm border-collapse'>
                        <tbody>
                           <Row
                              label='Organization Name'
                              value='Octavium Music Academy'
                           />
                           <Row
                              label='Institute Type'
                              value='Computer/Dance/Music Training Institute'
                           />
                           <Row
                              label='Office Address'
                              value='No. 227, 3rd Floor, Leela Square, Bangalore'
                           />
                           <Row
                              label='Whatsapp Mobile Number'
                              value='9448088573'
                           />
                           <Row
                              label='Office Landline Number'
                              value='08041210720'
                           />
                           <Row
                              label='Office Email Id'
                              value='erp@octavium.in'
                           />
                           <Row label='Own Domain/Sub Domain' value='N/A' />
                           <Row label='Account Validity' value='N/A' />
                           <Row label='Admission Plan' value='N/A' />
                           <Row label='Admissions Alloted' value='N/A' />
                           <Row label='Admissions Used' value='N/A' />
                           <Row
                              label='Available Admissions Balance'
                              value='N/A'
                           />
                           <Row
                              label='Inactive Session Lock Timing (In Minutes)'
                              value='60'
                           />
                           <Row
                              label='Enable Reporting (Through WhatsApp)'
                              value=''
                           />
                           <Row label='Created By' value='' />
                           <Row label='Create Date' value='' />
                           <Row label='Updated By' value='N/A' />
                           <Row label='Update Date' value='N/A' />
                        </tbody>
                     </table>
                  </div>
               </main>
            </div>
         </div>
      </div>
   );
}

function Card({ title, children }) {
   return (
      <div className='border bg-gray-50'>
         <div className='p-2 font-semibold border-b'>{title}</div>
         <div className='p-3'>{children}</div>
      </div>
   );
}

function FileRow() {
   return (
      <div className='flex'>
         <input
            className='border flex-1 px-2 py-1'
            placeholder='Select file...'
         />
         <button className='bg-green-600 text-white px-4'>Browse</button>
      </div>
   );
}

function Row({ label, value }) {
   return (
      <tr className='border-b'>
         <td className='border px-3 py-2 w-1/3 bg-gray-50'>{label}</td>
         <td className='border px-3 py-2'>{value}</td>
      </tr>
   );
}

// ================= Admin & Super Admin Page =================
export function AdminSuperAdminPage() {
   return (
      <div className='min-h-screen bg-gray-100 p-6'>
         <div className='mb-4 text-gray-400'>
            Admin and Super Admin page merge
         </div>

         <div className='bg-white border shadow'>
            {/* Header */}
            <div className='flex items-center gap-3 p-4 border-b'>
               <button className='text-2xl'>☰</button>
               <img src='/logo.png' alt='logo' className='h-10' />
            </div>

            <div className='p-4'>
               <h2 className='font-semibold text-lg mb-3'>
                  Admin and Super Admin
               </h2>

               <div className='border'>
                  <div className='bg-gray-200 px-4 py-2 font-semibold'>
                     Personal Details
                  </div>

                  <div className='grid grid-cols-12 gap-4 p-4 text-sm'>
                     {/* LEFT FORM */}
                     <div className='col-span-8 grid grid-cols-2 gap-4'>
                        <Select label='Employee Type' />
                        <Select label='Country' />
                        <Select label='Home Branch' />
                        <Select label='State' />
                        <Input label='Employee Name' />
                        <Input label='PAN' />

                        <div className='flex gap-2'>
                           <Input label='Employee Code' />
                           <button className='mt-6 border px-3'>⟳</button>
                        </div>
                        <Input label='UID' />

                        <Input label='Mobile No.' prefix='+91' />
                        <Input label='Bank Name' />

                        <Input label='Whatsapp Number' prefix='+91' />
                        <Input label='Bank A/C No.' />

                        <Input label='E-mail' />
                        <Input label='IFSC Code' />

                        <Input label='Address' className='col-span-2' />
                        <Input label='PF A/C No.' />

                        <DateInput label='Date Of Birth' />
                        <Input label='ESIC No.' />

                        <DateInput label='Date Of Joining' />
                        <Input label='Zoom Account ID' />

                        <Select label='Designation' add />
                        <Input label='Zoom Client ID' />

                        <Select label='Department' add />
                        <Input label='Zoom Client Secret' />

                        <Input label='Daily In Time' />
                        <div />

                        <Input label='Daily Out Time' />
                        <div />

                        <Select label='Weekly Off' />
                        <div />

                        <Select label='Employment Type' />
                        <div />

                        <Select label='Type' />
                        <div />

                        <div className='col-span-2'>
                           <label className='block mb-1'>Working Branch</label>
                           <div className='grid grid-cols-2 gap-2'>
                              <select className='border px-2 py-1'></select>
                              <select className='border px-2 py-1'></select>
                           </div>
                        </div>
                     </div>

                     {/* RIGHT PHOTO */}
                     <div className='col-span-4'>
                        <div className='border'>
                           <div className='bg-gray-200 px-4 py-2 font-semibold'>
                              Employee Photo
                           </div>
                           <div className='p-4 text-center'>
                              <div className='h-48 w-40 mx-auto bg-gray-200 flex items-center justify-center mb-4'>
                                 Employee Image
                              </div>
                              <div className='flex'>
                                 <input
                                    className='border flex-1 px-2 py-1'
                                    placeholder='Select file...'
                                 />
                                 <button className='bg-blue-600 text-white px-4'>
                                    Browse
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

function Input({ label, prefix, className }) {
   return (
      <div className={className}>
         <label className='block mb-1'>{label}</label>
         <div className='flex'>
            {prefix && (
               <span className='px-2 py-1 border bg-gray-100'>{prefix}</span>
            )}
            <input className='border flex-1 px-2 py-1' />
         </div>
      </div>
   );
}

function Select({ label, add }) {
   return (
      <div>
         <label className='block mb-1'>{label}</label>
         <div className='flex'>
            <select className='border flex-1 px-2 py-1'></select>
            {add && (
               <button className='ml-1 bg-blue-600 text-white px-3'>+</button>
            )}
         </div>
      </div>
   );
}

function DateInput({ label }) {
   return (
      <div>
         <label className='block mb-1'>{label}</label>
         <div className='flex'>
            <button className='border px-2 text-red-600'>✕</button>
            <input type='date' className='border flex-1 px-2 py-1' />
         </div>
      </div>
   );
}

// ================= Company List Page =================
export function CompanyListPage() {
   return (
      <div className='min-h-screen bg-gray-100 p-6'>
         <div className='mb-4 text-gray-400'>Company List</div>

         <div className='bg-white border shadow'>
            {/* Header */}
            <div className='flex items-center gap-3 p-4 border-b bg-gray-100'>
               <button className='text-2xl'>☰</button>
               <img src='/logo.png' alt='logo' className='h-10' />
            </div>

            <div className='p-4'>
               <h2 className='font-semibold text-lg mb-3'>Company</h2>

               {/* Branch */}
               <div className='mb-4'>
                  <label className='block text-sm mb-1'>Branch</label>
                  <select className='border px-3 py-2 w-96'>
                     <option>
                        Organization Level (No Branch/Company Selected)
                     </option>
                  </select>
               </div>

               {/* Search Panel */}
               <div className='border bg-gray-50 p-4 mb-4'>
                  <div className='font-semibold mb-3'>Search Company By</div>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                     <Input label='Company Id' />
                     <Select label='City' value='Bengaluru' />
                     <Input label='Organization Name' />
                     <Select label='State' value='Karnataka' />
                     <Select label='Institute type' value='Music Academy' />
                     <Input label='Office landline' value='+22 2252564' />
                     <Input
                        label='Office Address'
                        className='col-span-2'
                        value='No. 227, 3rd Floor, Leela Square, 3rd Main, 4th A Cross'
                     />
                     <Input
                        label='WhatsApp Mobile Number'
                        value='+22 2252564'
                     />
                  </div>
                  <div className='flex justify-end gap-2 mt-4'>
                     <button className='px-4 py-2 border'>Cancel</button>
                     <button className='px-4 py-2 bg-green-600 text-white'>
                        Submit
                     </button>
                  </div>
               </div>

               {/* Add New */}
               <div className='flex justify-end mb-2'>
                  <button className='bg-blue-100 px-4 py-2 text-sm border'>
                     Add New
                  </button>
               </div>

               {/* Table Controls */}
               <div className='flex items-center justify-between mb-2 text-sm'>
                  <div className='flex items-center gap-2'>
                     <select className='border px-2 py-1'>
                        <option>10</option>
                     </select>
                     <span>records per page</span>
                     <input
                        className='border px-2 py-1'
                        placeholder='Filter by Date Range'
                     />
                  </div>
                  <div className='flex gap-2'>
                     <input className='border px-2 py-1' placeholder='Search' />
                     <button className='bg-green-600 text-white px-3'>⟳</button>
                     <button className='bg-teal-600 text-white px-3'>⛃</button>
                  </div>
               </div>

               {/* Table */}
               <div className='overflow-auto border'>
                  <table className='w-full text-xs border-collapse'>
                     <thead className='bg-gray-200'>
                        <tr>
                           {[
                              'Company ID',
                              'Created Date',
                              'Organization Name',
                              'Institute Type',
                              'Active Admissions',
                              'Institute Type (Detailed)',
                              'City',
                              'State',
                              'Office Address',
                              'Whatsapp Mobile Number',
                              'Office Landline Number',
                              'Office Email Id',
                           ].map((h) => (
                              <th
                                 key={h}
                                 className='border px-2 py-1 text-left'>
                                 {h}
                              </th>
                           ))}
                        </tr>
                     </thead>
                     <tbody>
                        {Array.from({ length: 10 }).map((_, i) => (
                           <tr key={i} className='odd:bg-white even:bg-gray-50'>
                              <td className='border px-2 py-1'>1234</td>
                              <td className='border px-2 py-1'>12/08/2025</td>
                              <td className='border px-2 py-1'>
                                 Octavium Music Academy
                              </td>
                              <td className='border px-2 py-1'>
                                 Music Academy
                              </td>
                              <td className='border px-2 py-1'>35</td>
                              <td className='border px-2 py-1'>
                                 Computer/Dance/Music Training Institute
                              </td>
                              <td className='border px-2 py-1'>Bangalore</td>
                              <td className='border px-2 py-1'>Karnataka</td>
                              <td className='border px-2 py-1'>
                                 No. 227, 3rd Floor, Leela Square
                              </td>
                              <td className='border px-2 py-1'>9448088573</td>
                              <td className='border px-2 py-1'>08041210720</td>
                              <td className='border px-2 py-1'>
                                 erp@octavium.in
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* Pagination */}
               <div className='flex justify-between items-center mt-2 text-xs'>
                  <div>Showing 1 to 10 of 661 entries</div>
                  <div className='flex gap-1'>
                     {[1, 2, 3, 4, 5].map((p) => (
                        <button
                           key={p}
                           className={`px-2 py-1 border ${
                              p === 1 ? 'bg-green-600 text-white' : ''
                           }`}>
                           {p}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
