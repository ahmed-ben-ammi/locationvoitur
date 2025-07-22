import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import Saidbar from '../components/Saidbar';

export default function Message() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios.get('http://localhost:3000/messages')
      .then((res) => setMessages(res.data))
      .catch((err) => console.error('Erreur lors de la récupération:', err));
  };

  return (
    <div>
      <Saidbar/>
      <div className="container mt-4">
        <h2 className="text-center mb-4">📨 Messages Reçus</h2>

        {messages.length === 0 ? (
          <p className="text-center">Aucun message pour le moment.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, index) => (
                  <tr key={msg.id}>
                    <td>{index + 1}</td>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
