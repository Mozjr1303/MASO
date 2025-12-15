import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [recentVotes, setRecentVotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await fetch('/api/admin/stats');
                const statsData = await statsRes.json();
                if (statsData.message === 'success') setStats(statsData.data);

                const votesRes = await fetch('/api/admin/recent-votes');
                const votesData = await votesRes.json();
                if (votesData.message === 'success') setRecentVotes(votesData.data);

                setLoading(false);
            } catch (error) {
                console.error("Dashboard fetch error:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div style={{ padding: '20px', color: '#fff' }}>Loading Dashboard...</div>;

    return (
        <div className="admin-dashboard fade-in-up">
            <div className="dashboard-grid">
                {stats.length > 0 ? stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <h3>{stat.title}</h3>
                        <div className="value">{stat.value}</div>
                        <div style={{ color: stat.change.startsWith('+') ? '#00ff7f' : '#aaa', fontSize: '0.9rem', marginTop: '5px' }}>
                            {stat.change} from last week
                        </div>
                    </div>
                )) : (
                    <div style={{ color: '#aaa' }}>No stats available</div>
                )}
            </div>

            <div className="recent-table-card">
                <h3 className="card-title">Recent Votes</h3>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nominee</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentVotes.length > 0 ? recentVotes.map(vote => (
                            <tr key={vote.id}>
                                <td>{vote.nominee}</td>
                                <td>{vote.category}</td>
                                <td>MK {vote.amount}</td>
                                <td>{new Date(vote.time).toLocaleString()}</td>
                                <td><span className="status-badge success">Verified</span></td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No recent votes</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
