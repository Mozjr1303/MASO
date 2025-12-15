import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Nominate.css';

const Nominate = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.message === 'success') {
                    setCategories(data.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching categories:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="page-wrapper user-select-none">
            <Navbar />
            <div className="nominate-page-content container">
                <div className="section-header text-center fade-in-up">
                    <h2 className="section-title">Nominate</h2>
                    <p className="section-subtitle">Select a category to submit a nomination</p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', color: '#fff', marginTop: '50px' }}>Loading Categories...</div>
                ) : (
                    <div className="categories-grid fade-in-up">
                        {categories.map((category) => (
                            <a key={category.id} href={`/nominate/${category.slug}`} className="category-card">
                                <div className="category-icon">
                                    <img src={category.icon || "/assets/img/category-star.png"} alt={category.title} />
                                </div>
                                <h3 className="category-title">{category.title}</h3>
                            </a>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Nominate;
