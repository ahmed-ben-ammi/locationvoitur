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

  const handleReservation = async (e) => {
    e.preventDefault()
    const userRaw = JSON.parse(localStorage.getItem('user'))
    console.log("user connected ",userRaw);
    

    let user = userRaw;
    if (!user ) {
      console.log("user not found in the loca storage");
      return ; 
    }
    

    if (!startDate || !endDate) {
      return alert("Choisissez les dates de réservation.");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return alert("Veuillez entrer des dates valides.");
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
      return alert("Dates invalides.");
    }

    const total_price = days * car.price_per_day;

    const confirmed = window.confirm(`Confirmer la réservation de ${car.brand} ${car.model} du ${startDate} au ${endDate} pour un total de ${total_price} DH ?`);
    if (!confirmed) return;

    const data = {
      user_id: user.userId,
      car_id: car.id,
      start_date: startDate,
      end_date: endDate,
      total_price,
      status: 'en_attente'
    };

    console.log(data);
    try {

      await axios.post('http://localhost:3000/rentals', data);
      alert("Réservation envoyée avec succès !");
      navigate('/mes-reservations'); // ou '/' si tu veux retourner à l'accueil
    } catch (err) {
      console.error("Erreur lors de la réservation :", err.response?.data || err.message);
      alert("Erreur lors de la réservation. Veuillez réessayer.");
    }
  };

  if (!car) return <div className="text-center mt-5">Chargement...</div>;

  const totalPriceEstimate = () => {
    if (!startDate || !endDate) return null;
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * car.price_per_day : null;
  };

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
            <form onSubmit={handleReservation}>
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

              {totalPriceEstimate() && (
                <p><strong>Prix total estimé :</strong> {totalPriceEstimate()} DH</p>
              )}

              <button type='submit'
                className="btn btn-primary"

                disabled={car.status !== 'available' || !startDate || !endDate}
              >
                Réserver
              </button>
            </form>

            {car.status !== 'available' && (
              <p className="text-danger mt-2">Cette voiture n'est pas disponible.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
