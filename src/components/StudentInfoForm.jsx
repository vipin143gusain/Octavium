/** @format */

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ParentInfoForm from './ParentInfoForm';

const EMPTY_STUDENT = {
   type: 'student',
   first_name: '',
   last_name: '',
   email_id: '',
   mobile_number: '',
   gender: '',
   dob: '',
   stream: '',
   mother_tongue: '',
   addresses: {
      line_1: '',
      line_2: '',
      line_3: '',
      city: '',
      state: '',
      country: '',
      zip: '',
   },
   enquiries: {
      walkin_date: '',
      type: '',
      instruments: '',
      cource: '',
      source: '',
      remarks: '',
      is_follow: null,
      follow_date: '',
   },
};

function normalizeServerData(data = {}) {
   const addressesObj =
      Array.isArray(data.addresses) && data.addresses.length > 0
         ? data.addresses[0]
         : {};
   const enquiriesObj =
      Array.isArray(data.enquiries) && data.enquiries.length > 0
         ? data.enquiries[0]
         : {};

   return {
      ...EMPTY_STUDENT,
      ...data,
      addresses: { ...EMPTY_STUDENT.addresses, ...addressesObj },
      enquiries: { ...EMPTY_STUDENT.enquiries, ...enquiriesObj },
   };
}

export default function StudentInfoForm() {
   const { hashId } = useParams();
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);
   const [submitting, setSubmitting] = useState(false);

   // ✅ Mode detection
   const isCreateMode = !hashId;
   const isViewMode = !!hashId; // view mode when hashId is present
   const isReadOnly = isViewMode; // just for readability

   // after isCreateMode / isViewMode declarations
   const [isEditable, setIsEditable] = useState(isCreateMode);
   // - when creating, keep editable by default
   // - when editing (hashId present) isEditable starts false (read-only view)

   const [fillingFor, setFillingFor] = useState('student');

   const [student, setStudent] = useState(EMPTY_STUDENT);

   // ✅ Validation logic
   const isAddressPartiallyFilled = Object.values(student.addresses || {}).some(
      (v) => v?.trim?.() !== ''
   );

   const addr = student.addresses || {};
   const isAddressFullyFilled =
      addr.line_1?.toString().trim() &&
      /* line_2 is optional */
      addr.city?.toString().trim() &&
      addr.state?.toString().trim() &&
      addr.country?.toString().trim() &&
      addr.zip?.toString().trim();

   const isMandatoryFieldsFilled =
      student.first_name?.toString().trim() &&
      student.last_name?.toString().trim() &&
      student.mobile_number?.toString().trim() &&
      student.email_id?.toString().trim();

   // ✅ Final flag for enabling Create Student button
   const canCreateStudent =
      isMandatoryFieldsFilled &&
      (!isAddressPartiallyFilled || isAddressFullyFilled);

   // ✅ Determine if we are in create mode or view/edit

   useEffect(() => {
      if (!isCreateMode) {
         setLoading(true);

         fetch(`http://localhost:8000/api/users/${hashId}`, {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
         })
            .then((res) => {
               if (!res.ok) throw new Error('Failed to fetch');
               return res.json();
            })
            .then((data) => {
               const normalized = normalizeServerData(data);

               setStudent(normalized);

               // ✅ AUTO SWITCH FORM BASED ON DATA
               setFillingFor(data.type === 'parent' ? 'parent' : 'student');

               setIsEditable(false); // view mode
            })
            .catch((err) => {
               console.error('Error fetching user data:', err);
            })
            .finally(() => setLoading(false));
      }
   }, [hashId, isCreateMode]);

   const buildPayload = useCallback(() => {
      // Always include required fields (trimmed)
      const payload = {
         type: 'student',
         first_name: (student.first_name || '').toString().trim(),
         last_name: (student.last_name || '').toString().trim(),
         email_id: (student.email_id || '').toString().trim(),
         mobile_number: (student.mobile_number || '').toString().trim(),
      };

      // optional simple fields (only add if non-empty)
      ['gender', 'dob', 'stream', 'mother_tongue'].forEach((k) => {
         if (student[k] && student[k].toString().trim() !== '') {
            payload[k] = student[k];
         }
      });

      // address: add only if any address field filled
      const addrObj = student.addresses || {};
      const isAddrFilled = Object.values(addrObj).some(
         (v) => v && v.toString().trim() !== ''
      );
      if (isAddrFilled) {
         // API expects addresses as an array
         payload.addresses = [{ ...addrObj }];
      }

      // enquiry: add only if any enquiry field filled (special-case is_follow)
      const enqObj = student.enquiries || {};
      const isEnqFilled = Object.entries(enqObj).some(([k, v]) => {
         if (k === 'is_follow') return v !== null && v !== undefined;
         return v && v.toString().trim() !== '';
      });
      if (isEnqFilled) {
         payload.enquiries = [{ ...enqObj }];
      }

      return payload;
   }, [student]);

   const handleSubmit = async () => {
      if (!canCreateStudent) {
         alert(
            'Please fill required fields: First name, Last name, Email, Mobile.'
         );
         return;
      }

      setSubmitting(true);
      const payload = buildPayload();
      try {
         const url = isCreateMode
            ? 'http://localhost:8000/api/users'
            : `http://localhost:8000/api/users/${hashId}`;
         const method = isCreateMode ? 'POST' : 'PUT';

         const res = await fetch(url, {
            method,
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
         });

         const data = await res.json().catch(() => ({}));

         if (res.ok) {
            alert(isCreateMode ? 'Student created!' : 'Student updated!');
            navigate('/dashboard');
         } else {
            if (data && Array.isArray(data.errors)) {
               const msgs = data.errors.map((e) => `${e.field}: ${e.message}`);
               alert('Validation errors:\n' + msgs.join('\n'));
            } else {
               alert('Save failed: ' + (data.message || 'Unknown error'));
            }
         }
      } catch (err) {
         console.error(err);
         alert('Network/server error.');
      } finally {
         setSubmitting(false);
      }
   };

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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                                 disabled={!isEditable}
                                 className='border rounded px-2 py-1 w-full'
                                 value={student.first_name}
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
                                       disabled={!isEditable}
                                       type='date'
                                       className='border rounded px-2 py-1 w-full'
                                       value={student.dob}
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
                                          disabled={!isEditable}
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
                                          disabled={!isEditable}
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
                                          disabled={!isEditable}
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
                                    disabled={!isEditable}
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
                                    disabled={!isEditable}
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
                                    disabled={!isEditable}
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.last_name}
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
                                       {!isCreateMode ? (
                                          <img
                                             className='w-20'
                                             src='https://marketplace.canva.com/EAF-FAvfD1E/2/0/1600w/canva-neon-rainbow-gradient-fun-creative-linkedin-profile-picture-IYcgPnJtx3Q.jpg'
                                          />
                                       ) : (
                                          'Preview'
                                       )}
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
                                    disabled={!isEditable}
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.addresses?.line_1 || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: {
                                             ...student.addresses,
                                             line_1: e.target.value,
                                          },
                                       })
                                    }
                                 />
                              </div>
                              <div className='w-1/2'>
                                 <label className='block text-xs font-medium'>
                                    Address line 2
                                 </label>
                                 <input
                                    disabled={!isEditable}
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.addresses.line_2 || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: {
                                             ...student.addresses,
                                             line_2: e.target.value,
                                          },
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
                                    disabled={!isEditable}
                                    className='border rounded px-2 py-1 w-full'
                                    // value={student.addresses?.[0]?.zip || ''}
                                    value={student.addresses.zip || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: {
                                             ...student.addresses,
                                             zip: e.target.value,
                                          },
                                       })
                                    }
                                 />
                              </div>
                              <div className='w-1/4'>
                                 <label className='block text-xs font-medium'>
                                    City
                                 </label>
                                 <input
                                    disabled={!isEditable}
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.addresses.city || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: {
                                             ...student.addresses,
                                             city: e.target.value,
                                          },
                                       })
                                    }
                                 />
                              </div>
                              <div className='w-1/4'>
                                 <label className='block text-xs font-medium'>
                                    State
                                 </label>
                                 <input
                                    disabled={!isEditable}
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.addresses.state || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: {
                                             ...student.addresses,
                                             state: e.target.value,
                                          },
                                       })
                                    }
                                 />
                              </div>
                              <div className='w-1/4'>
                                 <label className='block text-xs font-medium'>
                                    Country
                                 </label>
                                 <input
                                    disabled={!isEditable}
                                    className='border rounded px-2 py-1 w-full'
                                    value={student.addresses.country || ''}
                                    onChange={(e) =>
                                       setStudent({
                                          ...student,
                                          addresses: {
                                             ...student.addresses,
                                             country: e.target.value,
                                          },
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
                                    disabled={!isEditable}
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
                                    disabled={!isEditable}
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
                                    disabled={!isEditable}
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
                                    disabled={!isEditable}
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
                                 disabled={!isEditable}
                                 type='datetime-local'
                                 value={
                                    student.enquiries.walkin_date
                                       ? student.enquiries.walkin_date
                                            .replace(' ', 'T')
                                            .slice(0, 16)
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setStudent({
                                       ...student,
                                       enquiries: {
                                          ...student.enquiries,
                                          walkin_date: e.target.value,
                                       },
                                    })
                                 }
                              />
                           </div>
                           <div>
                              <label className='block text-xs font-medium'>
                                 Time
                              </label>
                              <input
                                 disabled={!isEditable}
                                 type='time'
                                 className='border rounded px-2 py-1 w-full'
                                 value={
                                    student.enquiries.walkin_date
                                       ? student.enquiries.walkin_date
                                            .split(' ')[1]
                                            ?.slice(0, 5)
                                       : ''
                                 }
                                 onChange={(e) => {
                                    const newTime = e.target.value; // "14:30"
                                    const datePart =
                                       student.enquiries.walkin_date?.split(
                                          ' '
                                       )[0] || '2025-01-01';

                                    setStudent((prev) => ({
                                       ...prev,
                                       enquiries: {
                                          ...prev.enquiries,
                                          walkin_date: `${datePart} ${newTime}:00`,
                                       },
                                    }));
                                 }}
                              />
                           </div>

                           <div>
                              <label className='block text-xs font-medium'>
                                 Enquiry received by
                              </label>
                              <select className='border rounded px-2 py-1 w-full'>
                                 <option>Person 1</option>
                                 <option>Person 2</option>
                                 <option>Person 3</option>
                              </select>
                           </div>
                           <div>
                              <label className='block text-xs font-medium'>
                                 Instrument of Interest
                              </label>
                              <select
                                 disabled={!isEditable}
                                 className='border rounded px-2 py-1 w-full'
                                 value={student.enquiries.instruments || ''}
                                 onChange={(e) =>
                                    setStudent((prev) => ({
                                       ...prev,
                                       enquiries: {
                                          ...prev.enquiries,
                                          instruments: e.target.value,
                                       },
                                    }))
                                 }>
                                 <option value=''>Select Instrument</option>
                                 <option value='Piano'>Piano</option>
                                 <option value='Guitar'>Guitar</option>
                                 <option value='Violin'>Violin</option>
                              </select>
                           </div>
                           <div className='col-span-2'>
                              <label className='block text-xs font-medium'>
                                 Select Course
                              </label>
                              <select
                                 disabled={!isEditable}
                                 className='border rounded px-2 py-1 w-full'
                                 value={student.enquiries.cource || ''}
                                 onChange={(e) =>
                                    setStudent((prev) => ({
                                       ...prev,
                                       enquiries: {
                                          ...prev.enquiries,
                                          cource: e.target.value,
                                       },
                                    }))
                                 }>
                                 <option value=''>Select Course</option>
                                 <option value='Course 1'>Course 1</option>
                                 <option value='Course 2'>Course 2</option>
                                 <option value='Course 3'>Course 3</option>
                              </select>
                           </div>
                           <div>
                              <label className='block text-xs font-medium'>
                                 Lead Source
                              </label>
                              <select
                                 disabled={!isEditable}
                                 className='border rounded px-2 py-1 w-full'
                                 value={student.enquiries.source || ''}
                                 onChange={(e) =>
                                    setStudent((prev) => ({
                                       ...prev,
                                       enquiries: {
                                          ...prev.enquiries,
                                          source: e.target.value,
                                       },
                                    }))
                                 }>
                                 <option value=''>Select Source</option>
                                 <option value='Lead 1'>Lead 1</option>
                                 <option value='Lead 2'>Lead 2</option>
                                 <option value='Lead 3'>Lead 3</option>
                              </select>
                           </div>
                           <div>
                              <label className='block text-xs font-medium'>
                                 Lead Type
                              </label>
                              <select
                                 disabled={!isEditable}
                                 value={student.enquiries.type || ''}
                                 onChange={(e) =>
                                    setStudent({
                                       ...student,
                                       enquiries: {
                                          ...student.enquiries,
                                          type: e.target.value,
                                       },
                                    })
                                 }>
                                 <option value='Music Lessons'>
                                    Music Lessons
                                 </option>
                                 <option value='Dance'>Dance</option>
                              </select>
                           </div>
                           <div className='col-span-2'>
                              <label className='block text-xs font-medium'>
                                 Remark
                              </label>
                              <input
                                 disabled={!isEditable}
                                 className='border rounded px-2 py-1 w-full'
                                 value={student.enquiries?.remarks || ''}
                                 onChange={(e) =>
                                    setStudent((prev) => ({
                                       ...prev,
                                       enquiries: {
                                          ...prev.enquiries,
                                          remarks: e.target.value,
                                       },
                                    }))
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
                                       disabled={!isEditable}
                                       name='followup'
                                       type='radio'
                                       // defaultChecked
                                       className='accent-blue-600'
                                    />
                                    <span className='ml-1 text-xs'>Yes</span>
                                 </label>
                                 <label className='inline-flex items-center'>
                                    <input
                                       disabled={!isEditable}
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
                                 disabled={!isEditable}
                                 type='date'
                                 className='border rounded px-2 py-1 w-full'
                                 value={
                                    student.enquiries?.follow_date
                                       ? student.enquiries.follow_date.split(
                                            ' '
                                         )[0] // ✅ Take only the date part
                                       : ''
                                 }
                                 onChange={(e) => {
                                    const newDate = e.target.value; // e.g. "2025-10-18"
                                    setStudent((prev) => ({
                                       ...prev,
                                       enquiries: {
                                          ...prev.enquiries,
                                          follow_date: `${newDate} 00:00:00`,
                                       },
                                    }));
                                 }}
                              />
                              <label className='block text-xs font-medium mt-2'>
                                 Follow Up Time
                              </label>
                              <input
                                 disabled={!isEditable}
                                 className='border rounded px-2 py-1 w-full'
                                 value={
                                    student.enquiries.follow_date
                                       ? student.enquiries.follow_date
                                            .split(' ')[1]
                                            ?.slice(0, 5)
                                       : ''
                                 }
                                 onChange={(e) => {
                                    const newTime = e.target.value;
                                    const datePart =
                                       student.enquiries.follow_date?.split(
                                          ' '
                                       )[0] || '2025-01-01';

                                    setStudent((prev) => ({
                                       ...prev,
                                       enquiries: {
                                          ...prev.enquiries,
                                          follow_date: `${datePart} ${newTime}:00`,
                                       },
                                    }));
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Bottom bar */}
               <div className='w-full flex justify-end px-10 py-4 bg-white border-t gap-3'>
                  {/* Cancel / Reset */}
                  <button
                     className='bg-gray-300 text-black px-7 py-2 rounded font-semibold hover:bg-gray-400'
                     onClick={() => {
                        if (isCreateMode) {
                           // clear form
                           setStudent(EMPTY_STUDENT);
                        } else {
                           // ...
                           setStudent({
                              ...EMPTY_STUDENT,
                              ...data,
                              addresses:
                                 (data.addresses && data.addresses[0]) ||
                                 EMPTY_STUDENT.addresses,
                              enquiries:
                                 (data.enquiries && data.enquiries[0]) ||
                                 EMPTY_STUDENT.enquiries,
                           });
                        }
                     }}>
                     {isCreateMode ? 'Cancel' : isEditable ? 'Discard' : 'Back'}
                  </button>

                  {/* If viewing existing record and not editing -> show Edit button */}
                  {!isCreateMode && !isEditable && (
                     <button
                        className='px-7 py-2 rounded font-semibold bg-yellow-400 text-black'
                        onClick={() => setIsEditable(true)}>
                        Edit
                     </button>
                  )}

                  {/* Submit / Save button */}
                  <button
                     disabled={
                        !canCreateStudent ||
                        submitting ||
                        (!isCreateMode && !isEditable)
                     }
                     onClick={handleSubmit}
                     className={`px-7 py-2 rounded font-semibold transition-all duration-200 ${
                        canCreateStudent && isEditable
                           ? 'bg-blue-700 text-white hover:bg-blue-800'
                           : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                     }`}>
                     {submitting
                        ? isCreateMode
                           ? 'Creating...'
                           : 'Updating...'
                        : isCreateMode
                        ? 'Create Student'
                        : isEditable
                        ? 'Save Changes'
                        : 'Update'}
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
