import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './CategoryVote.css';

const CategoryVote = () => {
    const { slug } = useParams();
    const [nominees, setNominees] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedNominee, setSelectedNominee] = useState(null);
    const [voteStatus, setVoteStatus] = useState(null); // null, 'voting', 'success', 'error'
    const [paymentData, setPaymentData] = useState({
        payment_method: '',
        mobile_number: ''
    });

    useEffect(() => {
        fetch(`/api/categories/${slug}`)
            .then(res => res.json())
            .then(data => {
                if (data.message === 'success') {
                    setCategory(data.category);
                    setNominees(data.nominees);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching category info:", err);
                setLoading(false);
            });
    }, [slug]);

    const handleVoteClick = (nominee) => {
        setSelectedNominee(nominee);
        document.body.style.overflow = 'hidden';
    };

    const closeVoteModal = () => {
        if (voteStatus === 'voting') return;
        setSelectedNominee(null);
        setVoteStatus(null);
        setPaymentData({ payment_method: '', mobile_number: '' });
        document.body.style.overflow = 'auto';
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setVoteStatus('voting');

        fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nominee_id: selectedNominee.id,
                category_id: category.id, // Assuming category loaded
                amount: 100, // Fixed amount
                payment_method: paymentData.payment_method,
                mobile_number: paymentData.mobile_number
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'success') {
                    setVoteStatus('success');
                    setTimeout(() => {
                        closeVoteModal();
                        // Optionally refresh votes count if we were displaying it
                    }, 3000);
                } else {
                    alert('Vote failed: ' + data.error);
                    setVoteStatus(null);
                }
            })
            .catch(err => {
                console.error(err);
                alert('Vote error');
                setVoteStatus(null);
            });
    };

    const categoryTitle = category ? category.title : (slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Loading...');

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="vote-page-content container">
                <div className="section-header text-center fade-in-up">
                    <h2 className="section-title">{categoryTitle}</h2>
                    <p className="section-subtitle">Choose your favorite nominee</p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', color: '#fff', marginTop: '50px' }}>Loading Nominees...</div>
                ) : (
                    <div className="nominees-grid fade-in-up">
                        {nominees.length > 0 ? nominees.map(nominee => (
                            <div key={nominee.id} className="nominee-card">
                                <div className="nominee-image">
                                    <img src={nominee.image || "/assets/img/user.png"} alt={nominee.name} />
                                </div>
                                <h3 className="nominee-name">{nominee.name}</h3>
                                <button
                                    className="btn-vote"
                                    onClick={() => handleVoteClick(nominee)}
                                >
                                    <span className="icon">✓</span> Vote
                                </button>
                            </div>
                        )) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#aaa' }}>No nominees found for this category.</div>
                        )}
                    </div>
                )}
            </div>

            {selectedNominee && (
                <div className="vote-modal-backdrop" onClick={closeVoteModal}>
                    <div className="vote-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Vote for {selectedNominee.name}</h3>
                            <button className="close-btn" onClick={closeVoteModal}>&times;</button>
                        </div>

                        {voteStatus === 'success' ? (
                            <div className="vote-success">
                                <div className="check-icon">✓</div>
                                <h4>Vote Cast Successfully!</h4>
                                <p>Thank you for voting.</p>
                            </div>
                        ) : voteStatus === 'voting' ? (
                            <div className="vote-loading">
                                <div className="spinner"></div>
                                <p>Processing Payment...</p>
                            </div>
                        ) : (
                            <form className="payment-form" onSubmit={handlePaymentSubmit}>
                                <div className="form-group">
                                    <label>Payment Method</label>
                                    <select
                                        required
                                        value={paymentData.payment_method}
                                        onChange={e => setPaymentData({ ...paymentData, payment_method: e.target.value })}
                                    >
                                        <option value="">Select Method</option>
                                        <option value="airtel">Airtel Money (MK 100)</option>
                                        <option value="mpamba">Mpamba (MK 100)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="09xxxxxxxx"
                                        required
                                        pattern="[0-9]{10}"
                                        value={paymentData.mobile_number}
                                        onChange={e => setPaymentData({ ...paymentData, mobile_number: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn-confirm-vote">
                                    Confirm Vote (MK 100)
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default CategoryVote;
