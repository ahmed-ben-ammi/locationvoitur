import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaHome,
  FaCarSide,
  FaCalendarCheck,
  FaEnvelope,
} from 'react-icons/fa';

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2" to="/">
          <FaCarSide />
          Location Voitures
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center gap-2" to="/">
                <FaHome />
                Accueil
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center gap-2" to="/cars">
                <FaCarSide />
                Voitures
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center gap-2" to="/mes-reservations">
                <FaCalendarCheck />
                Mes Réservations
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center gap-2" to="/contact">
                <FaEnvelope />
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="d-flex gap-3">
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className="btn btn-outline-primary d-flex align-items-center gap-2">
                  <FaSignInAlt />
                  Login
                </NavLink>

                <NavLink to="/register" className="btn btn-primary text-white d-flex align-items-center gap-2">
                  <FaUserPlus />
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-danger d-flex align-items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
