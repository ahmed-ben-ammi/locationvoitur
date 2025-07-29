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
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // عدد الأيام
    const totalPrice = days * selectedCar.price_per_day;

    axios.post('http://localhost:3000/rentals', {
      carId: selectedCar.id,
      startDate,
      endDate,
      userId: user.id,
      totalPrice,
      status: 'pending'
    })
      .then(res => {
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
      <div className="container mt-4">
        <h2 className="text-center mb-4">Liste des Voitures</h2>

        {/* Champ de recherche */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par marque ou modèle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row">
          {filteredCars.map(car => (
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
                    <span className={`badge ${
                      car.status === 'available' ? 'bg-success' :
                      car.status === 'rented' ? 'bg-warning' : 'bg-danger'
                    }`}>
                      {car.status}
                    </span>
                  </p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleReserve(car)}
                      disabled={car.status !== 'available'}
                    >
                      Réserver
                    </button>
                    <NavLink
                      to={`/cars/${car.id}`}
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      Voir Détail
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Réservation */}
        {showModal && selectedCar && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmation</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Voulez-vous vraiment réserver la voiture
                    <strong> {selectedCar.brand} {selectedCar.model}</strong> ?
                  </p>
                  <div className="mb-3">
                    <label className="form-label">Date de début</label>
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date de retour</label>
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      min={startDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleConfirmReservation}
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
