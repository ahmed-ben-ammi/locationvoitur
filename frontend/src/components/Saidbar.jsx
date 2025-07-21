// src/components/SidebarAdmin.jsx
import { NavLink } from "react-router-dom";

export default function Saidbar() {
  return (

    <>
      {/* Bouton pour ouvrir le sidebar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <button
          className="btn btn-outline-dark m-3 d-md-"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#adminSidebar"
          aria-controls="adminSidebar"
        >
          ☰ Menu
        </button>
        <div>
          <NavLink to={"/add"} className="btn btn-primary m-3" >
            ajouter une voiture
          </NavLink>
        </div>
      </div>

      {/* Offcanvas sidebar */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="adminSidebar"
        aria-labelledby="adminSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="adminSidebarLabel">
            Admin Panel
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to="/admin/dashboard" className="nav-link text-white">
                🏠 Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/cars" className="nav-link text-white">
                🚗 Voitures
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/reservations" className="nav-link text-white">
                📆 Réservations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/users" className="nav-link text-white">
                👤 Clients
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/messages" className="nav-link text-white">
                💬 Messages
              </NavLink>
            </li>
            <li className="nav-item mt-3">
              <NavLink to="/admin/logout" className="nav-link text-danger">
                🔓 Déconnexion
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
