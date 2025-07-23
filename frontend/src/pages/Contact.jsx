import React, { useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/contact", formData);
      setShowSuccessModal(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setShowErrorModal(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/"); // ✅ Redirect uniquement après succès
  };

  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <h2 className="mb-4">Contactez-nous</h2>
        <form onSubmit={handleSubmit}>
          {/* Champs du formulaire */}
          <div className="mb-3">
            <label className="form-label">Nom complet</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Sujet</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Envoyer</button>
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
              <h5 className="modal-title fw-bold">Succès</h5>
              <p>Votre message a été envoyé avec succès.</p>
              <button className="btn btn-success" onClick={handleSuccessClose}>OK</button>
            </div>
          </div>
        </div>
      )}

      {/* ❌ MODAL D'ERREUR */}
      {showErrorModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4">
              <div className="mb-3">
                <div className="rounded-circle bg-danger text-white mx-auto d-flex justify-content-center align-items-center"
                     style={{ width: "50px", height: "50px", fontSize: "24px" }}>
                  ✕
                </div>
              </div>
              <h5 className="modal-title fw-bold text-danger">Erreur</h5>
              <p>Une erreur s'est produite lors de l'envoi du message.</p>
              <button className="btn btn-danger" onClick={() => setShowErrorModal(false)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
