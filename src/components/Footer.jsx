import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-column">
                            <h4>Useful Links</h4>
                            <ul className="footer-links">
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#news">News</a></li>
                                <li><a href="/nominate">Nominate</a></li>
                                <li><a href="/vote">Vote</a></li>
                                <li><a href="/waiting-list">Waiting List</a></li>
                            </ul>
                        </div>

                        <div className="footer-column text-center">
                            <img src="/assets/img/maso-awards.png" alt="Maso Awards" className="footer-logo" />
                        </div>

                        <div className="footer-column">
                            <h4>Contact Us</h4>
                            <p>
                                Chichiri, Blantyre, Malawi<br />
                                <strong>Phone:</strong> +265 884 41 21 72<br />
                                <strong>Email:</strong> info@maso-awards.live
                            </p>
                            <div className="social-links">
                                <a href="#" className="social-icon">Twitter</a>
                                <a href="#" className="social-icon">Facebook</a>
                                <a href="#" className="social-icon">Instagram</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong>MASO Awards</strong>. All Rights Reserved
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
