import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Saidbar from '../components/Saidbar';
import Nav from '../components/Nav';
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

export default function MesReservations() {
  const [reservations, setReservations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) return; // حماية لو ماكانش userId

    axios.get(`http://localhost:3000/rentals/user/${userId}`)
      .then((res) => {
        setReservations(res.data);
      })
      .catch((err) => console.error('Erreur de chargement :', err));
  }, [userId]);

  // ترجمة الحالة لأيقونات ونصوص جميلة
  const renderStatus = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="badge bg-success d-flex align-items-center gap-2"><FaCheckCircle /> Confirmé</span>;
      case 'rejected':
        return <span className="badge bg-danger d-flex align-items-center gap-2"><FaTimesCircle /> Refusé</span>;
      default:
        return <span className="badge bg-warning text-dark d-flex align-items-center gap-2"><FaHourglassHalf /> En attente</span>;
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-4">
        <h2 className="text-center mb-4 fw-bold text-primary">🧾 Mes Réservations</h2>

        {reservations.length === 0 ? (
          <p className="text-center fs-5 text-muted">Aucune réservation trouvée.</p>
        ) : (
          <div className="row">
            {reservations.map((rental) => (
              <div className="col-md-6 col-lg-4 mb-4" key={rental.id}>
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <img
                    src={`http://localhost:3000/images/${rental.image}`}
                    alt={rental.car_name}
                    className="card-img-top"
                    style={{ maxHeight: '200px', objectFit: 'cover', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{rental.car_name}</h5>
                    <p className="card-text mb-1 d-flex align-items-center gap-2"><FaCalendarAlt /> <strong>Du :</strong> {new Date(rental.start_date).toLocaleDateString()}</p>
                    <p className="card-text mb-1 d-flex align-items-center gap-2"><FaClock /> <strong>Au :</strong> {new Date(rental.end_date).toLocaleDateString()}</p>
                    <p className="card-text mb-2 d-flex align-items-center gap-2"><FaMoneyBillWave /> <strong>Prix total :</strong> {rental.total_price} DH</p>
                    <div>{renderStatus(rental.status)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
