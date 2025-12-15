import React, { useState, useEffect } from 'react';
import './AdminStyles.css';

const Nominees = () => {
    const [nominees, setNominees] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageState, setPageState] = useState('list'); // 'list' or 'add'

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
        image: '/assets/img/user.png'
    });

    const fetchNominees = async () => {
        try {
            const res = await fetch('/api/nominees');
            const data = await res.json();
            if (data.message === 'success') setNominees(data.data);

            const catRes = await fetch('/api/categories');
            const catData = await catRes.json();
            if (catData.message === 'success') setCategories(catData.data);

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNominees();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this nominee?")) return;

        try {
            await fetch(`/api/nominees/${id}`, { method: 'DELETE' });
            setNominees(nominees.filter(n => n.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/nominees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.message === 'success') {
                setPageState('list');
                setFormData({ name: '', category_id: '', image: '/assets/img/user.png' });
                fetchNominees();
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="admin-loading">Loading...</div>;

    return (
        <div className="admin-page fade-in-up">
            {pageState === 'list' ? (
                <>
                    <div className="page-header-row">
                        <h3 className="card-title">Manage Nominees</h3>
                        <button className="btn-primary" onClick={() => setPageState('add')}>
                            + Add Nominee
                        </button>
                    </div>

                    <div className="admin-card">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Votes</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nominees.map(nominee => (
                                    <tr key={nominee.id}>
                                        <td>
                                            <img src={nominee.image} alt="" className="table-img" />
                                        </td>
                                        <td>{nominee.name}</td>
                                        <td>{nominee.category_name}</td>
                                        <td>{nominee.votes}</td>
                                        <td>
                                            <button className="btn-icon delete" onClick={() => handleDelete(nominee.id)}>
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="admin-card form-card">
                    <div className="card-header">
                        <h3>Add New Nominee</h3>
                        <button className="btn-text" onClick={() => setPageState('list')}>Cancel</button>
                    </div>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label>Nominee Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                required
                                value={formData.category_id}
                                onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Image URL (Optional)</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn-primary full-width">Save Nominee</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Nominees;
