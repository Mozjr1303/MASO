import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
    const location = useLocation();

    // Simple auth check
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
        window.location.href = '/admin/login';
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        window.location.href = '/admin/login';
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <img src="/assets/img/maso-awards.png" alt="Maso Admin" />
                    <h3>Admin Panel</h3>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin/dashboard" className={isActive('/admin/dashboard')}>
                        <span className="icon">📊</span> Dashboard
                    </Link>
                    <Link to="/admin/nominees" className={isActive('/admin/nominees')}>
                        <span className="icon">🎤</span> Nominees
                    </Link>
                    <Link to="/admin/categories" className={isActive('/admin/categories')}>
                        <span className="icon">🏆</span> Categories
                    </Link>
                    <Link to="/admin/votes" className={isActive('/admin/votes')}>
                        <span className="icon">🗳️</span> Votes
                    </Link>
                    <Link to="/admin/tickets" className={isActive('/admin/tickets')}>
                        <span className="icon">🎟️</span> Tickets
                    </Link>
                    <Link to="/admin/waiting-list" className={isActive('/admin/waiting-list')}>
                        <span className="icon">📋</span> Waiting List
                    </Link>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout">
                        <span className="icon">🚪</span> Logout
                    </button>
                </div>
            </aside>
            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-title">
                        <h2>Overview</h2>
                    </div>
                    <div className="header-user">
                        <span>Admin User</span>
                        <div className="avatar">A</div>
                    </div>
                </header>
                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
