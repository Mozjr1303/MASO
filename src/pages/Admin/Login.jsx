import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock Login for now
        if (credentials.email === 'admin@maso.com' && credentials.password === 'admin') {
            localStorage.setItem('isAdmin', 'true');
            window.location.href = '/admin/dashboard';
        } else {
            alert('Invalid credentials (Try admin@maso.com / admin)');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container fade-in-up">
                <div className="login-header">
                    <img src="/assets/img/maso-awards.png" alt="Maso Awards" className="login-logo" />
                    <h2>Admin Portal</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                    <div className="login-footer">
                        <a href="/">Back to Website</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
