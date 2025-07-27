import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Saidbar from '../components/Saidbar';

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  // تحميل البيانات أول مرة
  useEffect(() => {
    fetchReservations();
  }, []);

  // جلب جميع الحجوزات من API
  const fetchReservations = () => {
    axios.get('http://localhost:3000/rentals')
      .then((res) => setReservations(res.data))
      .catch((err) => console.error("Erreur lors de la récupération des réservations :", err));
  };

  // تغيير حالة الحجز
  const handleStatusChange = (id, newStatus) => {
    axios.put(`http://localhost:3000/rentals/${id}`, { status: newStatus })
      .then(() => {
        fetchReservations();
      })
      .catch((err) => console.error("Erreur lors de la mise à jour du statut :", err));
  };

  function confirmRental(id) {
    xios.put(`http://localhost:3000/confirm-rentals/${id}`)
      .then(() => {
        fetchReservations();
      })
      .catch((err) => console.error("Erreur lors de la mise à jour du statut :", err));
  }

  function rejectRental(id) {
    xios.put(`http://localhost:3000/reject-rentals/${id}`)
      .then(() => {
        fetchReservations();
      })
      .catch((err) => console.error("Erreur lors de la mise à jour du statut :", err));
  }
  return (
    <div>
      <Saidbar />
      <div className="d-flex">
        <div className="container mt-4">
          <h2 className="text-center mb-4">📋 Liste des Réservations</h2>

          {reservations.length === 0 ? (
            <p className="text-center">Aucune réservation trouvée.</p>
          ) : (
            <div className="row">
              {reservations.map((rental) => (
                <div className="col-md-6 mb-4" key={rental.id}>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">🚗 {rental.car_name || rental.car_id}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">👤 {rental.user_name || rental.user_id}</h6>

                      <p className="card-text">
                        <strong>📅 Du :</strong> {rental.start_date} <br />
                        <strong>📅 Au :</strong> {rental.end_date} <br />
                        <strong>💰 Prix total :</strong> {rental.total_price} DH
                      </p>

                      <p>
                        <strong>📌 Statut :</strong>{' '}
                        <span className={`badge ${(rental.status || 'pending') === 'confirmed' ? 'bg-success' :
                            (rental.status || 'pending') === 'rejected' ? 'bg-danger' :
                              'bg-warning text-dark'
                          }`}>
                          {rental.status || 'pending'}
                        </span>
                      </p>

                      <div className="d-flex gap-2" style={{ justifyContent: "space-between" }}>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={()=>confirmRental(rental.id)}
                          disabled={rental.status === 'confirmed'}
                        >
                          Confirmer
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleStatusChange(rental.id, 'rejected')}
                          disabled={rental.status === 'rejected'}
                        >
                          Rejeter
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
