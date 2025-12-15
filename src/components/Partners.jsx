import React from 'react';
import './Partners.css';

const Partners = () => {
    const partners = [
        "1760179099.png",
        "1763266990.jpg",
        "1763267173.jpg",
        "Ignition.png",
        "LOGO BOX.png",
        "alpha-creations.png",
        "maso-white.png",
        "ndix-ent.png",
        "umatha-daily.png"
    ];

    return (
        <section id="partners" className="partners-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Partners</h2>
                </div>

                <div className="partners-grid">
                    {partners.map((partner, index) => (
                        <div key={index} className="partner-logo fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <img src={`/assets/img/partners/${partner}`} alt="Partner" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
