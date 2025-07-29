import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* القسم الأول: روابط التواصل */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Suivez-nous</h5>
            <a href="#" className="text-white me-3">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>

          {/* القسم الثاني: معلومات التواصل */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Contactez-nous</h5>
            <p className="mb-1">
              <i className="fas fa-phone-alt me-2"></i> +212 6 12 34 56 78
            </p>
            <p className="mb-1">
              <i className="fas fa-envelope me-2"></i> contact@autorent.ma
            </p>
            <p className="mb-0">
              <i className="fas fa-map-marker-alt me-2"></i> Azilal, Maroc
            </p>
          </div>

          {/* القسم الثالث: الموقع على الخريطة */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Notre Localisation</h5>
            <div className="ratio ratio-4x3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13539.761102721837!2d-6.581282831960757!3d31.96251693202946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda49a88d81f6d61%3A0xeaea7099ca301db4!2sMus%C3%A9e%20Azilal!5e0!3m2!1sfr!2sma!4v1753803633696!5m2!1sfr!2sma"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation AutoRent"
              ></iframe>
            </div>
          </div>
        </div>

        {/* الحقوق */}
        <div className="text-center mt-3 border-top pt-3">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} AutoRent - Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
