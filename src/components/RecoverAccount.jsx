/** @format */

import React, { useState } from 'react';
import LogoOctaivum from '../assets/images/login/octaviumLogo.png';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const mockEmailCheck = (email) => {
   // Use only registered emails for success, else error (for demo)
   const registeredEmails = ['user@example.com', 'demo@octavium.com'];
   return registeredEmails.includes(email);
};

export default function RecoverAccount() {
   const [email, setEmail] = useState('');
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!emailRegex.test(email)) {
         setError('Invalid email address.');
         setSuccess('');
      } else if (!mockEmailCheck(email)) {
         setError('Email address not found.');
         setSuccess('');
      } else {
         setError('');
         setSuccess('Verification link sent! Check your email.');
         // Call backend API here
      }
   };

   return (
      <div className='min-h-screen flex items-center justify-center '>
         <div className=' shadow-lg p-10 w-full'>
            {/* Logo */}
            <div className='flex justify-center mb-10'>
               <img src={LogoOctaivum} alt='Octavium Logo' className='h-20' />
            </div>
            <div className='bg-white rounded-lg shadow-lg p-10  w-[400px] '>
               <h2 className='text-center font-bold text-xl mb-8'>
                  Recover Your Account
               </h2>
               <div className='flex justify-center mb-6'>
                  {/* <img src="LOGO_URL" className="h-16" alt="Logo" /> */}
               </div>
               <form onSubmit={handleSubmit}>
                  <label className='block mb-1 font-sm text-left'>
                     Enter Your Registered Email Id
                  </label>
                  <input
                     className='w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 text-left'
                     type='email'
                     value={email}
                     onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value === '') setError('');
                     }}
                     placeholder='Email'
                  />
                  {!error === true && (
                     <div className='mb-4 text-gray-400 text-xs text-left'>
                        We will send verification link on your email id.
                     </div>
                  )}
                  {error && (
                     <div className='bg-red-600 text-white rounded text-sm px-3 py-1 mb-4 w-fit mx-auto'>
                        {error}
                     </div>
                  )}
                  {success && (
                     <div className='bg-green-600 text-white rounded text-sm px-3 py-1 mb-4 w-fit mx-auto'>
                        {success}
                     </div>
                  )}
                  <button
                     type='submit'
                     className='w-full bg-[#5D4096] text-white py-2 rounded hover:bg-purple-800 transition'>
                     Send verification link
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}
