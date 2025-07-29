import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setShowSuccessModal(false);
    setShowErrorModal(false);

    if (!isValidPassword(formData.password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
      setShowErrorModal(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      setMessage(response.data.message || "Inscription réussie !");
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/login');
      }, 2000);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Erreur lors de l’inscription');
      } else {
        setError('Erreur de connexion au serveur');
      }
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-5" style={{ maxWidth: '420px' }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Inscription</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Nom</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Votre nom complet"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="exemple@mail.com"
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
              required
              placeholder="********"
            />
            <div className="form-text text-muted small">
              Minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            S'inscrire
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
              ></button>
              <div className="mb-3">
                <div className="rounded-circle bg-success text-white mx-auto d-flex justify-content-center align-items-center"
                  style={{ width: "60px", height: "60px", fontSize: "28px" }}>
                  ✓
                </div>
              </div>
              <h5 className="modal-title fw-bold">Inscription réussie</h5>
              <p>{message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Erreur */}
      {showErrorModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4 position-relative">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                aria-label="Close"
                onClick={() => setShowErrorModal(false)}
              ></button>
              <div className="mb-3">
                <div className="rounded-circle bg-danger text-white mx-auto d-flex justify-content-center align-items-center"
                  style={{ width: "60px", height: "60px", fontSize: "28px" }}>
                  !
                </div>
              </div>
              <h5 className="modal-title fw-bold">Erreur</h5>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
