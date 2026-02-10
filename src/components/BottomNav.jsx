import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <img src="/assets/img/maso-icon.png" alt="Home" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/vote" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <img src="/assets/img/vote.png" alt="Vote" />
        <span>Vote</span>
      </NavLink>
      <NavLink to="/nominate" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <img src="/assets/img/nominee.png" alt="Nominate" />
        <span>Nominate</span>
      </NavLink>
      <NavLink to="/buy-ticket" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <img src="/assets/img/standard-ticket.png" alt="Tickets" />
        <span>Tickets</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
