import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function CarsList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/cars')
      .then(res => setCars(res.data))
      .catch(err => console.error('Erreur:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Liste des Voitures</h2>
      <div className="row">
        {cars.map(car => (
          <div className="col-md-4 mb-4" key={car.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`${car.image_url}`}
                className="card-img-top"
                alt={car.model}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{car.brand} {car.model}</h5>
                <p className="card-text">{car.description}</p>
                <p className="card-text"><strong>Prix/Jour:</strong> {car.price_per_day} DH</p>
                <p className="card-text">
                  <span className={`badge ${car.status === 'available' ? 'bg-success' :
                    car.status === 'rented' ? 'bg-warning' : 'bg-danger'}`}>
                    {car.status}
                  </span>
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <button className="btn btn-primary btn-sm">Réserver</button>
                 <NavLink to={`/cars/${car.id}`} className="btn btn-outline-primary btn-sm me-2">Voir Détail</NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
