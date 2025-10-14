/** @format */
import React, { useEffect, useState } from 'react';
import LogoOctaivum from '../assets/images/login/octaviumLogo.png';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Add at top

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [formError, setFormError] = useState('');
   const [success, setSuccess] = useState(false);
   const [showPassword, setShowPassword] = useState(false); // Add this stat

   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();
      let emailValid = validateEmail(email);
      let passwordValid = validatePassword(password);

      setEmailError(emailValid ? '' : 'Please enter a valid email address.');
      setPasswordError(
         passwordValid
            ? ''
            : 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      );

      if (!emailValid || !passwordValid) {
         setFormError('Please fix the errors before submitting.');
         setSuccess(false);
         return;
      }

      // Replace with your actual login logic/API
      const loginIsValid =
         email === 'test@octavium.com' && password === 'Test@123';
      if (loginIsValid) {
         setSuccess(true);
         setFormError('');
      } else {
         setSuccess(false);
         setFormError('Invalid email or password.');
      }
   };

   useEffect(() => {
      if (success) {
         const timeout = setTimeout(() => {
            navigate('/dashboard');
         }, 3000);
         return () => clearTimeout(timeout);
      }
   }, [success, navigate]);

   return (
      <div className='min-h-screen flex items-center justify-center bg-black'>
         <div className='bg-black shadow-lg p-10 w-full'>
            {/* Logo */}
            <div className='flex justify-center mb-10'>
               <img src={LogoOctaivum} alt='Octavium Logo' className='h-20' />
            </div>
            <div className='bg-white shadow-lg p-10 w-[400px] rounded-lg'>
               {/* Form */}
               <form onSubmit={handleSubmit}>
                  <h2 className='text-center font-bold text-xl mb-6'>
                     Welcome
                  </h2>
                  <label htmlFor='email' className='block mb-1 font-semibold'>
                     Email
                  </label>
                  <input
                     type='email'
                     id='email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className='w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
                     placeholder='Enter your email'
                  />
                  {emailError && (
                     <div className='text-red-600 text-xs mb-3'>
                        {emailError}
                     </div>
                  )}

                  <label
                     htmlFor='password'
                     className='block mb-1 font-semibold'>
                     Password
                  </label>
                  <div className='relative'>
                     <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 pr-10'
                        placeholder='Enter your password'
                     />
                     <button
                        type='button'
                        className='absolute right-3 top-2 text-gray-600'
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? (
                           <FaEyeSlash size={20} />
                        ) : (
                           <FaEye size={20} />
                        )}
                     </button>
                  </div>
                  {passwordError && (
                     <div className='text-red-600 text-xs mb-3'>
                        {passwordError}
                     </div>
                  )}

                  <div className='flex items-center justify-between mb-6 text-xs text-gray-600'>
                     <label className='flex items-center cursor-pointer'>
                        <input type='checkbox' className='mr-2' />
                        Remember me
                     </label>
                     <button
                        onClick={() => navigate('/forgot-password')}
                        type='button'
                        className='hover:underline text-purple-700 text-xs'>
                        Forgot password?
                     </button>
                  </div>

                  <button
                     type='submit'
                     className='w-full bg-[#5D4096] text-white py-2 rounded hover:bg-purple-800 transition'>
                     Sign in
                  </button>
                  {success && (
                     <div className='bg-green-600 text-white rounded text-sm px-3 py-2 mt-4 text-center'>
                        Login successful! Redirecting...
                     </div>
                  )}

                  {formError && (
                     <div className='text-red-600 text-xs mt-3 text-center'>
                        {formError}
                     </div>
                  )}

                  <p className='text-center mt-6 text-sm text-gray-600'>
                     Don’t have an account?{' '}
                     <a
                        href='/'
                        className='text-purple-700 font-semibold hover:underline'>
                        Sign Up
                     </a>
                  </p>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
