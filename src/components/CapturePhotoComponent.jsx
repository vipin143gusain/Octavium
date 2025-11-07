/** @format */

import React, { useState, useRef } from 'react';

export default function CapturePhotoComponent() {
   const [capturedImage, setCapturedImage] = useState(null);
   const [showWebcam, setShowWebcam] = useState(false);
   const videoRef = useRef(null);
   const canvasRef = useRef(null);
   const fileInputRef = useRef(null);

   // Start webcam
   const startWebcam = async () => {
      try {
         const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 },
         });
         setShowWebcam(true);
         setTimeout(() => {
            if (videoRef.current) {
               videoRef.current.srcObject = stream;
               videoRef.current.play();
            }
         }, 100);
      } catch (err) {
         alert('Unable to access webcam: ' + err.message);
      }
   };

   // Capture photo from webcam
   const capturePhoto = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video) {
         const context = canvas.getContext('2d');
         canvas.width = video.videoWidth;
         canvas.height = video.videoHeight;
         context.drawImage(video, 0, 0, canvas.width, canvas.height);
         const imageDataUrl = canvas.toDataURL('image/png');
         setCapturedImage(imageDataUrl);
         stopWebcam();
      }
   };

   // Stop webcam
   const stopWebcam = () => {
      if (videoRef.current && videoRef.current.srcObject) {
         const tracks = videoRef.current.srcObject.getTracks();
         tracks.forEach((track) => track.stop());
         videoRef.current.srcObject = null;
      }
      setShowWebcam(false);
   };

   // Handle file upload
   const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setCapturedImage(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   return (
      <div>
         <label className='block text-base mb-2 font-medium'>
            Capture Photo
         </label>

         {/* Capture Image and Preview boxes */}
         <div className='flex gap-3 mb-2'>
            <div>
               <div className='w-40 border rounded-t py-1 text-center bg-[#fafafa] font-medium text-sm border-b-0'>
                  Capture Images
               </div>
               <div className='w-40 h-40 border rounded-b flex items-center justify-center bg-white overflow-hidden'>
                  {capturedImage ? (
                     <img
                        src={capturedImage}
                        alt='Captured'
                        className='w-full h-full object-cover'
                     />
                  ) : (
                     <span className='text-gray-400 text-sm'>No image</span>
                  )}
               </div>
            </div>
            <div>
               <div className='w-40 border rounded-t py-1 text-center bg-[#fafafa] font-medium text-sm border-b-0'>
                  Preview
               </div>
               <div className='w-40 h-40 border rounded-b flex items-center justify-center bg-white overflow-hidden'>
                  {capturedImage ? (
                     <img
                        src={capturedImage}
                        alt='Preview'
                        className='w-full h-full object-cover'
                     />
                  ) : (
                     <span className='text-gray-400 text-sm'>No preview</span>
                  )}
               </div>
            </div>
         </div>

         {/* Buttons */}
         <div className='flex gap-2 mb-4'>
            <button
               type='button'
               onClick={startWebcam}
               className='px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700'>
               📷 Webcam
            </button>
            <button
               type='button'
               onClick={() => fileInputRef.current?.click()}
               className='px-4 py-2 border border-gray-400 text-gray-700 rounded text-sm font-medium hover:bg-gray-100'>
               Select file
            </button>
            <button
               type='button'
               onClick={() => fileInputRef.current?.click()}
               className='px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700'>
               Browse local
            </button>
            <input
               ref={fileInputRef}
               type='file'
               accept='image/*'
               onChange={handleFileUpload}
               className='hidden'
            />
         </div>

         {/* Webcam Modal/Overlay */}
         {showWebcam && (
            <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
               <div className='bg-white rounded-lg p-6 max-w-2xl'>
                  <h3 className='text-xl font-bold mb-4'>Capture Photo</h3>
                  <video
                     ref={videoRef}
                     className='w-full rounded mb-4'
                     autoPlay
                  />
                  <canvas ref={canvasRef} className='hidden' />
                  <div className='flex gap-3 justify-end'>
                     <button
                        type='button'
                        onClick={stopWebcam}
                        className='px-5 py-2 bg-gray-300 rounded font-medium hover:bg-gray-400'>
                        Cancel
                     </button>
                     <button
                        type='button'
                        onClick={capturePhoto}
                        className='px-5 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700'>
                        Capture
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
