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

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    axios.get(`http://localhost:3000/cars/${id}`)
      .then(res => {
        setFormData(res.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/cars/${id}`, formData)
      .then(() => {
        setMessage('✅ Voiture mise à jour avec succès');
        setTimeout(() => navigate('/admin'), 1500);
      })
      .catch(err => {
        console.error('Erreur lors de la mise à jour:', err);
        setMessage(' Erreur lors de la modification');
      });
  };

  if (loading) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Modifier la voiture</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        {/* Champs modifiables */}
        {[
          { label: "Marque", name: "brand" },
          { label: "Modèle", name: "model" },
          { label: "Immatriculation", name: "registration" },
          { label: "Prix par jour (DH)", name: "price_per_day", type: "number" },
          { label: "Année", name: "year", type: "number" },
          { label: "Kilométrage", name: "mileage", type: "number" },
          { label: "Nombre de places", name: "seats", type: "number" },
          { label: "Image (URL)", name: "image_url" },
        ].map(({ label, name, type = "text" }) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              className="form-control"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {/* Statut */}
        <div className="mb-3">
          <label className="form-label">Statut</label>
          <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
            <option value="available">available</option>
            <option value="rented">rented</option>
            <option value="maintenance">maintenance</option>
          </select>
        </div>

        {/* available */}
        <div className="mb-3">
          <label className="form-label">available ?</label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            <label className="form-check-label">{formData.available ? 'Oui' : 'Non'}</label>
          </div>
        </div>

        {/* Carburant */}
        <div className="mb-3">
          <label className="form-label">Type de carburant</label>
          <select className="form-select" name="fuel_type" value={formData.fuel_type} onChange={handleChange}>
            <option value="">-- Choisir --</option>
            <option value="essence">Essence</option>
            <option value="diesel">Diesel</option>
            <option value="electrique">Électrique</option>
            <option value="hybride">Hybride</option>
          </select>
        </div>

        {/* Transmission */}
        <div className="mb-3">
          <label className="form-label">Transmission</label>
          <select className="form-select" name="transmission" value={formData.transmission} onChange={handleChange}>
            <option value="">-- Choisir --</option>
            <option value="automatique">Automatique</option>
            <option value="manuelle">Manuelle</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Date création (lecture seule) */}
        <div className="mb-3">
          <label className="form-label">Date de création</label>
          <input type="text" className="form-control" value={formData.created_at} readOnly />
        </div>

        <button type="submit" className="btn btn-success">Enregistrer les modifications</button>
      </form>
    </div>
  );
}
