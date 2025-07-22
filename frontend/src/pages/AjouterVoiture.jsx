import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AjouterVoiture() {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    registration: '',
    price_per_day: '',
    year: '',
    mileage: '',
    seats: '',
    status: 'available',
    fuel_type: '',
    transmission: '',
    description: '',
    image: null,
    created_at: new Date().toISOString(),
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:3000/cars', data);
      alert(' Voiture ajoutée avec succès !');
      console.log(res.data);
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      alert(' Erreur lors de l\'ajout');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h4>Ajouter une voiture</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Marque</label>
                <input type="text" name="brand" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Modèle</label>
                <input type="text" name="model" className="form-control" onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Immatriculation</label>
                <input type="text" name="registration" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Prix par jour (DH)</label>
                <input type="number" name="price_per_day" className="form-control" onChange={handleChange} required />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Année</label>
                <input type="number" name="year" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Kilométrage</label>
                <input type="number" name="mileage" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Nombre de places</label>
                <input type="number" name="seats" className="form-control" onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Image</label>
                <input type="file" name="image" accept="image/*" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Aperçu</label><br />
                {imagePreview ? (
                  <img src={imagePreview} alt="Aperçu" className="img-thumbnail" style={{ height: '150px' }} />
                ) : (
                  <span className="text-muted">Aucun fichier sélectionné</span>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Statut</label>
                <select name="status" className="form-select" onChange={handleChange}>
                  <option value="available">Disponible</option>
                  <option value="rented">Louée</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Type de carburant</label>
                <select name="fuel_type" className="form-select" onChange={handleChange} required>
                  <option value="">-- Choisir --</option>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="électrique">Électrique</option>
                  <option value="hybride">Hybride</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Transmission</label>
                <select name="transmission" className="form-select" onChange={handleChange} required>
                  <option value="">-- Choisir --</option>
                  <option value="manuelle">Manuelle</option>
                  <option value="automatique">Automatique</option>
                </select>
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" rows="3" onChange={handleChange}></textarea>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Date de création</label>
                <input type="text" name="created_at" value={formData.created_at} className="form-control" readOnly />
              </div>
            </div>

            <button type="submit" className="btn btn-success">Ajouter voiture</button>
          </form>
        </div>
      </div>
    </div>
  );
}
