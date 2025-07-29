import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

export default function CarsList() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/cars')
      .then(res => setCars(res.data))
      .catch(err => console.error('Erreur:', err));
  }, []);

  const handleReserve = (car) => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      setSelectedCar(car);
      setShowModal(true);
    }
  };

  const handleConfirmReservation = () => {
    if (!startDate || !endDate) {
      alert("Veuillez choisir les dates de réservation !");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("La date de retour doit être après la date de début !");
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * selectedCar.price_per_day;

    axios.post('http://localhost:3000/rentals', {
      carId: selectedCar.id,
      startDate,
      endDate,
      userId: user.id,
      totalPrice,
      status: 'pending'
    })
      .then(() => {
        alert("Réservation enregistrée avec succès !");
        setShowModal(false);
        setStartDate('');
        setEndDate('');
      })
      .catch(err => {
        console.error("Erreur de réservation :", err);
        alert("Erreur lors de la réservation");
      });
  };

  const filteredCars = cars.filter(car =>
    (car.brand + ' ' + car.model).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <h2 className="text-center text-primary fw-bold mb-4">Liste des Voitures Disponibles</h2>

        <div className="mb-5 w-50 mx-auto">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="🔍 Rechercher par marque ou modèle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row">
          {filteredCars.length === 0 ? (
            <p className="text-center text-muted">Aucune voiture trouvée.</p>
          ) : (
            filteredCars.map(car => (
              <div className="col-md-4 mb-4" key={car.id}>
                <div className="card h-100 shadow rounded-4 overflow-hidden border-0">
                  <img
                    src={`http://localhost:3000/images/${car.image_url}`}
                    className="card-img-top"
                    alt={car.model}
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title text-primary fw-bold">
                      {car.brand} {car.model}
                    </h5>
                    <p className="card-text text-muted" style={{ fontSize: '0.95rem' }}>{car.description}</p>
                    <p className="card-text mb-1">
                      <strong>Prix/Jour:</strong> <span className="text-dark">{car.price_per_day} DH</span>
                    </p>
                    <p className="card-text mb-3">
                      <span className={`badge px-3 py-2 rounded-pill ${
                        car.status === 'available' ? 'bg-success' :
                        car.status === 'rented' ? 'bg-warning text-dark' : 'bg-danger'
                      }`}>
                        {car.status.toUpperCase()}
                      </span>
                    </p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <NavLink
                        to={`/cars/${car.id}`}
                        className="btn btn-outline-primary btn-sm"
                        style={{justifyContent:"center"}}
                      >
                        Voir Détail
                      </NavLink>


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
