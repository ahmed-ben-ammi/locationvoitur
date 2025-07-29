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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      setMessage(response.data);

      localStorage.setItem("user", JSON.stringify(response.data));
      setShowSuccessModal(true);

      const role = response.data.role;
      setTimeout(() => {
        setShowSuccessModal(false);
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/cars");
        }
      }, 2000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Erreur lors de la connexion');
      } else {
        setError('Erreur de connexion au serveur');
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-5" style={{ maxWidth: '420px' }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Connexion</h2>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@mail.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">Mot de passe</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          <NavLink to="/register" className="d-block mb-3 text-decoration-none text-primary fw-semibold">
            👉 Créer un compte
          </NavLink>

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Se connecter
          </button>
        </form>
      </div>

      {/* Modal Succès */}
      {showSuccessModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4 position-relative">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                aria-label="Close"
                onClick={() => setShowSuccessModal(false)}
              />
              <div className="mb-3">
                <div className="rounded-circle bg-success text-white mx-auto d-flex justify-content-center align-items-center"
                  style={{ width: "60px", height: "60px", fontSize: "28px" }}>
                  ✓
                </div>
              </div>
              <h5 className="modal-title fw-bold">Connexion réussie</h5>
              <p>Bienvenue ! Redirection en cours...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
