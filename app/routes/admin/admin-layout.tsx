import React from "react";
import { Outlet } from "react-router";

const AdminLayout = () => {
    return (
        <>
        <div className="admin-layout">
            Admin Layout
        </div>
        <Outlet />
        </>
    );
};

export default AdminLayout;