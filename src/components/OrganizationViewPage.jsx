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
