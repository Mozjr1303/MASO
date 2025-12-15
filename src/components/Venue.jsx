import React from 'react';
import './Venue.css';

const Venue = () => {
    return (
        <section id="venue" className="venue-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Event Venue</h2>
                    <p className="section-subtitle">Join us at the heart of Lilongwe</p>
                </div>

                <div className="venue-content">
                    <div className="venue-map-wrapper fade-in-up">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.032487744444!2d33.79062477514622!3d-13.954184480342663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d34c7bb9a083%3A0x4694987eaa1748e1!2sBingu%20International%20Convention%20Center!5e1!3m2!1sen!2smw!4v1758358566962!5m2!1sen!2smw"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="BICC Location"
                        ></iframe>
                    </div>

                    <div className="venue-info fade-in-up">
                        <div className="info-card">
                            <h3>BICC (Bingu International Convention Centre)</h3>
                            <p>
                                The Bingu Wa Mutharika International Convention Centre (BICC) is Malawi's premier venue
                                for international conferences and prestigious events. Located in the business center
                                of Malawi in the capital city of Lilongwe, this convention center is easily accessible
                                and stands as a beacon of modern infrastructure in the warm heart of Africa.
                            </p>

                            <div className="venue-details">
                                <div className="detail-row">
                                    <span className="icon">📍</span>
                                    <span>Presidential Way, Lilongwe, Malawi</span>
                                </div>
                                <div className="detail-row">
                                    <span className="icon">🚗</span>
                                    <span>Ample Parking Available</span>
                                </div>
                                <div className="detail-row">
                                    <span className="icon">🏨</span>
                                    <span>Close to Umodzi Park Hotel</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Venue;
