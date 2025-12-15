import React, { useState, useEffect } from 'react';
import './AdminStyles.css';

const WaitingListAdmin = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/waiting-list')
            .then(res => res.json())
            .then(data => {
                if (data.message === 'success') setList(data.data);
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
                <h3 className="card-title">Waiting List</h3>
                <button className="btn-secondary">Export CSV</button>
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Preferred Ticket</th>
                            <th>Date</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length > 0 ? list.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.mobile}</td>
                                <td>{item.email}</td>
                                <td style={{ textTransform: 'capitalize' }}>{item.ticket_type}</td>
                                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                <td>
                                    {item.verified ?
                                        <span className="status-badge success">Yes</span> :
                                        <span className="status-badge pending">No</span>
                                    }
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#aaa' }}>No waiting list entries</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WaitingListAdmin;
