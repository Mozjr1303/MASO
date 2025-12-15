import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './CategoryNominate.css';

const CategoryNominate = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const [nomineeName, setNomineeName] = useState('');
    const [evidenceLink, setEvidenceLink] = useState('');
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetch(`/api/categories/${slug}`)
            .then(res => res.json())
            .then(data => {
                if (data.message === 'success') {
                    setCategory(data.category);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching category info:", err);
                setLoading(false);
            });
    }, [slug]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        fetch('/api/nominate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category_id: category ? category.id : null,
                nominee_name: nomineeName,
                evidence_link: evidenceLink,
                reason: reason
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'success') {
                    setStatus('success');
                    setTimeout(() => {
                        setStatus(null);
                        setNomineeName('');
                        setEvidenceLink('');
                        setReason('');
                    }, 3000);
                } else {
                    alert('Nomination failed');
                    setStatus(null);
                }
            })
            .catch(err => {
                console.error(err);
                alert('Nomination failed');
                setStatus(null);
            });
    };

    const categoryTitle = category ? category.title : (slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Loading...');

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="nominate-page-content container">
                <div className="section-header text-center fade-in-up">
                    <h2 className="section-title">{categoryTitle}</h2>
                    <p className="section-subtitle">Nominate a deserving candidate</p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', color: '#fff' }}>Loading...</div>
                ) : (
                    <div className="nomination-form-wrapper fade-in-up">
                        {status === 'success' ? (
                            <div className="success-message">
                                <div className="check-icon">✓</div>
                                <h3>Nomination Submitted!</h3>
                                <p>Thank you for submitting your nomination.</p>
                            </div>
                        ) : (
                            <form className="nomination-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Nominee Name</label>
                                    <input
                                        type="text"
                                        value={nomineeName}
                                        onChange={e => setNomineeName(e.target.value)}
                                        required
                                        placeholder="Enter artist or entity name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Link to Work (YouTube, Social Media, etc.)</label>
                                    <input
                                        type="url"
                                        value={evidenceLink}
                                        onChange={e => setEvidenceLink(e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Reason for Nomination</label>
                                    <textarea
                                        value={reason}
                                        onChange={e => setReason(e.target.value)}
                                        required
                                        placeholder="Why do they deserve this award?"
                                        rows="4"
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Submitting...' : 'Submit Nomination'}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CategoryNominate;
