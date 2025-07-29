import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Saidbar from '../components/Saidbar';
import Nav from '../components/Nav';

export default function MesReservations() {
  const [reservations, setReservations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log( user);
  
const userId = user?.userId;
console.log(userId);



  useEffect(() => {
    axios.get(`http://localhost:3000/rentals/user/${userId}`)
      .then((res) => { 
        console.log(res.data);

        setReservations(res.data)})
      .catch((err) => console.error('Erreur de chargement :', err));
  }, []);

  return (
    <div>
      <Nav />
      <div className="container mt-4">
        <h2 className="text-center mb-4">🧾 Mes Réservations</h2>

        {reservations.length === 0 ? (
          <p className="text-center">Aucune réservation trouvée.</p>
        ) : (
          <div className="row">
            {reservations.map((rental, index) => (
              <div className="col-md-6 col-lg-4 mb-4" key={rental.id}>
                <div className="card h-100 shadow">
                  <div className="card-body">
                                      <img
   src={'http://localhost:3000/images/'+ rental.image}  alt={rental.car_name}
  
  className="img-fluid mb-3"
  style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
/>
                    <h5 className="card-title"> {rental.car_name}</h5>
                    <p className="card-text"><strong>Du :</strong> {new Date(rental.start_date).toLocaleDateString()}</p>
                    <p className="card-text"><strong>Au :</strong> {new Date(rental.end_date).toLocaleDateString()}</p>
                    <p className="card-text"><strong>Prix total :</strong> {rental.total_price} DH</p>
                    <p className="card-text">
                      <strong>Statut :</strong>{" "}
                      <span className={`badge ${
                        rental.status === 'confirmed' ? 'bg-success' :
                        rental.status === 'rejected' ? 'bg-danger' :
                        'bg-warning'
                      }`}>
                        {rental.status || 'en attente'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
