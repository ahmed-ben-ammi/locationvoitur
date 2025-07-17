import React from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";


const services = [
  {
    icon: "fas fa-car",
    title: "Large Gamme",
    text: "Plus de 100 véhicules disponibles pour tous vos besoins",
  },
  {
    icon: "fas fa-clock",
    title: "Service 24/7",
    text: "Assistance disponible 24h/24 et 7j/7",
  },
  {
    icon: "fas fa-map-marker-alt",
    title: "Plusieurs Agences",
    text: "Présent dans toutes les grandes villes du Maroc",
  },
  {
    icon: "fas fa-users",
    title: "Clients Satisfaits",
    text: "Plus de 10,000 clients nous font confiance",
  },
];

export default function ServicesSection() {
  return (
    <div className="container py-5 bg-light">
      <div className="row text-center">
        {services.map((service, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="icon-circle mb-3 mx-auto">
              <i className={service.icon}></i>
            </div>
            <h5><strong>{service.title}</strong></h5>
            <p>{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
