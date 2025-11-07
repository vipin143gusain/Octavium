/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoOctaivum from '../assets/images/login/octaviumLogo.png';

const validateChecklist = (password) => ({
   length: password.length >= 8,
   uppercase: /[A-Z]/.test(password),
   special: /[\W_]/.test(password),
});

export default function ResetPassword() {
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');
   const [showChecklist, setShowChecklist] = useState(false);
   const navigate = useNavigate();

   const checklist = validateChecklist(password);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!checklist.length || !checklist.uppercase || !checklist.special) {
         setError('Password does not meet all criteria.');
      } else if (password !== confirmPassword) {
         setError('Passwords do not match.');
      } else {
         setError('');
         navigate('/reset-success');
      }
   };

   return (
      <div className='min-h-screen flex items-center justify-center'>
         <div className=' shadow-lg p-10 w-full'>
            {/* Logo */}
            <div className='flex justify-center mb-10'>
               <img src={LogoOctaivum} alt='Octavium Logo' className='h-20' />
            </div>

            <div className='bg-white shadow-lg p-10 w-[400px] rounded-lg'>
               <h2 className='text-center font-bold text-xl mb-6'>
                  Reset Your Password
               </h2>
               <form onSubmit={handleSubmit}>
                  <label className='block mb-1 font-semibold'>
                     New Password
                  </label>
                  <input
                     className={`w-full mb-2 px-3 py-2 border rounded focus:outline-none ${
                        error ? 'border-red-500' : 'border-gray-300'
                     }`}
                     type='password'
                     value={password}
                     onFocus={() => setShowChecklist(true)}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder='Enter new password'
                  />
                  {showChecklist && (
                     <div
                        className='bg-white shadow rounded px-4 py-2 mb-2'
                        style={{ width: 'fit-content' }}>
                        <div className='flex items-center mb-1'>
                           {checklist.uppercase ? (
                              <span className='text-green-600 mr-2'>
                                 &#10003;
                              </span>
                           ) : (
                              <span className='text-red-600 mr-2'>
                                 &#10007;
                              </span>
                           )}
                           <span>At least one capital letter</span>
                        </div>
                        <div className='flex items-center mb-1'>
                           {checklist.special ? (
                              <span className='text-green-600 mr-2'>
                                 &#10003;
                              </span>
                           ) : (
                              <span className='text-red-600 mr-2'>
                                 &#10007;
                              </span>
                           )}
                           <span>One special character</span>
                        </div>
                        <div className='flex items-center'>
                           {checklist.length ? (
                              <span className='text-green-600 mr-2'>
                                 &#10003;
                              </span>
                           ) : (
                              <span className='text-red-600 mr-2'>
                                 &#10007;
                              </span>
                           )}
                           <span>Should be at least 8 characters long</span>
                        </div>
                     </div>
                  )}
                  <label className='block mb-1 mt-4 font-semibold'>
                     Confirm New Password
                  </label>
                  <input
                     className='w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none'
                     type='password'
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     placeholder='Re-enter new password'
                  />
                  {error && (
                     <div className='bg-red-600 text-white rounded text-sm px-3 py-1 mb-4 w-fit mx-auto'>
                        {error}
                     </div>
                  )}
                  <button
                     type='submit'
                     className='w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition mt-2'>
                     Reset Your Password
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}
