import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
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

  const isValidPassword = (password) => {
    // 8 caractères min, au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!isValidPassword(formData.password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (ex: @, #, !)');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      setMessage(response.data.message);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Erreur lors de l’inscription');
      } else {
        setError('Erreur de connexion au serveur');
      }
    }
  };

  return (
   <div>
    <Nav/>
     <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Inscription</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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
          <small className="form-text text-muted">
            Minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (@, #, !, etc.)
          </small>
        </div>

        <button type="submit" className="btn btn-primary">S'inscrire</button>
      </form>
    </div>
   </div>
  );
}
