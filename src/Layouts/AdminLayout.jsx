import React from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='layout'>
        <AdminSidebar />
            <div className="content">
                <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout
