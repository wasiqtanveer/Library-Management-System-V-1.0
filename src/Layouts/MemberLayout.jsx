import React from "react";
import { Outlet } from "react-router-dom";
import MemberSidebar from "../Components/MemberSidebar";
import "../styles/auth.css";

const MemberLayout = () => {
  return (
    <div className="layout">
      <MemberSidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;