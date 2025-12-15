import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
    // List of images from the directory
    const images = [
        "maso-20230704-133419.jpg",
        "maso-20230704-133434.jpg",
        "maso-20230704-133444.jpg",
        "maso-20230704-133454.jpg",
        "maso-20230704-133619.jpg",
        "maso-20230704-133631.jpg",
        "maso-20230704-133735.jpg",
        "maso-20230704-134121.jpg",
        "maso-20230704-134136.jpg",
        "maso-20230704-134147.jpg",
        "maso-20230704-134225.jpg",
        "maso-20230704-134300.jpg"
    ];

    const [selectedImage, setSelectedImage] = useState(null);

    const openLightbox = (img) => {
        setSelectedImage(img);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section id="gallery" className="gallery-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Gallery</h2>
                    <p className="section-subtitle">Highlights from our previous events</p>
                </div>

                <div className="gallery-grid">
                    {images.map((img, index) => (
                        <div key={index} className="gallery-item fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <img
                                src={`/assets/img/gallery/${img}`}
                                alt={`Gallery ${index + 1}`}
                                onClick={() => openLightbox(img)}
                            />
                            <div className="gallery-overlay" onClick={() => openLightbox(img)}>
                                <span className="zoom-icon">+</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <img src={`/assets/img/gallery/${selectedImage}`} alt="Full size" />
                        <button className="close-btn" onClick={closeLightbox}>&times;</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
