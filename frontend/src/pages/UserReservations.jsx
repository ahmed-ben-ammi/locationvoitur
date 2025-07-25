import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav'; // navbar pour l'utilisateur

export default function UserReservations() {
  const [reservations, setReservations] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Récupération du user depuis localStorage (ou selon ta logique d'auth)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setUserId(user.id);
      fetchReservations(user.id);
    }
  }, []);

  const fetchReservations = (id) => {
    axios.get(`http://localhost:3000/rentals/user/${id}`)
      .then((res) => setReservations(res.data))
      .catch((err) => console.error("Erreur lors du chargement des réservations :", err));
  };

  return (
    <div>
      <Nav />
      <div className="container mt-4">
        <h2 className="text-center mb-4">🧾 Mes Réservations</h2>

        {reservations.length === 0 ? (
          <p className="text-center">Vous n'avez encore aucune réservation.</p>
        ) : (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Voiture</th>
                <th>Date début</th>
                <th>Date fin</th>
                <th>Prix total</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((rental, index) => (
                <tr key={rental.id}>
                  <td>{index + 1}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
