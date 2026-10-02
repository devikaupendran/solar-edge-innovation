import React, { useState, useEffect } from 'react';
import { AdminLogin } from '../components/admin/AdminLogin';
import { QuotationEditor } from '../components/admin/QuotationEditor';

const AdminPage = () => {
    // Session state for frontend admin login
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('solar_admin_auth') === 'true';
    });

    const handleLoginSuccess = () => {
        sessionStorage.setItem('solar_admin_auth', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('solar_admin_auth');
        setIsAuthenticated(false);
    };

    return (
        <div className="w-full min-h-screen bg-white">
            {isAuthenticated ? (
                <QuotationEditor onLogout={handleLogout} />
            ) : (
                <AdminLogin onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
};

export default AdminPage;
