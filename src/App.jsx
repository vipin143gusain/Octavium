/** @format */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // your login component
import RecoverAccount from './components/RecoverAccount'; // code above
import ResetPassword from './components/ResetPassword';
import ResetSuccess from './components/ResetSuccess';
import Dashboard from './components/Dashboard';
import StudentInfoForm from './components/StudentInfoForm';
import ParentInfoForm from './components/ParentInfoForm';
import OrganizationEditPage from './components/OrganizationEditPage';
import OrganizationViewPage from './components/OrganizationViewPage';
import { AdminSuperAdminPage } from './components/AdminSuperAdminPage';
import { CompanyListPage } from './components/CompanyListPage';
import { CompanyListSelectedPage } from './components/CompanyListWhenUserClickAnyOrganization';

export default function App() {
   return (
      <div className='min-h-screen bg-[#290062] flex items-center justify-center font-roboto'>
         <Router>
            <Routes>
               <Route path='/' element={<Login />} />
               <Route path='/forgot-password' element={<RecoverAccount />} />
               <Route path='/reset-password' element={<ResetPassword />} />
               <Route path='/reset-success' element={<ResetSuccess />} />
               <Route path='/dashboard' element={<Dashboard />} />
               {/* <Route path='/student-info-form' element={<StudentInfoForm />} /> */}
               {/* <Route
                  path='/student-info-form/:hashId'
                  element={<StudentInfoForm />}
               /> */}
               {/* Create Mode */}
               <Route path='/student-info-form' element={<StudentInfoForm />} />
               {/* View/Edit Mode */}
               <Route
                  path='/student-info-form/:hashId'
                  element={<StudentInfoForm />}
               />
               <Route path='/parent-info-form' element={<ParentInfoForm />} />
               <Route
                  path='/organization-edit-page'
                  element={<OrganizationEditPage />}
               />

               <Route
                  path='/organization-view-page'
                  element={<OrganizationViewPage />}
               />

               <Route
                  path='/admin-super-page'
                  element={<AdminSuperAdminPage />}
               />
               <Route path='/company-list-page' element={<CompanyListPage />} />
               <Route path='/company-list-page' element={<CompanyListPage />} />
               <Route
                  path='/company-list-selected-page'
                  element={<CompanyListSelectedPage />}
               />
            </Routes>
         </Router>
      </div>
   );
}
