import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';


export default function CarsList() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/cars')
      .then(res => setCars(res.data))
      .catch(err => console.error('Erreur:', err));
  }, []);

  const handleReserve = (car) => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login'); // 2ila makanch lmostkhdim msjl login
    } else {
      setSelectedCar(car);
      setShowModal(true); // hadi bach itl3modal
    }
  };

  const handleConfirmReservation = () => {
    // هنا ممكن تدير axios.post باش تسجل الحجز فعلياً
    alert(`Réservation confirmée pour ${selectedCar.brand} ${selectedCar.model}`);
    setShowModal(false);
  };

  return (
<div>
  <Nav/>
  
      <div className="container mt-4">
      <h2 className="text-center mb-4">Liste des Voitures</h2>
      <div className="row">
        {cars.map(car => (
          <div className="col-md-4 mb-4" key={car.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={car.image_url}
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
