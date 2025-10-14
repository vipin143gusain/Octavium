/** @format */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // your login component
import RecoverAccount from './components/RecoverAccount'; // code above
import ResetPassword from './components/ResetPassword';
import ResetSuccess from './components/ResetSuccess';
import Dashboard from './components/Dashboard';
import StudentInfoForm from './components/StudentInfoForm';

export default function App() {
   return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
         <Router>
            <Routes>
               <Route path='/' element={<Login />} />
               <Route path='/forgot-password' element={<RecoverAccount />} />
               <Route path='/reset-password' element={<ResetPassword />} />
               <Route path='/reset-success' element={<ResetSuccess />} />

               <Route path='/dashboard' element={<Dashboard />} />
               <Route path='/student-info-form' element={<StudentInfoForm />} />
            </Routes>
         </Router>
      </div>
   );
}
