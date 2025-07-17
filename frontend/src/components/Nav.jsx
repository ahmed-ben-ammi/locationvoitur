import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow  sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <span className="me-2">🚗</span>
          <span className="fw-bold">AutoRent</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link active" href="#">Accueil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/cars"} className="nav-link" href="#">Véhicules</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">À Propos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
