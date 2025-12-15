import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './WaitingList.css';

const WaitingList = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        ticketType: '',
        email: ''
    });

    const [status, setStatus] = useState(null); // null, 'submitting', 'success', 'error'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/waiting-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.message === 'success') {
                setStatus('success');
                setFormData({ name: '', mobile: '', ticketType: '', email: '' });
            } else {
                setStatus('error');
                alert('Server Error: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            alert('Submission Error: ' + error.message);
        }
    };

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="waiting-list-content container">
                <div className="section-header text-center fade-in-up">
                    <h2 className="section-title">Join Waiting List</h2>
                    <p className="section-subtitle">Be the first to know when more tickets become available</p>
                </div>

                <div className="waiting-list-form-wrapper fade-in-up">
                    {status === 'success' ? (
                        <div className="success-message">
                            <div className="check-icon">✓</div>
                            <h3>You're on the list!</h3>
                            <p>We'll notify you via email when tickets are available.</p>
                            <button className="btn-secondary" onClick={() => setStatus(null)}>Add Another Person</button>
                        </div>
                    ) : (
                        <form className="waiting-list-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter mobile number"
                                />
                            </div>

                            <div className="form-group">
                                <label>Ticket Type Preferred</label>
                                <select
                                    name="ticketType"
                                    value={formData.ticketType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Ticket Type</option>
                                    <option value="standard">Standard</option>
                                    <option value="vip">VIP</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter email address"
                                />
                            </div>

                            <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Joining...' : 'Join The Waitlist'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default WaitingList;
