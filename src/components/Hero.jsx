import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            <div className="hero-bg">
                <div className="gradient-sphere"></div>
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-text fade-in-up">
                        <h1 className="hero-title">MASO AWARDS</h1>
                        <p className="hero-subtitle">
                            Be part of the biggest music and arts awards show in Malawi.<br />
                            Experience the glitz and glamour at Maso Awards 2025!
                        </p>

                        <div className="hero-buttons">
                            <a href="/waiting-list" className="btn-hero-primary">Join Waiting List</a>
                            <a href="/vote" className="btn-hero-secondary">Vote Now</a>
                        </div>

                        <div className="hero-details">
                            <div className="detail-item">
                                <span className="icon">📅</span>
                                <div className="text">
                                    <span className="main">Dec 13</span>
                                    <span className="sub">2025</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <span className="icon">⏰</span>
                                <div className="text">
                                    <span className="main">06:00</span>
                                    <span className="sub">PM</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <span className="icon">📍</span>
                                <div className="text">
                                    <span className="main">BICC</span>
                                    <span className="sub">Presidential Hall</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <span className="icon">🏆</span>
                                <div className="text">
                                    <span className="main">6+</span>
                                    <span className="sub">Awards</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-image fade-in-up delay-100">
                        <div className="image-wrapper">
                            <img src="/assets/img/maso-awards.png" alt="Maso Awards Trophy" className="floating-image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
