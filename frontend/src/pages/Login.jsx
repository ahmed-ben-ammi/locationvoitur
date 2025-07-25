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
      setMessage(response.data);

      // 🔍 DEBUG pour vérifier le contenu
      console.log("Réponse complète :", response.data);

      // 🗂️ Stockage de l'utilisateur selon structure
      localStorage.setItem("user", JSON.stringify(response.data));

      // ✅ Affichage du modal
      setShowSuccessModal(true);

      // ⏳ Redirection après un court délai
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
        console.error(err);
        setError(err.response.data.message || 'Erreur lors de la connexion');
      } else {
        setError('Erreur de connexion au serveur');
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <h2>Connexion</h2>
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

      {/* ✅ MODAL DE SUCCÈS */}
      {showSuccessModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4">
              <div className="mb-3">
                <div className="rounded-circle bg-success text-white mx-auto d-flex justify-content-center align-items-center"
                     style={{ width: "50px", height: "50px", fontSize: "24px" }}>
                  ✓
                </div>
              </div>
              <h5 className="modal-title fw-bold">Connexion réussie</h5>
              <p>Bienvenue ! Redirection en cours...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
