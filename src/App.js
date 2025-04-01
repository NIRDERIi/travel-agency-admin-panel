import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OfferForm from './components/OfferForm';
import OfferList from './components/OfferList';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/">כל ההצעות</Link>
          <Link to="/create">➕ הצעה חדשה</Link>
        </nav>

        <Routes>
          <Route path="/" element={<OfferList />} />
          <Route path="/create" element={<OfferForm />} />
          <Route path="/edit/:slug" element={<OfferForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
