import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Modifier() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    registration: '',
    price_per_day: '',
    status: 'available',
    image_url: '',
    description: '',
    available: true,
    year: '',
    mileage: '',
    fuel_type: '',
    transmission: '',
    seats: '',
    created_at: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/cars/${id}`)
      .then(res => {
        setFormData(res.data);
        setImagePreview(`http://localhost:3000/images/${res.data.image_url}`);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur de chargement:', err);
        setMessage("Erreur lors du chargement de la voiture.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    if (selectedImage) {
      data.append('image', selectedImage);
    }

    axios.put(`http://localhost:3000/cars/${id}`, data)
      .then(() => {
        setMessage('✅ Voiture mise à jour avec succès');
        setTimeout(() => navigate('/admin'), 1500);
      })
      .catch(err => {
        console.error('Erreur lors de la mise à jour:', err);
        setMessage('❌ Erreur lors de la modification');
      });
  };

  if (loading) return <div className="text-center mt-5 fs-4">Chargement...</div>;

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4 text-center text-primary">Modifier la voiture</h2>

      {message && (
        <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} text-center`}>
          {message}
        </div>
      )}

      {imagePreview && (
        <div className="mb-4 text-center">
          <img
            src={imagePreview}
            alt="Voiture"
            className="img-thumbnail rounded"
            style={{ maxHeight: '220px', objectFit: 'cover', width: '100%' }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="needs-validation" noValidate>
        {/* Group 1: Infos générales */}
        <div className="row g-3 mb-3">
          {[
            { label: "Marque", name: "brand" },
            { label: "Modèle", name: "model" },
            { label: "Immatriculation", name: "registration" },
          ].map(({ label, name }) => (
            <div className="col-12" key={name}>
              <label className="form-label fw-semibold">{label}</label>
              <input
                type="text"
                className="form-control"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Ce champ est requis.</div>
            </div>
          ))}
        </div>

        {/* Group 2: Détails techniques */}
        <div className="row g-3 mb-3">
          {[
            { label: "Prix par jour (DH)", name: "price_per_day", type: "number" },
            { label: "Année", name: "year", type: "number" },
            { label: "Kilométrage (km)", name: "mileage", type: "number" },
            { label: "Nombre de places", name: "seats", type: "number" },
          ].map(({ label, name, type }) => (
            <div className="col-md-6" key={name}>
              <label className="form-label fw-semibold">{label}</label>
              <input
                type={type}
                className="form-control"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                min="0"
              />
              <div className="invalid-feedback">Veuillez entrer une valeur valide.</div>
            </div>
          ))}
        </div>

        {/* Group 3: Sélections */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Type de carburant</label>
            <select
              className="form-select"
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              required
            >
              <option value="">-- Choisir --</option>
              <option value="essence">Essence</option>
              <option value="diesel">Diesel</option>
              <option value="electrique">Électrique</option>
              <option value="hybride">Hybride</option>
            </select>
            <div className="invalid-feedback">Veuillez sélectionner un type de carburant.</div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Transmission</label>
            <select
              className="form-select"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              required
            >
              <option value="">-- Choisir --</option>
              <option value="automatique">Automatique</option>
              <option value="manuelle">Manuelle</option>
            </select>
            <div className="invalid-feedback">Veuillez sélectionner une transmission.</div>
          </div>
        </div>

        {/* Statut */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Statut</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="available">Disponible</option>
            <option value="rented">Louée</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <div className="invalid-feedback">Veuillez sélectionner un statut.</div>
        </div>

        {/* Disponible */}
        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            id="availableSwitch"
          />
          <label className="form-check-label fw-semibold" htmlFor="availableSwitch">
            Disponible ?
          </label>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Date création (readonly) */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Date de création</label>
          <input
            type="text"
            className="form-control"
            value={formData.created_at}
            readOnly
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success btn-lg fw-semibold">
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}
