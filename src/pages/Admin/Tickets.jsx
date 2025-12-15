import React, { useState, useEffect } from 'react';
import './AdminStyles.css';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/admin/tickets')
            .then(res => res.json())
            .then(data => {
                if (data.message === 'success') setTickets(data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredTickets = tickets.filter(ticket =>
        ticket.ticket_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.holder_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page fade-in-up">
            <div className="page-header-row">
                <h3 className="card-title">Manage Tickets</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search Ticket ID or Name..."
                        style={{
                            padding: '10px',
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            color: '#fff',
                            borderRadius: '6px',
                            minWidth: '250px'
                        }}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button className="btn-primary">Scan QR</button>
                </div>
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Holder Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.length > 0 ? filteredTickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>{ticket.ticket_code}</td>
                                <td>{ticket.holder_name}</td>
                                <td><span style={{
                                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem',
                                    background: ticket.ticket_type === 'vip' ? 'gold' : '#333',
                                    color: ticket.ticket_type === 'vip' ? '#000' : '#fff',
                                    textTransform: 'uppercase'
                                }}>{ticket.ticket_type}</span></td>
                                <td>MK {ticket.price.toLocaleString()}</td>
                                <td>
                                    <span style={{
                                        color: ticket.status === 'active' ? '#00ff7f' : '#ff4d4d'
                                    }}>● {ticket.status}</span>
                                </td>
                                <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn-icon">👁️</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#aaa' }}>No tickets found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tickets;
