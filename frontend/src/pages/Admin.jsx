// src/components/SidebarAdmin.jsx
import { NavLink } from "react-router-dom";

export default function SidebarAdmin() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100" style={{ width: "250px" }}>
      <NavLink to="/admin/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Admin Panel</span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/admin/dashboard" className="nav-link text-white" activeclassname="active">
            🏠 Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/cars" className="nav-link text-white" activeclassname="active">
            🚗 Voitures
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/reservations" className="nav-link text-white" activeclassname="active">
            📆 Réservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="nav-link text-white" activeclassname="active">
            👤 Clients
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/messages" className="nav-link text-white" activeclassname="active">
            💬 Messages
          </NavLink>
        </li>
      </ul>
      <hr />
      <div>
        <NavLink to="/admin/logout" className="nav-link text-danger">
          🔓 Déconnexion
        </NavLink>
      </div>
    </div>
  );
}
