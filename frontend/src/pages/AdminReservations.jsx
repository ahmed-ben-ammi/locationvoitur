import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Saidbar from '../components/Saidbar';

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    axios.get('http://localhost:3000/rentals')
      .then((res) => setReservations(res.data))
      .catch((err) => console.error("Erreur lors de la récupération des réservations :", err));
  };

  const handleStatusChange = (id, newStatus) => {
    axios.put(`http://localhost:3000/rentals/${id}`, { status: newStatus })
      .then(() => {
        fetchReservations(); // rafraîchir les données après modification
      })
      .catch((err) => console.error("Erreur lors de la mise à jour du statut :", err));
  };

  return (
    
<div>
      <Saidbar />
        <div className="d-flex">
    
      <div className="container mt-4">
        <h2 className="text-center mb-4">📋 Liste des Réservations</h2>

        {reservations.length === 0 ? (
          <p className="text-center">Aucune réservation trouvée.</p>
        ) : (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Nom d'utilisateur</th>
                <th>Voiture</th>
                <th>Du</th>
                <th>Au</th>
                <th>Prix total</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((rental, index) => (
                <tr key={rental.id}>
                  <td>{index + 1}</td>
                  <td>{rental.user_name || rental.user_id}</td>
                  <td>{rental.car_name || rental.car_id}</td>
                  <td>{rental.start_date}</td>
                  <td>{rental.end_date}</td>
                  <td>{rental.total_price} DH</td>
                  <td>
                    <span className={`badge ${
                      rental.status === 'confirmed' ? 'bg-success' :
                      rental.status === 'rejected' ? 'bg-danger' :
                      'bg-warning'
                    }`}>
                      {rental.status}
                    </span>
                  </td>
                  <td>
                    {rental.status === 'pending' && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleStatusChange(rental.id, 'confirmed')}
                        >
                          Confirmer
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleStatusChange(rental.id, 'rejected')}
                        >
                          Rejeter
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
</div>
  );
}
