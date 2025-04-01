import React, { useState } from 'react';
import './LoginPage.css';

const VALID_USERNAME = process.env.REACT_APP_ADMIN_USERNAME;
const VALID_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;


function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username === VALID_USERNAME && form.password === VALID_PASSWORD) {
      localStorage.setItem("admin-auth", "true");
      onLogin();
    } else {
      setError("❌ שם משתמש או סיסמה שגויים");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">היכנס</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginPage;
