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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      setMessage(response.data.message);
      setShowSuccessModal(true);
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
    <div>
      <Nav />
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <h2>Inscription</h2>

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
              Minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
            </small>
          </div>

          <button type="submit" className="btn btn-primary">S'inscrire</button>
        </form>
      </div>

      {/* ✅ MODAL DE SUCCÈS */}
      {showSuccessModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4 position-relative">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                onClick={() => setShowSuccessModal(false)}
              ></button>
              <div className="mb-3">
                <div className="rounded-circle bg-success text-white mx-auto d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px", fontSize: "24px" }}>
                  ✓
                </div>
              </div>
              <h5 className="modal-title fw-bold">Inscription réussie</h5>
              <p>{message}</p>
            </div>
          </div>
        </div>
      )}

      {/* ❌ MODAL D’ERREUR */}
      {showErrorModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4 position-relative">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                onClick={() => setShowErrorModal(false)}
              ></button>
              <div className="mb-3">
                <div className="rounded-circle bg-danger text-white mx-auto d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px", fontSize: "24px" }}>
                  !
                </div>
              </div>
              <h5 className="modal-title fw-bold">Erreur</h5>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
