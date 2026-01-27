/** @format */

import React, { useState } from 'react';
import {
   ChevronDown,
   ChevronUp,
   RotateCcw,
   Type,
   Bold,
   Italic,
   Underline,
   AlignLeft,
   List,
   ListOrdered,
   Trash2,
} from 'lucide-react';

const TopicAccordion = () => {
   // State to track which Topics are expanded. Using an object allows multiple to stay open.
   const [expandedTopics, setExpandedTopics] = useState({ 1: true });

   const topics = [
      { id: 1, title: 'TOPIC 1', unit: 'Aural' },
      { id: 2, title: 'TOPIC 2', unit: 'Songs' },
      { id: 3, title: 'TOPIC 3', unit: 'Technical Pieces' },
   ];

   const toggleTopic = (id) => {
      setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
   };

   return (
      <div className='border bg-white rounded shadow-inner mt-2'>
         {/* Header Row */}
         <div className='grid grid-cols-[1fr_2fr] border-b font-bold p-3 bg-gray-50 uppercase text-[11px] text-gray-600'>
            <div className='border-r'>Topics</div>
            <div className='pl-4'>Units</div>
         </div>

         {topics.map((topic) => (
            <div key={topic.id} className='border-b last:border-b-0'>
               {/* Topic Summary Row */}
               <div
                  className='grid grid-cols-[1fr_2fr] p-3 items-center hover:bg-gray-50 cursor-pointer'
                  onClick={() => toggleTopic(topic.id)}>
                  <div className='border-r h-full font-bold text-gray-700'>
                     {topic.title}
                  </div>
                  <div className='pl-4 flex justify-between items-center text-gray-600'>
                     <span>{topic.unit}</span>
                     {expandedTopics[topic.id] ? (
                        <ChevronUp className='w-4 h-4' />
                     ) : (
                        <ChevronDown className='w-4 h-4' />
                     )}
                  </div>
               </div>

               {/* Expanded Rich Text Editor (Only for Topic 1 as per screenshot) */}
               {expandedTopics[topic.id] && topic.id === 1 && (
                  <div className='p-4 bg-white border-t space-y-4'>
                     <div className='flex items-center gap-4'>
                        <span className='font-bold whitespace-nowrap text-xs text-gray-600'>
                           Course Content 1
                        </span>
                        {/* Editor Toolbar */}
                        <div className='flex gap-1 border p-1 rounded bg-gray-50 flex-grow max-w-2xl items-center'>
                           <RotateCcw className='w-3 h-3 m-1 cursor-pointer' />
                           <RotateCcw className='w-3 h-3 m-1 scale-x-[-1] cursor-pointer' />
                           <div className='border-r h-4 mx-1' />
                           <select className='bg-transparent text-[11px] outline-none font-sans'>
                              <option>Sans Serif</option>
                           </select>
                           <ChevronDown className='w-3 h-3 text-gray-400' />
                           <div className='border-r h-4 mx-1' />
                           <Type className='w-4 h-4 m-1 text-gray-500' />
                           <Bold className='w-4 h-4 m-1 text-gray-700' />
                           <Italic className='w-4 h-4 m-1 text-gray-700' />
                           <Underline className='w-4 h-4 m-1 text-gray-700' />
                           <div className='border-r h-4 mx-1' />
                           <AlignLeft className='w-4 h-4 m-1 text-gray-500' />
                           <List className='w-4 h-4 m-1 text-gray-500' />
                           <ListOrdered className='w-4 h-4 m-1 text-gray-500' />
                        </div>
                     </div>

                     {/* Editor Body with File List */}
                     <div className='border rounded min-h-[180px] p-4 bg-white relative'>
                        <div className='w-3/4 space-y-2'>
                           <div className='flex justify-between items-center bg-gray-100 p-2 text-[11px] border border-gray-200'>
                              <span className='text-gray-700 font-medium'>
                                 Image 1.jpg (500kb)
                              </span>
                              <div className='w-4 h-4 text-gray-400 border rounded-full p-0.5 hover:text-red-500 cursor-pointer' />
                           </div>
                           <div className='flex justify-between items-center bg-gray-100 p-2 text-[11px] border border-gray-200'>
                              <span className='text-gray-700 font-medium'>
                                 Image 2.jpg (410kb)
                              </span>
                              <div className='w-4 h-4 text-gray-400 border rounded-full p-0.5 hover:text-red-500 cursor-pointer' />
                           </div>
                           <div className='flex items-center gap-2 pt-4'>
                              <span className='text-gray-600 font-bold whitespace-nowrap'>
                                 Class Cost
                              </span>
                              <div className='relative w-full'>
                                 <span className='absolute left-2 top-2 text-gray-500 font-bold'>
                                    ₹
                                 </span>
                                 <input
                                    type='text'
                                    value='10000.00'
                                    className='border border-gray-300 px-6 py-1.5 rounded w-full font-bold text-gray-800 focus:outline-teal-500'
                                 />
                              </div>
                           </div>
                        </div>
                        <button className='absolute bottom-4 right-4 bg-indigo-600 text-white px-10 py-1.5 rounded-md font-bold text-xs hover:bg-indigo-700'>
                           Edit
                        </button>
                     </div>
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};

export default TopicAccordion;
