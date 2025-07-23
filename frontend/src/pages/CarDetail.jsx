import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(err => console.error('Erreur de chargement voiture :', err));
  }, [id]);

  const handleReservation = async () => {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      alert("Veuillez vous connecter.");
      return navigate('/login');
    }

    let user;
    try {
      user = JSON.parse(userRaw);
    } catch {
      alert("Problème avec l'utilisateur, reconnectez-vous.");
      localStorage.removeItem('user');
      return navigate('/');
    }

    if (!startDate || !endDate) {
      return alert("Choisissez les dates de réservation.");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return alert("Dates invalides.");
    }

    const total_price = days * car.price_per_day;

    const data = {
      user_id: user.id,
      car_id: car.id,
      start_date: startDate,
      end_date: endDate,
      total_price,
      status: 'en_attente'
    };

    try {
      await axios.post('http://localhost:3000/rentals', data);
      alert("Réservation envoyée avec succès !");
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la réservation.");
    }
  };

  if (!car) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <h2>{car.brand} {car.model}</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              src={`http://localhost:3000/images/${car.image_url}`}
              alt={car.model}
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <p><strong>Prix / jour :</strong> {car.price_per_day} DH</p>
            <p><strong>Année :</strong> {car.year}</p>
            <p><strong>Carburant :</strong> {car.fuel_type}</p>
            <p><strong>Transmission :</strong> {car.transmission}</p>
            <p><strong>Places :</strong> {car.seats}</p>
            <p><strong>Statut :</strong> <span className={`badge ${car.status === 'available' ? 'bg-success' : 'bg-danger'}`}>{car.status}</span></p>

            <div className="mb-3 mt-3">
              <label className="form-label">Date début :</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date fin :</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={handleReservation}
              disabled={car.status !== 'available'}
            >
              Réserver
            </button>

            {car.status !== 'available' && (
              <p className="text-danger mt-2">Cette voiture n'est pas disponible.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
