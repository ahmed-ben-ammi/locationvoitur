import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Saidbar from '../components/Saidbar';

export default function Carslistadmin() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = () => {
        axios.get('http://localhost:3000/cars')
            .then(res => setCars(res.data))
            .catch(err => console.error('Erreur:', err));
    };

    const handleEdit = (carId) => {
        navigate(`/admin/edit-car/${carId}`);
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

    return (
        <div>
            <Saidbar />

            <div className="container mt-4">
                <h2 className="text-center mb-4">Liste des Voitures</h2>
                <div className="row">
                    {cars.map(car => (
                        <div className="col-md-4 mb-4" key={car.id}>
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={`http://localhost:5173/public/images/${car.image_url}`}
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
                                        <NavLink to={`/modifier/${car.id}`} className="btn btn-warning btn-sm me-2">
                                            Modifier
                                        </NavLink>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(car.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
