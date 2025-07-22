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

  // ⬇️ Charger les données existantes
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

  // ⬇️ Gérer les changements dans les champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ⬇️ Gérer le changement d’image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ⬇️ Soumettre les modifications
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

  if (loading) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Modifier la voiture</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {/* ✅ Aperçu de l'image actuelle */}
      {imagePreview && (
        <div className="mb-3 text-center">
          <img
            src={imagePreview}
            alt="Voiture"
            className="img-thumbnail"
            style={{ maxHeight: '200px', objectFit: 'cover' }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Champs texte */}
        {[
          { label: "Marque", name: "brand" },
          { label: "Modèle", name: "model" },
          { label: "Immatriculation", name: "registration" },
          { label: "Prix par jour (DH)", name: "price_per_day", type: "number" },
          { label: "Année", name: "year", type: "number" },
          { label: "Kilométrage", name: "mileage", type: "number" },
          { label: "Nombre de places", name: "seats", type: "number" },
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

        {/* Champ image nouvelle */}
        <div className="mb-3">
          <label className="form-label">Changer l’image (optionnel)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        {/* Statut */}
        <div className="mb-3">
          <label className="form-label">Statut</label>
          <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
            <option value="available">Disponible</option>
            <option value="rented">Louée</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Disponible */}
        <div className="mb-3">
          <label className="form-label">Disponible ?</label>
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

        {/* Type carburant */}
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

        {/* Date création */}
        <div className="mb-3">
          <label className="form-label">Date de création</label>
          <input type="text" className="form-control" value={formData.created_at} readOnly />
        </div>

        <button type="submit" className="btn btn-success">Enregistrer les modifications</button>
      </form>
    </div>
  );
}
