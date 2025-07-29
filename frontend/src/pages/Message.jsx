import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import Saidbar from '../components/Saidbar';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function Message() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();

    axios.put('http://localhost:3000/messages/mark-as-read')
      .catch((err) => console.error('Erreur lors du marquage comme lu:', err));
  }, []);

  const fetchMessages = () => {
    axios.get('http://localhost:3000/messages')
      .then((res) => setMessages(res.data))
      .catch((err) => console.error('Erreur lors de la récupération:', err));
  };

  const deleteMessage = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce message ?')) {
      axios.delete(`http://localhost:3000/messages/${id}`)
        .then(() => {
          setMessages(messages.filter((msg) => msg.id !== id));
        })
        .catch((err) => console.error('Erreur lors de la suppression:', err));
    }
  };

  return (
    <div>
      <Saidbar />
      <div className="d-flex">
        <div className="container mt-4">
          <h2 className="text-center mb-4">📨 Messages Reçus</h2>

          {messages.length === 0 ? (
            <p className="text-center">Aucun message pour le moment.</p>
          ) : (
            <div className="row">
              {messages.map((msg, index) => (
                <div className="col-md-6 mb-4" key={msg.id}>
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="card-title">{msg.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{msg.email}</h6>
                      <p className="card-text">{msg.message}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-primary">Message #{index + 1}</span>
                        <div>
                        
                          <FaTrash
                            className="text-danger"
                            style={{ cursor: 'pointer' }}
                            title="Supprimer"
                            onClick={() => deleteMessage(msg.id)}
                          />
                        </div>
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
