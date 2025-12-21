import { HashRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'


import Signup from './Pages/Signup'
import Login from './Pages/Login'
import AdminLayout from './Layouts/AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import ManageBooks from './Pages/Admin/ManageBooks'
import MemberBooks from './Pages/Member/MemberBooks'
import MemberLayout from './Layouts/MemberLayout'
import BorrowedBooks from './Pages/Member/BorrowedBooks'
import AdminBorrowedBooks from './Pages/Admin/AdminBorrowedBooks'


const App = () => {
  return (
    <HashRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />


        {/* Protected Routes */}  
       <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="ManageBooks" element={<ManageBooks />} />
          <Route path='borrowed' element={<AdminBorrowedBooks/>} />
        </Route>


        <Route
          path='/member' element={<MemberLayout />}>
          <Route index element= {<MemberBooks />} />   
          <Route path='books' element= {<MemberBooks />} />
          <Route path='borrowed' element= {<BorrowedBooks />} />
        </Route>


      </Routes>
    </HashRouter>
  )
}

export default App
