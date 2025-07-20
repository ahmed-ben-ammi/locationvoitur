import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      setMessage(response.data.message);

      // Stocker l'utilisateur
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirection selon le rôle
      const role = response.data.role;
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/cars");
      }

    } catch (err) {
      if (err.response) {
        console.error(err);
        setError(err.response.data.message || 'Erreur lors de la connexion');
      } else {
        setError('Erreur de connexion au serveur');
      }
    }
  };

  return (
<div>
  <Nav/>
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Connexion</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <NavLink to="/register" className="d-block mb-3 text-decoration-none text-primary">
          👉 Créer un compte
        </NavLink>

        <button type="submit" className="btn btn-primary">Se connecter</button>
      </form>
    </div>
</div>
  );
}
