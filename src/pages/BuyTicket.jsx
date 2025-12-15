import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './BuyTicket.css';

const BuyTicket = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ticketType: '',
        paymentMethod: '',
        mobile: '',
        promoCode: ''
    });

    const [status, setStatus] = useState(null); // null, 'loading', 'success', 'error'
    const [ticketUrl, setTicketUrl] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        fetch('/api/buy-ticket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'success') {
                    setStatus('success');
                    setTicketUrl(data.ticket_url);
                } else {
                    alert('Purchase failed');
                    setStatus(null);
                }
            })
            .catch(err => {
                console.error(err);
                alert('Purchase error');
                setStatus(null);
            });
    };

    const getPrice = () => {
        if (formData.ticketType === 'standard') return 'MK 20,000';
        if (formData.ticketType === 'vip') return 'MK 70,000';
        return '';
    };

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="buy-ticket-content container">
                <div className="section-header text-center fade-in-up">
                    <h2 className="section-title">Buy Tickets</h2>
                    <p className="section-subtitle">Secure your spot at the biggest event of the year</p>
                </div>

                <div className="ticket-form-wrapper fade-in-up">
                    {status === 'success' ? (
                        <div className="success-message">
                            <div className="check-icon">✓</div>
                            <h3>Ticket Purchased Successfully!</h3>
                            <p>Thank you, {formData.name}. Your ticket is ready.</p>
                            <a href={ticketUrl} download className="btn-download">Download Ticket</a>
                            <button className="btn-secondary" onClick={() => setStatus(null)}>Buy Another</button>
                        </div>
                    ) : (
                        <form className="ticket-form" onSubmit={handleSubmit}>
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
                                <label>Email Address (Optional)</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="For ticket confirmation"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ticket Type</label>
                                    <select
                                        name="ticketType"
                                        value={formData.ticketType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Ticket</option>
                                        <option value="standard">Standard (MK 20,000)</option>
                                        <option value="vip">VIP (MK 70,000)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Payment Method</label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Method</option>
                                        <option value="tnm">Mpamba</option>
                                        <option value="airtel">Airtel Money</option>
                                    </select>
                                </div>
                            </div>

                            {formData.paymentMethod && (
                                <div className="form-group slide-down">
                                    <label>Mobile Number ({formData.paymentMethod === 'tnm' ? 'Mpamba' : 'Airtel Money'})</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        required
                                        placeholder={formData.paymentMethod === 'tnm' ? '08xxxxxxxx' : '09xxxxxxxx'}
                                        pattern="[0-9]{10}"
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label>Promo Code (Optional)</label>
                                <input
                                    type="text"
                                    name="promoCode"
                                    value={formData.promoCode}
                                    onChange={handleInputChange}
                                    placeholder="Enter code"
                                />
                            </div>

                            <button type="submit" className="btn-submit" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Processing...' : `Pay ${getPrice()}`}
                            </button>

                            <p className="contact-help">For inquiries, contact +265 998 41 24 21</p>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BuyTicket;
