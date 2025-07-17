import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5">
      <div className="container text-center">
        <div className="mb-3">
          <a href="#" className="text-white mx-2">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="#" className="text-white mx-2">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="#" className="text-white mx-2">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a href="#" className="text-white mx-2">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
        </div>
        <p className="mb-0">&copy; {new Date().getFullYear()} AutoRent -Tous droits réservés</p>
      </div>
    </footer>
  );
}
