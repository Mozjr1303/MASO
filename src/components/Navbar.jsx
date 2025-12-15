import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle scroll to hash
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    // Helper to determine link destination
    const getLink = (hash) => {
        return location.pathname === '/' ? hash : `/${hash}`;
    };

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return 'active';
        if (path === '/waiting-list' && location.pathname === '/waiting-list') return 'active';
        return '';
    };

    const handleNavClick = () => {
        setIsOpen(false);
    };

    return (
        <header id="header" className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="container header-container">
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <span className={`bar ${isOpen ? 'animate' : ''}`}></span>
                    <span className={`bar ${isOpen ? 'animate' : ''}`}></span>
                    <span className={`bar ${isOpen ? 'animate' : ''}`}></span>
                </div>

                <div id="logo" className="logo">
                    <Link to="/">
                        <img src="/assets/img/maso-icon.png" alt="Maso Awards" />
                    </Link>
                </div>

                {/* Overlay backdrop */}
                <div className={`nav-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>

                <nav className={`navbar ${isOpen ? 'navbar-mobile-active' : ''}`}>
                    <div className="mobile-nav-header">
                        {/* Logo removed to prevent overlap with toggle */}
                        <div style={{ flex: 1 }}></div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
                    </div>
                    <ul className="nav-links">
                        <li><Link className={`nav-link ${isActive('/')}`} to="/" onClick={handleNavClick}>Home</Link></li>
                        <li><Link className="nav-link" to={getLink('#about')} onClick={handleNavClick}>About</Link></li>
                        <li><Link className="nav-link" to={getLink('#news')} onClick={handleNavClick}>News</Link></li>
                        <li><Link className="nav-link" to={getLink('#calendar')} onClick={handleNavClick}>Calendar</Link></li>
                        <li><Link className="nav-link" to={getLink('#gallery')} onClick={handleNavClick}>Gallery</Link></li>
                        <li><Link className="nav-link" to={getLink('#venue')} onClick={handleNavClick}>Venue</Link></li>
                        <li><Link className="nav-link" to={getLink('#partners')} onClick={handleNavClick}>Partners</Link></li>
                        <li><Link className={`nav-link ${isActive('/waiting-list')}`} to="/waiting-list" onClick={handleNavClick}>Waitlist</Link></li>
                        <li><Link className="nav-link" to={getLink('#contact')} onClick={handleNavClick}>Contact</Link></li>
                    </ul>
                </nav>

                <Link className="btn-buy" to="/buy-ticket">Buy Ticket</Link>
            </div>
        </header>
    );
};

export default Navbar;
