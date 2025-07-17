import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(err => console.error('Erreur:', err));
  }, [id]);

  if (!car) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{car.brand} {car.model}</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            src={car.image_url}
            alt={car.model}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <p><strong>Description:</strong> {car.description}</p>
          <p><strong>Prix par jour:</strong> {car.price_per_day} DH</p>
          <p><strong>Status:</strong> 
            <span className={`badge ms-2 ${car.status === 'available' ? 'bg-success' :
              car.status === 'rented' ? 'bg-warning' : 'bg-danger'}`}>
              {car.status}
            </span>
          </p>
          <button className="btn btn-primary me-2">Réserver</button>
        </div>
      </div>
    </div>
  );
}
