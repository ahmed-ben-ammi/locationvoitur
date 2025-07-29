import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="d-flex align-items-center"
      style={{
        minHeight: "90vh",
        backgroundImage: "url('https://www.centrediscountauto.fr/wp-content/uploads/2017/03/S0-Les-8-meilleures-citadines-366036-5.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay blue transparent */}
      <div
        style={{
          backgroundColor: "rgba(30, 111, 251, 0.75)",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      ></div>

      <div className="container position-relative text-white z-2">
        <div className="row align-items-center">
          <div className="col-md-7">
            <h1 className="fw-bold mb-4">
              Votre Partenaire de Confiance pour la Location de Voitures
            </h1>
            <p className="mb-4">
              Découvrez notre large gamme de véhicules modernes et bien entretenus. Réservez
              facilement et profitez de tarifs compétitifs avec un service client exceptionnel.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <NavLink style={{backgroundColor:'white' , color:"black"}} className="nav-link d-flex align-items-center gap-2" to="/contact">

                Contact
              </NavLink>
                          <NavLink style={{backgroundColor:'white' ,color:"black"}} className="nav-link d-flex align-items-center gap-2" to="/cars">
                            
                            Voitures
                          </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
