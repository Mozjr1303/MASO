import React, { useState, useEffect } from 'react';
import './AdminStyles.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.message === 'success') setCategories(data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="admin-page fade-in-up">
            <div className="page-header-row">
                <h3 className="card-title">Vote Categories</h3>
                <button className="btn-primary" disabled>+ Add Category (Demo)</button>
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Icon</th>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id}>
                                <td>
                                    <div style={{
                                        width: '40px', height: '40px',
                                        background: '#333', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        borderRadius: '8px'
                                    }}>
                                        ⭐
                                    </div>
                                </td>
                                <td style={{ fontWeight: '600' }}>{cat.title}</td>
                                <td style={{ color: '#aaa', fontStyle: 'italic' }}>{cat.slug}</td>
                                <td>
                                    <button className="btn-icon">✏️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;
