import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Contact Us</h2>
                </div>

                <div className="contact-grid">
                    <div className="contact-item fade-in-up">
                        <div className="contact-icon">📍</div>
                        <h3>Address</h3>
                        <p>Chichiri, Blantyre, Malawi</p>
                    </div>

                    <div className="contact-item fade-in-up">
                        <div className="contact-icon">📞</div>
                        <h3>Phone Number</h3>
                        <p><a href="tel:+265884085995">+265 884 085 995</a></p>
                    </div>

                    <div className="contact-item fade-in-up">
                        <div className="contact-icon">✉️</div>
                        <h3>Email</h3>
                        <p><a href="mailto:info@maso-awards.live">info@maso-awards.live</a></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
