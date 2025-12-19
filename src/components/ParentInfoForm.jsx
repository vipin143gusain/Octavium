/** @format */

import React, { useState } from 'react';
import CapturePhotoComponent from './CapturePhotoComponent';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function mapGuardianToParentForm(student = {}) {
   const guardians = Array.isArray(student.guardians) ? student.guardians : [];

   const father = guardians.find(
      (g) => g.relation_ship?.toLowerCase() === 'father'
   );
   const mother = guardians.find(
      (g) => g.relation_ship?.toLowerCase() === 'mother'
   );

   const address =
      Array.isArray(student.addresses) && student.addresses.length > 0
         ? student.addresses[0]
         : {};

   return {
      fillingFor: 'parent',

      // 👨 Father
      fatherFirstName: father?.first_name || '',
      fatherLastName: father?.last_name || '',
      fatherEmail: father?.email_id || '',
      primaryMobile: father?.mobile_number || '',

      // 👩 Mother
      motherFirstName: mother?.first_name || '',
      motherLastName: mother?.last_name || '',
      motherEmail: mother?.email_id || '',

      // Shared
      secondaryMobile: '',
      relationship: father ? 'Father' : 'Mother',

      address1: address.line_1 || '',
      address2: address.line_2 || '',
      city: address.city || '',
      state: address.state || '',
      zipcode: address.zip || '',
      country: address.country || 'India',

      dob: father?.dob || mother?.dob || '',
      gender: father?.gender
         ? father.gender.charAt(0).toUpperCase() + father.gender.slice(1)
         : mother?.gender
         ? mother.gender.charAt(0).toUpperCase() + mother.gender.slice(1)
         : 'Male',

      stream: student.stream || '',
      motherTongue: student.mother_tongue || '',

      unsubFather: false,
      unsubMother: false,

      // enquiry (optional)
      walkinDate: student.enquiries?.[0]?.walkin_date?.split(' ')[0] || '',
      walkinTime:
         student.enquiries?.[0]?.walkin_date?.split(' ')[1]?.slice(0, 5) || '',
      instrument: student.enquiries?.[0]?.instruments || '',
      selectedCourse: student.enquiries?.[0]?.cource || '',
      leadSource: student.enquiries?.[0]?.source || '',
      leadType: student.enquiries?.[0]?.type || '',
      remark: student.enquiries?.[0]?.remarks || '',
      followUpNeeded: student.enquiries?.[0]?.is_follow ? 'Yes' : 'No',
      followUpDate: student.enquiries?.[0]?.follow_date?.split(' ')[0] || '',
      followUpTime:
         student.enquiries?.[0]?.follow_date?.split(' ')[1]?.slice(0, 5) || '',
   };
}

export default function ParentInfoPageUI() {
   const { hashId } = useParams();

   const isViewMode = !!hashId;
   const isEditable = !isViewMode; // same pattern as student

   const [form, setForm] = useState({
      fillingFor: 'parent',
      fatherFirstName: '',
      fatherLastName: '',
      motherFirstName: '',
      motherLastName: '',
      primaryMobile: '',
      whatsappPreferred: true,
      smsOptOutPrimary: true,
      secondaryMobile: '',
      smsOptOutSecondary: true,
      address1: '',
      address2: '',
      zipcode: '',
      city: '',
      state: '',
      country: 'India',
      relationship: 'Father',
      dob: '',
      gender: 'Male',
      stream: '',
      motherTongue: '',
      motherEmail: '',
      unsubMother: false,
      fatherEmail: '',
      unsubFather: false,
      walkinDate: '',
      walkinTime: '',
      enquiryBy: '',
      instrument: '',
      selectedCourse: '',
      leadSource: '',
      leadType: '',
      remark: '',
      followUpNeeded: 'No',
      followUpDate: '',
      followUpTime: '',
   });

   const [errors, setErrors] = useState({});
   const [touched, setTouched] = useState({});

   const handleChange = (e) => {
      if (!isEditable) return;
      const { name, type, checked, value } = e.target;
      setForm((f) => ({
         ...f,
         [name]: type === 'checkbox' ? checked : value,
      }));
   };

   const handleBlur = (fieldName) => {
      setTouched((prev) => ({
         ...prev,
         [fieldName]: true,
      }));
   };

   const validateForm = () => {
      const newErrors = {};

      // Required fields validation
      if (!form.fatherFirstName.trim()) newErrors.fatherFirstName = 'Required';
      if (!form.fatherLastName.trim()) newErrors.fatherLastName = 'Required';
      if (!form.motherFirstName.trim()) newErrors.motherFirstName = 'Required';
      if (!form.motherLastName.trim()) newErrors.motherLastName = 'Required';

      // Primary Mobile validation
      if (!form.primaryMobile.trim()) {
         newErrors.primaryMobile = 'Required';
      } else if (!/^\d{10}$/.test(form.primaryMobile)) {
         newErrors.primaryMobile = 'Must be 10 digits';
      }

      // Secondary Mobile validation (optional but if filled, must be valid)
      if (form.secondaryMobile && !/^\d{10}$/.test(form.secondaryMobile)) {
         newErrors.secondaryMobile = 'Must be 10 digits';
      }

      // Address validation
      if (!form.address1.trim()) newErrors.address1 = 'Required';
      if (!form.zipcode.trim()) {
         newErrors.zipcode = 'Required';
      } else if (!/^\d{6}$/.test(form.zipcode)) {
         newErrors.zipcode = 'Must be 6 digits';
      }
      if (!form.city.trim()) newErrors.city = 'Required';
      if (!form.state || form.state === '-') newErrors.state = 'Required';

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!form.motherEmail.trim()) {
         newErrors.motherEmail = 'Required';
      } else if (!emailRegex.test(form.motherEmail)) {
         newErrors.motherEmail = 'Invalid email';
      }

      if (form.fatherEmail && !emailRegex.test(form.fatherEmail)) {
         newErrors.fatherEmail = 'Invalid email';
      }

      return newErrors;
   };

   function handleSubmit(e) {
      e.preventDefault();

      const validationErrors = validateForm();

      if (Object.keys(validationErrors).length > 0) {
         setErrors(validationErrors);
         setTouched(
            Object.keys(validationErrors).reduce((acc, key) => {
               acc[key] = true;
               return acc;
            }, {})
         );

         // Scroll to first error
         const firstErrorField = Object.keys(validationErrors)[0];
         const element = document.getElementsByName(firstErrorField)[0];
         if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.focus();
         }

         alert('Please fill all required fields correctly');
         return;
      }

      // If validation passes, submit the form
      console.log('Form submitted successfully:', form);
      alert('Form submitted successfully!');

      // You can add your API call here
      // submitToAPI(form);
   }

   const getInputClassName = (fieldName) => {
      return `input ${
         errors[fieldName] && touched[fieldName] ? 'border-red-500' : ''
      }`;
   };

   useEffect(() => {
      if (!hashId) return;

      fetch(`http://localhost:8000/api/users/${hashId}`, {
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
      })
         .then((res) => {
            if (!res.ok) throw new Error('Failed to fetch student');
            return res.json();
         })
         .then((student) => {
            // ✅ Father + Mother both rendered
            setForm(mapGuardianToParentForm(student));
         })
         .catch((err) => {
            console.error('Parent fetch error:', err);
         });
   }, [hashId]);

   return (
      <form
         className=' min-h-screen px-6 py-3 font-sans'
         onSubmit={handleSubmit}>
         <div className=' mx-auto bg-[#fff] rounded shadow-none'>
            {/* Top grid group */}
            <div className='grid grid-cols-2 gap-4 mb-4'>
               {/* Left: Parent Details */}
               <div className='bg-[#e3e3e3] rounded-t font-bold px-4 py-2 text-lg border-b border-[#dadada]'>
                  Parent Details
               </div>
               {/* Right: Parent Address */}
               <div className='bg-[#e3e3e3] rounded-t font-bold px-4 py-2 text-lg border-b border-[#dadada]'>
                  Parent Address
               </div>
               <div className='bg-white rounded-b px-4 py-4'>
                  <div className='grid grid-cols-4 gap-4 items-center text-xs'>
                     <label>
                        Father First Name<span className='text-red-500'>*</span>
                     </label>
                     <input
                        disabled={!isEditable}
                        className={getInputClassName('fatherFirstName')}
                        name='fatherFirstName'
                        value={form.fatherFirstName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('fatherFirstName')}
                     />
                     <label>
                        Father Last Name<span className='text-red-500'>*</span>
                     </label>
                     <input
                        disabled={!isEditable}
                        className={getInputClassName('fatherLastName')}
                        name='fatherLastName'
                        value={form.fatherLastName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('fatherLastName')}
                     />
                     <label>
                        Mother First Name<span className='text-red-500'>*</span>
                     </label>
                     <input
                        disabled={!isEditable}
                        className={getInputClassName('motherFirstName')}
                        name='motherFirstName'
                        value={form.motherFirstName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('motherFirstName')}
                     />
                     <label>
                        Mother Last Name<span className='text-red-500'>*</span>
                     </label>
                     <input
                        disabled={!isEditable}
                        className={getInputClassName('motherLastName')}
                        name='motherLastName'
                        value={form.motherLastName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('motherLastName')}
                     />
                     <label>
                        Primary Mobile No.
                        <span className='text-red-500'>*</span>
                     </label>
                     <div className='col-span-3'>
                        <input
                           disabled={!isEditable}
                           className={getInputClassName('primaryMobile')}
                           name='primaryMobile'
                           value={form.primaryMobile}
                           onChange={handleChange}
                           onBlur={() => handleBlur('primaryMobile')}
                           maxLength={10}
                        />
                        {errors.primaryMobile && touched.primaryMobile && (
                           <div className='text-red-500 text-xs mt-1'>
                              {errors.primaryMobile}
                           </div>
                        )}
                     </div>
                     <label className='col-start-3 flex items-center gap-1 text-xs'>
                        <input
                           disabled={!isEditable}
                           type='checkbox'
                           className='accent-blue-600 w-5 h-5'
                           checked={form.whatsappPreferred}
                           name='whatsappPreferred'
                           onChange={handleChange}
                        />
                        Whatsapp Preferred
                     </label>
                     <label className='flex items-center gap-1 text-xs'>
                        <input
                           disabled={!isEditable}
                           type='checkbox'
                           className='accent-blue-600 w-5 h-5'
                           checked={form.smsOptOutPrimary}
                           name='smsOptOutPrimary'
                           onChange={handleChange}
                        />
                        SMS Opt Out
                     </label>
                  </div>
                  <div className='grid grid-cols-4 gap-4 items-center text-xs mt-4'>
                     <label>Secondry Mobile No.</label>
                     <div className='col-span-2'>
                        <input
                           disabled={!isEditable}
                           className={getInputClassName('secondaryMobile')}
                           name='secondaryMobile'
                           value={form.secondaryMobile}
                           onChange={handleChange}
                           onBlur={() => handleBlur('secondaryMobile')}
                           maxLength={10}
                        />
                        {errors.secondaryMobile && touched.secondaryMobile && (
                           <div className='text-red-500 text-xs mt-1'>
                              {errors.secondaryMobile}
                           </div>
                        )}
                     </div>
                     <label className='flex items-center gap-1'>
                        <input
                           disabled={!isEditable}
                           type='checkbox'
                           className='accent-blue-600 w-5 h-5'
                           checked={form.smsOptOutSecondary}
                           name='smsOptOutSecondary'
                           onChange={handleChange}
                        />
                        SMS Opt Out
                     </label>
                  </div>
               </div>
               <div className='bg-white rounded-b px-4 py-4 flex flex-col gap-3 text-xs'>
                  <div className='flex gap-2 items-center'>
                     <label className='w-[105px]'>
                        Address line 1<span className='text-red-500'>*</span>
                     </label>
                     <div className='flex-1'>
                        <input
                           disabled={!isEditable}
                           className={getInputClassName('address1')}
                           name='address1'
                           value={form.address1}
                           onChange={handleChange}
                           onBlur={() => handleBlur('address1')}
                        />
                        {errors.address1 && touched.address1 && (
                           <div className='text-red-500 text-xs mt-1'>
                              {errors.address1}
                           </div>
                        )}
                     </div>
                  </div>
                  <div className='flex gap-2 items-center'>
                     <label className='w-[105px]'>Address line 2</label>
                     <input
                        disabled={!isEditable}
                        className='input flex-1'
                        name='address2'
                        value={form.address2}
                        onChange={handleChange}
                     />
                  </div>
                  <div className='flex gap-2 items-center'>
                     <label className='w-[70px]'>
                        Zipcode<span className='text-red-500'>*</span>
                     </label>
                     <div>
                        <input
                           disabled={!isEditable}
                           className={`${getInputClassName('zipcode')} w-20`}
                           name='zipcode'
                           value={form.zipcode}
                           onChange={handleChange}
                           onBlur={() => handleBlur('zipcode')}
                           maxLength={6}
                        />
                        {errors.zipcode && touched.zipcode && (
                           <div className='text-red-500 text-xs mt-1'>
                              {errors.zipcode}
                           </div>
                        )}
                     </div>
                     <label className='w-[44px]'>
                        City<span className='text-red-500'>*</span>
                     </label>
                     <div>
                        <input
                           disabled={!isEditable}
                           className={`${getInputClassName('city')} w-20`}
                           name='city'
                           value={form.city}
                           onChange={handleChange}
                           onBlur={() => handleBlur('city')}
                        />
                        {errors.city && touched.city && (
                           <div className='text-red-500 text-xs mt-1'>
                              {errors.city}
                           </div>
                        )}
                     </div>
                     <label className='w-[46px]'>
                        State<span className='text-red-500'>*</span>
                     </label>
                     <div>
                        <select
                           className={`${getInputClassName('state')} w-20`}
                           name='state'
                           value={form.state}
                           onChange={handleChange}
                           onBlur={() => handleBlur('state')}>
                           <option value='-'>-</option>
                           <option value='Maharashtra'>Maharashtra</option>
                           <option value='Delhi'>Delhi</option>
                           <option value='Karnataka'>Karnataka</option>
                        </select>
                        {errors.state && touched.state && (
                           <div className='text-red-500 text-xs mt-1'>
                              {errors.state}
                           </div>
                        )}
                     </div>
                     <label className='w-[52px]'>Country</label>
                     <input
                        disabled={!isEditable}
                        className='input   w-20'
                        name='country'
                        value='India'
                        readOnly
                     />
                  </div>
               </div>
            </div>

            {/* Next grid group */}
            <div className='grid grid-cols-2 gap-4 mb-4'>
               {/* Parent Personal Section */}
               <div>
                  <div className='bg-[#e3e3e3] rounded-t font-bold px-4 py-2 text-lg border-b border-[#dadada]'>
                     Parent Personal Details
                  </div>
                  <div className='bg-white rounded-b px-4 py-4 text-xs'>
                     <div className='flex gap-10 items-center mb-2'>
                        <span>Relationship with Student</span>
                        <label className='flex items-center gap-2'>
                           <input
                              disabled={!isEditable}
                              type='radio'
                              name='relationship'
                              value='Father'
                              checked={form.relationship === 'Father'}
                              onChange={handleChange}
                           />
                           Father
                        </label>
                        <label className='flex items-center gap-2'>
                           <input
                              disabled={!isEditable}
                              type='radio'
                              name='relationship'
                              value='Mother'
                              checked={form.relationship === 'Mother'}
                              onChange={handleChange}
                           />
                           Mother
                        </label>
                     </div>
                     <div className='flex gap-3 mb-2'>
                        <div>
                           <label className='block mb-1'>DOB</label>
                           <input
                              disabled={!isEditable}
                              className='input w-44'
                              type='date'
                              name='dob'
                              value={form.dob}
                              onChange={handleChange}
                           />
                        </div>
                     </div>
                     <div>
                        {/* Gender radio group */}
                        <label className='block mb-1'>Gender</label>
                        <div className='border-2 border-[#bbb] p-10 pl-5 inline-block w-[177px]'>
                           <div className='flex items-left mb-5'>
                              <label>
                                 <input
                                    disabled={!isEditable}
                                    className='mr-2'
                                    type='radio'
                                    name='gender'
                                    value='Male'
                                    checked={form.gender === 'Male'}
                                    onChange={handleChange}
                                 />
                                 Male
                              </label>
                           </div>
                           <div className='flex items-center mb-5'>
                              <label>
                                 <input
                                    disabled={!isEditable}
                                    className='mr-2'
                                    type='radio'
                                    name='gender'
                                    value='Female'
                                    checked={form.gender === 'Female'}
                                    onChange={handleChange}
                                 />{' '}
                                 Female
                              </label>
                           </div>
                           <div className='flex items-center'>
                              <label className='gap-5'>
                                 <input
                                    className='mr-2'
                                    type='radio'
                                    name='gender'
                                    value='Others'
                                    checked={form.gender === 'Others'}
                                    onChange={handleChange}
                                 />
                                 Others
                              </label>
                           </div>
                        </div>
                     </div>
                     <div className='flex gap-2 mb-2'>
                        <div>
                           <label className='block mb-1'>Stream</label>
                           <select
                              className='input w-[177px]'
                              name='stream'
                              value={form.stream}
                              onChange={handleChange}>
                              <option value=''>Select</option>
                              <option>PCM</option>
                              <option>PCB</option>
                              <option>Commerce</option>
                              <option>Arts</option>
                           </select>
                        </div>
                     </div>
                     <div className='flex gap-2 mb-2'>
                        <div>
                           <label className='block mb-1'>Mother Tongue</label>
                           <input
                              disabled={!isEditable}
                              className='input w-[177px]'
                              name='motherTongue'
                              value={form.motherTongue}
                              onChange={handleChange}
                           />
                        </div>
                     </div>
                     {/* Capture Photo Row */}
                     <CapturePhotoComponent />
                  </div>
               </div>
               {/* Student Enquiry Details */}
               <div>
                  <div className='bg-[#e3e3e3] rounded-t font-bold px-4 py-2 text-lg border-b border-[#dadada]'>
                     Student Enquiry Details
                  </div>
                  <div className='bg-white rounded-b px-4 py-4 flex flex-col gap-3 text-xs'>
                     <div className='flex gap-2 items-center'>
                        <label className='w-[90px]'>Walkin Date</label>
                        <input
                           disabled={!isEditable}
                           className='input w-44'
                           type='date'
                           name='walkinDate'
                           value={form.walkinDate}
                           onChange={handleChange}
                        />
                        <label className='w-[40px] text-right'>Time</label>
                        <input
                           disabled={!isEditable}
                           className='input w-44'
                           type='time'
                           name='walkinTime'
                           value={form.walkinTime}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label>Enquiry received by</label>
                        <select
                           style={{ fontSize: '12px' }}
                           className='input w-full'
                           name='enquiryBy'
                           value={form.enquiryBy}
                           onChange={handleChange}>
                           <option>Received by</option>
                        </select>
                     </div>
                     <div>
                        <label>Instrument of Interest</label>
                        <input
                           disabled={!isEditable}
                           className='input w-full'
                           name='instrument'
                           value={form.instrument}
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label>Select Course</label>
                        <select
                           style={{ fontSize: '12px' }}
                           className='input w-full'
                           name='selectedCourse'
                           value={form.selectedCourse}
                           onChange={handleChange}>
                           <option>Course 1</option>
                           <option>Course 2</option>
                           <option>Course 3</option>
                        </select>
                     </div>
                     <div>
                        <label>Lead Source</label>
                        <select
                           className='input w-full'
                           name='leadSource'
                           value={form.leadSource}
                           onChange={handleChange}>
                           <option>--</option>
                        </select>
                     </div>
                     <div>
                        <label>Lead Type</label>
                        <select
                           className='input w-full'
                           name='leadType'
                           value={form.leadType}
                           onChange={handleChange}>
                           <option>--</option>
                        </select>
                     </div>
                     <div>
                        <label>Remark</label>
                        <input
                           disabled={!isEditable}
                           className='input w-full'
                           name='remark'
                           value={form.remark}
                           onChange={handleChange}
                        />
                     </div>
                     <div className='flex gap-6 mt-2'>
                        <span className='text-base'>Is follow up needed</span>
                        <label className='flex items-center gap-2'>
                           <input
                              disabled={!isEditable}
                              type='radio'
                              name='followUpNeeded'
                              value='Yes'
                              checked={form.followUpNeeded === 'Yes'}
                              onChange={handleChange}
                           />{' '}
                           Yes
                        </label>
                        <label className='flex items-center gap-2'>
                           <input
                              type='radio'
                              name='followUpNeeded'
                              value='No'
                              checked={form.followUpNeeded === 'No'}
                              onChange={handleChange}
                           />{' '}
                           No
                        </label>
                     </div>
                     <div className='flex gap-3 mt-2'>
                        <div>
                           <label className='block mb-1'>Follow Up Date</label>
                           <input
                              disabled={!isEditable}
                              className='input w-44'
                              type='date'
                              name='followUpDate'
                              value={form.followUpDate}
                              onChange={handleChange}
                           />
                        </div>
                        <div>
                           <label className='block mb-1'>Follow Up Time</label>
                           <input
                              className='input w-44'
                              type='time'
                              name='followUpTime'
                              value={form.followUpTime}
                              onChange={handleChange}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* Last grid group */}
            <div className='grid grid-cols-2 gap-4 mb-4'>
               {/* Parent Contact */}
               <div>
                  <div className='bg-[#e3e3e3] rounded-t font-bold px-4 py-2 text-lg border-b border-[#dadada]'>
                     Parent Contact Details
                  </div>
                  <div className='bg-white rounded-b px-4 py-4 text-xs'>
                     <div className='flex gap-6 items-center mb-2'>
                        <label>
                           Mother's Email id
                           <span className='text-red-500'>*</span>
                        </label>
                        <div className='w-64'>
                           <input
                              disabled={!isEditable}
                              className={getInputClassName('motherEmail')}
                              name='motherEmail'
                              type='email'
                              value={form.motherEmail}
                              onChange={handleChange}
                              onBlur={() => handleBlur('motherEmail')}
                           />
                           {errors.motherEmail && touched.motherEmail && (
                              <div className='text-red-500 text-xs mt-1'>
                                 {errors.motherEmail}
                              </div>
                           )}
                        </div>
                        <label className='flex items-center gap-1'>
                           <input
                              disabled={!isEditable}
                              type='checkbox'
                              checked={form.unsubMother}
                              name='unsubMother'
                              onChange={handleChange}
                           />{' '}
                           Unsubscribe email
                        </label>
                     </div>
                     <div className='flex gap-6 items-center'>
                        <label>
                           Father's Email id
                           <span className='text-red-500'>*</span>
                        </label>
                        <div className='w-64 ml-1'>
                           <input
                              disabled={!isEditable}
                              className={getInputClassName('fatherEmail')}
                              name='fatherEmail'
                              type='email'
                              value={form.fatherEmail}
                              onChange={handleChange}
                              onBlur={() => handleBlur('fatherEmail')}
                           />
                           {errors.fatherEmail && touched.fatherEmail && (
                              <div className='text-red-500 text-xs mt-1'>
                                 {errors.fatherEmail}
                              </div>
                           )}
                        </div>
                        <label className='flex items-center gap-1'>
                           <input
                              disabled={!isEditable}
                              type='checkbox'
                              checked={form.unsubFather}
                              name='unsubFather'
                              onChange={handleChange}
                           />
                           Unsubscribe email
                        </label>
                     </div>
                  </div>
               </div>
               {/* Adding Child */}
               <div>
                  <div className='bg-[#e3e3e3] rounded-t font-bold px-4 py-2 text-lg border-b border-[#dadada]'>
                     Adding Child
                  </div>
                  <div
                     className='bg-white rounded-b px-4 py-4 flex items-end justify-end'
                     style={{ minHeight: '114px' }}>
                     <button
                        className='bg-blue-600 text-white rounded px-6 py-2 font-semibold'
                        type='button'>
                        Add Child
                     </button>
                  </div>
               </div>
            </div>
            {/* Submit button row */}
            <div className='flex gap-6 justify-end mb-4 pt-5 bg-[#efefef] pr-2'>
               <button
                  className='bg-gray-400 text-white font-semibold rounded px-7 py-2'
                  type='button'>
                  Cancel
               </button>
               <button
                  className='bg-blue-600 text-white rounded px-8 py-2 font-semibold'
                  type='submit'>
                  Submit
               </button>
            </div>
         </div>
         <style>{`
        .input {
          background: #fff;
          border: 2px solid #bbb;
          border-radius: 3px;
          padding: 7px 13px;
          font-size: 1rem;
        }
        .input:focus {
          outline: 2px solid #316fff;
          border-color: #316fff;
          background: #f8fbff;
        }
        .border-red-500 {
          border-color: #ef4444 !important;
        }
      `}</style>
      </form>
   );
}
