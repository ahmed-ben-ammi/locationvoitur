import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation(); //bach nra9bo taghyorat dyal sfha
  const [isLoggedIn, setIsLoggedIn] = useState(false);

//  kola mra taytbdl rout tant2kd wach user mazal dakhl
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]); // th99 mli tbdl sfha

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <span className="me-2">🚗</span>
          <span className="fw-bold">AutoRent</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Accueil
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/cars" className="nav-link">
                Véhicules
              </NavLink>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="nav-link btn btn-link text-white"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  Logout
                </button>
              </li>
            )}

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
