import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="about-grid">
                    <div className="about-content">
                        <h2 className="section-title">About Maso Awards</h2>
                        <p className="about-text">
                            Established in 2021 by Maso Enterprises, the Maso Awards honor and recognize exceptional
                            artistic talent across Malawi. With a reputation for credibility and inclusivity, the awards provide
                            equal opportunities for artists from all genres.
                        </p>
                        <p className="about-text">
                            Our vision is to position the Maso Awards as the leading arts and entertainment platform in Malawi and Africa,
                            fostering growth, innovation, and sustained excellence within the creative sector.
                        </p>

                        <div className="mission-box">
                            <h3>Our Mission</h3>
                            <p>
                                To empower artists by recognizing and celebrating outstanding talent. The Maso Awards annual
                                ceremony not only honors artistic excellence but also provides a stage for artists to showcase
                                their creativity through performances.
                            </p>
                        </div>
                    </div>

                    <div className="about-stats-gallery">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-number">50+</div>
                                <div className="stat-label">Artists Honored</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">30+</div>
                                <div className="stat-label">Award Categories</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">10+</div>
                                <div className="stat-label">Partners</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">5</div>
                                <div className="stat-label">Years Running</div>
                            </div>
                        </div>

                        <div className="about-features">
                            <div className="feature-item">
                                <img src="/assets/img/trophy.png" alt="Excellence" />
                                <div>
                                    <h4>Excellence Recognition</h4>
                                    <p>Celebrating outstanding achievements</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <img src="/assets/img/star.png" alt="Leaders" />
                                <div>
                                    <h4>Industry Leaders</h4>
                                    <p>Influential voices in entertainment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
