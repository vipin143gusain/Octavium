/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoOctaivum from '../assets/images/login/octaviumLogo.png';

export default function ResetSuccess() {
   const navigate = useNavigate();
   return (
      <div className='min-h-screen flex items-center justify-center '>
         <div className=' shadow-lg p-10 w-full'>
            {/* Logo */}
            <div className='flex justify-center mb-10'>
               <img src={LogoOctaivum} alt='Octavium Logo' className='h-20' />
            </div>

            <div className='bg-white shadow-lg p-10 w-[400px] rounded-lg'>
               <div className='flex justify-center mb-6'>
                  {/* <img src="LOGO_URL" alt="Logo" className="h-16" /> */}
               </div>
               <div className='flex flex-col items-center'>
                  <span className='text-green-500 text-6xl mb-4'>&#10003;</span>
                  <h2 className='font-bold text-2xl mb-2 text-center'>
                     Password Reset
                  </h2>
                  <p className='mb-4 text-center text-gray-700'>
                     Your password has been reset successfully
                  </p>
                  <button
                     onClick={() => navigate('/')}
                     className='w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition mt-2'>
                     Back to login page
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
