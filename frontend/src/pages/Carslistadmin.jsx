import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Saidbar from '../components/Saidbar';

export default function Carslistadmin() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    axios.get('http://localhost:3000/cars')
      .then(res => setCars(res.data))
      .catch(err => console.error('Erreur:', err));
  };

  const handleDelete = (carId) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette voiture ?')) {
      axios.delete(`http://localhost:3000/cars/${carId}`)
        .then(() => {
          setCars(cars.filter(car => car.id !== carId));
        })
        .catch(err => console.error('Erreur lors de la suppression:', err));
    }
  };

  const filteredCars = cars.filter(car => {
    if (searchTerm.trim() === '') return true;
    const fullName = (car.brand + ' ' + car.model).toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Saidbar />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Liste des Voitures</h2>

        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Chercher par marque ou modèle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row">
          {filteredCars.length === 0 ? (
            <p className="text-center">Aucune voiture ne correspond à la recherche.</p>
          ) : (
            filteredCars.map(car => (
              <div className="col-md-4 mb-4" key={car.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://localhost:3000/images/${car.image_url}`}
                    className="card-img-top"
                    alt={car.model}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{car.brand} {car.model}</h5>
                    <p className="card-text">{car.description}</p>
                    <p className="card-text">
                      <strong>Prix/Jour:</strong> {car.price_per_day} DH
                    </p>
                    <p className="card-text">
                      <span className={`badge ${car.status === 'available' ? 'bg-success' :
                        car.status === 'rented' ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {car.status}
                      </span>
                    </p>

                    <div className="mt-auto d-flex justify-content-between">
                      <NavLink
                        to={`/modifier/${car.id}`}
                        className="btn btn-outline-primary btn-sm"
                        title="Modifier"
                      >
                        <FaEdit />
                      </NavLink>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(car.id)}
                        title="Supprimer"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
