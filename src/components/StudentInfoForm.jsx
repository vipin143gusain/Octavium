/** @format */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ParentInfoForm from './ParentInfoForm';

export default function StudentInfoForm() {
   const { hashId } = useParams();
   const [student, setStudent] = useState(null);
   const [loading, setLoading] = useState(true);

   const [fillingFor, setFillingFor] = useState('student');

   const navigate = useNavigate();

   useEffect(() => {
      if (hashId) {
         fetch(`http://localhost:8000/api/users/${hashId}`, {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
         })
            .then((res) => res.json())
            .then((data) => {
               setStudent(data);
               setLoading(false);
            })
            .catch((err) => {
               console.error('Error fetching user data:', err);
               setLoading(false);
            });
      }
   }, [hashId]);

   if (loading) return <div className='p-10 text-gray-500'>Loading...</div>;
   if (!student)
      return <div className='p-10 text-red-500'>User not found.</div>;

   return (
      <div className='min-h-screen bg-gray-100 w-full'>
         <button
            className='bg-gray-300 text-black px-7 py-2 rounded font-semibold'
            onClick={() => navigate(-1)}>
            Back
         </button>

         <div className='py-2 px-6 text-xl font-semibold'>Student Info</div>

         {/* Radio Selector */}
         <div className='flex gap-7 pl-7 text-[15px] font-medium'>
            <label className='flex items-center gap-1'>
               <input
                  type='radio'
                  name='fillingFor'
                  value='student'
                  checked={fillingFor === 'student'}
                  onChange={(e) => setFillingFor(e.target.value)}
                  className='accent-blue-600'
               />
               Filling Up for Student
            </label>

            <label className='flex items-center gap-1'>
               <input
                  type='radio'
                  name='fillingFor'
                  value='parent'
                  checked={fillingFor === 'parent'}
                  onChange={(e) => setFillingFor(e.target.value)}
                  className='accent-blue-600'
               />
               Filling Up for Parent
            </label>
         </div>

         {fillingFor === 'student' && (
            <>
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
                              <input
                                 className='border rounded px-2 py-1 w-full'
                                 value={student.first_name || ''}
                                 onChange={(e) =>
                                    setStudent({
                                       ...student,
                                       first_name: e.target.value,
                                    })
                                 }
                              />
                              <label className='block text-xs font-medium mt-2'>
                                 DOB
                              </label>
                              <div className='flex gap-2'>
                                 <div>
                                    <input
                                       className='input w-44'
                                       type='date'
                                       name='dob'
                                       value={student.dob || ''}
                                       onChange={(e) =>
                                          setStudent({
                                             ...student,
                                             dob: e.target.value,
                                          })
                                       }
                                    />
                                 </div>
                              </div>
                              <div className='mt-3 flex gap-7 items-center'>
                                 <label className='text-xs font-medium'>
                                    Gender
                                 </label>
                                 <div className='flex items-center space-x-4'>
                                    <label className='flex items-center gap-1'>
                                       <input
                                          type='radio'
                                          name='gender'
                                          value='male'
                                          checked={student.gender === 'male'}
                                          onChange={(e) =>
                                             setStudent((prev) => ({
                                                ...prev,
                                                gender: e.target.value,
                                             }))
                                          }
                                          className='accent-blue-600'
                                       />
                                       Male
                                    </label>

                                    <label className='flex items-center gap-1'>
                                       <input
                                          type='radio'
                                          name='gender'
                                          value='female'
                                          checked={student.gender === 'female'}
                                          onChange={(e) =>
                                             setStudent((prev) => ({
                                                ...prev,
                                                gender: e.target.value,
                                             }))
                                          }
                                          className='accent-blue-600'
                                       />
                                       Female
                                    </label>

                                    <label className='flex items-center gap-1'>
                                       <input
                                          type='radio'
                                          name='gender'
                                          value='others'
                                          checked={student.gender === 'others'}
                                          onChange={(e) =>
                                             setStudent((prev) => ({
                                                ...prev,
                                                gender: e.target.value,
                                             }))
                                          }
                                          className='accent-blue-600'
                                       />
                                       Others
                                    </label>
                                 </div>
                              </div>

                              <div className='mt-2'>
                                 <label className='block text-xs font-medium'>
                                    Stream
                                 </label>
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.stream || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          stream: e.target.value,
                                       })
                                    }
                                 />
                              </div>
                              <div className='mt-2'>
                                 <label className='block text-xs font-medium'>
                                    Mother Tongue
                                 </label>
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.mother_tongue || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          mother_tongue: e.target.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div className='space-y-2 flex flex-col justify-between'>
                              <div>
                                 <label className='block text-xs font-medium mb-1'>
                                    Last Name
                                 </label>
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.last_name || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          last_name: e.target.value,
                                       })
                                    }
                                 />
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
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={
                                       student.addresses &&
                                       student.addresses.length > 0
                                          ? student.addresses[0].line_1
                                          : ''
                                    }
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: e.target.value,
                                       })
                                    }
                                 />
                              </div>
                              <div className='w-1/2'>
                                 <label className='block text-xs font-medium'>
                                    Address line 2
                                 </label>
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={
                                       student.addresses &&
                                       student.addresses.length > 0
                                          ? student.addresses[0].line_2
                                          : ''
                                    }
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: e.target.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div className='flex gap-2 items-end'>
                              <div className='w-1/4'>
                                 <label className='block text-xs font-medium'>
                                    Zipcode
                                 </label>
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.addresses?.[0]?.zip || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: e.target.value,
                                       })
                                    }
                                 />
                              </div>
                              <div className='w-1/4'>
                                 <label className='block text-xs font-medium'>
                                    City
                                 </label>
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={
                                       student.addresses &&
                                       student.addresses.length > 0
                                          ? student.addresses[0].city
                                          : ''
                                    }
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: e.target.value,
                                       })
                                    }
                                 />
                              </div>
                              <div className='w-1/4'>
                                 <label className='block text-xs font-medium'>
                                    State
                                 </label>
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={
                                       student.addresses &&
                                       student.addresses.length > 0
                                          ? student.addresses[0].state
                                          : ''
                                    }
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: e.target.value,
                                       })
                                    }
                                 />
                              </div>
                              <div className='w-1/4'>
                                 <label className='block text-xs font-medium'>
                                    Country
                                 </label>
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={
                                       student.addresses &&
                                       student.addresses.length > 0
                                          ? student.addresses[0].country
                                          : ''
                                    }
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: e.target.value,
                                       })
                                    }
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
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.mobile_number || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          mobile_number: e.target.value,
                                       })
                                    }
                                 />
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
                                 <input
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.email_id || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          email_id: e.target.value,
                                       })
                                    }
                                 />
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
                                 value={
                                    student.enquiries?.[0]?.walkin_date
                                       ? student.enquiries[0].walkin_date.split(
                                            ' '
                                         )[0] // ✅ Take only the date part
                                       : ''
                                 }
                                 onChange={(e) => {
                                    const newDate = e.target.value; // e.g. "2025-10-18"
                                    setStudent((prev) => ({
                                       ...prev,
                                       enquiries: [
                                          {
                                             ...prev.enquiries?.[0],
                                             walkin_date: `${newDate} 00:00:00`, // ✅ Add time if needed for API
                                          },
                                       ],
                                    }));
                                 }}
                              />
                           </div>
                           <div>
                              <label className='block text-xs font-medium'>
                                 Time
                              </label>
                              <input
                                 type='time'
                                 className='border rounded px-2 py-1 w-full'
                                 value={
                                    student.enquiries?.[0]?.walkin_date
                                       ? student.enquiries[0].walkin_date
                                            .split(' ')[1]
                                            ?.slice(0, 5) // "10:00"
                                       : ''
                                 }
                                 onChange={(e) => {
                                    const newTime = e.target.value; // e.g. "14:30"
                                    setStudent((prev) => {
                                       const datePart =
                                          prev.enquiries?.[0]?.walkin_date?.split(
                                             ' '
                                          )[0] || '2025-01-01';
                                       return {
                                          ...prev,
                                          enquiries: [
                                             {
                                                ...prev.enquiries?.[0],
                                                walkin_date: `${datePart} ${newTime}:00`, // combine date + new time
                                             },
                                          ],
                                       };
                                    });
                                 }}
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
                                 <option
                                    value={
                                       student.enquiries?.[0]?.instruments || ''
                                    }
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          instruments: e.target.value,
                                       })
                                    }>
                                    {student.enquiries?.[0]?.instruments || ''}
                                 </option>
                              </select>
                           </div>
                           <div className='col-span-2'>
                              <label className='block text-xs font-medium'>
                                 Select Course
                              </label>
                              <select className='border rounded px-2 py-1 w-full'>
                                 <option
                                    value={student.enquiries?.[0]?.cource || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          cource: e.target.value,
                                       })
                                    }>
                                    {student.enquiries?.[0]?.cource || ''}
                                 </option>

                                 <option>Course 2</option>
                                 <option>Course 3</option>
                              </select>
                           </div>
                           <div>
                              <label className='block text-xs font-medium'>
                                 Lead Source
                              </label>
                              <select className='border rounded px-2 py-1 w-full'>
                                 <option
                                    value={student.enquiries?.[0]?.source || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          source: e.target.value,
                                       })
                                    }>
                                    {student.enquiries?.[0]?.source || ''}
                                 </option>
                              </select>
                           </div>
                           <div>
                              <label className='block text-xs font-medium'>
                                 Lead Type
                              </label>
                              <select className='border rounded px-2 py-1 w-full'>
                                 <option
                                    value={student.enquiries?.[0]?.type || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          type: e.target.value,
                                       })
                                    }>
                                    {student.enquiries?.[0]?.type || ''}
                                 </option>
                              </select>
                           </div>
                           <div className='col-span-2'>
                              <label className='block text-xs font-medium'>
                                 Remark
                              </label>
                              <input
                                 className='border rounded px-2 py-1 w-full'
                                 value={student.enquiries?.[0]?.remarks || ''}
                                 onChange={(e) =>
                                    setStudent({
                                       ...student,
                                       remarks: e.target.value,
                                    })
                                 }
                              />
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
                                 value={
                                    student.enquiries?.[0]?.follow_date
                                       ? student.enquiries[0].follow_date.split(
                                            ' '
                                         )[0] // ✅ Take only the date part
                                       : ''
                                 }
                                 onChange={(e) => {
                                    const newDate = e.target.value; // e.g. "2025-10-18"
                                    setStudent((prev) => ({
                                       ...prev,
                                       enquiries: [
                                          {
                                             ...prev.enquiries?.[0],
                                             follow_date: `${newDate} 00:00:00`, // ✅ Add time if needed for API
                                          },
                                       ],
                                    }));
                                 }}
                              />
                              <label className='block text-xs font-medium mt-2'>
                                 Follow Up Time
                              </label>
                              <input
                                 className='border rounded px-2 py-1 w-full'
                                 value={
                                    student.enquiries?.[0]?.walkin_date
                                       ? student.enquiries[0].walkin_date
                                            .split(' ')[1]
                                            ?.slice(0, 5) // "10:00"
                                       : ''
                                 }
                                 onChange={(e) => {
                                    const newTime = e.target.value; // e.g. "14:30"
                                    setStudent((prev) => {
                                       const datePart =
                                          prev.enquiries?.[0]?.walkin_date?.split(
                                             ' '
                                          )[0] || '2025-01-01';
                                       return {
                                          ...prev,
                                          enquiries: [
                                             {
                                                ...prev.enquiries?.[0],
                                                walkin_date: `${datePart} ${newTime}:00`, // combine date + new time
                                             },
                                          ],
                                       };
                                    });
                                 }}
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
            </>
         )}

         {fillingFor === 'parent' && (
            <>
               <ParentInfoForm />
            </>
         )}
      </div>
   );
}
