import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Saidbar from '../components/Saidbar';
import Nav from '../components/Nav';

export default function AdminReservations() {
  
  const [reservations, setReservations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    axios.get(`http://localhost:3000/rentals/user/${userId}`)
      .then(response => {
        console.log(response.data);
        
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réservations :', error);
      });
  }, [userId]);

  const confirmRental = (rentalId) => {
    axios.put(`http://localhost:3000/confirm-rentals/${rentalId}`)
      .then(() => {
        setReservations(prev =>
          prev.map(r =>
            r.id === rentalId ? { ...r, status: 'confirmed' } : r
          )
        );
      })
      .catch(error => {
        console.error('Erreur lors de la confirmation :', error);
      });
  };

  const rejectRental = (rentalId) => {
    axios.put(`http://localhost:3000/reject-rentals/${rentalId}`)
      .then(() => {
        setReservations(prev =>
          prev.map(r =>
            r.id === rentalId ? { ...r, status: 'cancelled' } : r
          )
        );
      })
      .catch(error => {
        console.error('Erreur lors du refus :', error);
      });
  };

  // ✅ Fonction pour afficher le statut en français
  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'cancelled':
        return 'Refusé';
      case 'completed':
        return 'Terminé';
      case 'pending':
      default:
        return 'En attente';
    }
  };


  return (
    <>
    <Saidbar/>
      
      <div className='d-flex'>
      
        <div className='container mt-4'>
          <h2 className='mb-4'>Réservations des utilisateurs</h2>
          <div className="row">
            {reservations.map((rental) => (
              <div className="col-md-4 mb-4" key={rental.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                  <img
  src={'http://localhost:3000/images/'+rental.image}
  alt={rental.car_name}
  
  className="img-fluid mb-3"
  style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
/>

                    <div className='card-image'>

                    </div>
                    <h5 className="card-title">{rental.car_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      👤 {rental.user_name || `Utilisateur #${rental.user_id}`}
                    </h6>
                    <p className="card-text">
                      <strong>ID :</strong> {rental.id}<br />
                      <strong>Début :</strong> {rental.start_date}<br />
                      <strong>Fin :</strong> {rental.end_date}<br />
                      <strong>Status :</strong>{" "}
                      <span className={`badge ${
                        rental.status === 'confirmed' ? 'bg-success' :
                        rental.status === 'cancelled' ? 'bg-danger' :
                        rental.status === 'completed' ? 'bg-primary' :
                        'bg-warning text-dark'
                      }`}>
                        {getStatusLabel(rental.status)}
                      </span>
                    </p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => confirmRental(rental.id)}
                        disabled={rental.status === 'confirmed' || rental.status === 'cancelled'}
                      >
                        Confirmer
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rejectRental(rental.id)}
                        disabled={rental.status === 'cancelled' || rental.status === 'confirmed'}
                      >
                        Rejeter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {reservations.length === 0 && (
              <p className='text-center mt-5'>Aucune réservation trouvée.</p>
            )}
          </div>
        </div>
      </div>
    </>
    
  );
}
