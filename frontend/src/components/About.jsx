export default function About() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Text */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">À Propos d'AutoRent</h2>
            <p className="text-muted mb-3">
              Depuis plus de 15 ans, AutoRent est votre partenaire de confiance pour la location de véhicules au Maroc.
            </p>
            <p className="text-muted mb-4">
              Nous nous engageons à vous offrir un service de qualité supérieure avec une flotte moderne et diversifiée.
              Notre équipe professionnelle est à votre disposition pour vous accompagner dans tous vos déplacements.
            </p>
            <div className="d-flex gap-5 mt-4">
              <div>
                <h5 className="text-primary fw-bold">15+</h5>
                <p className="mb-0 text-muted">Années d'expérience</p>
              </div>
              <div>
                <h5 className="text-primary fw-bold">10,000+</h5>
                <p className="mb-0 text-muted">Clients satisfaits</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="col-md-6">
            <div className="shadow rounded overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg"
                alt="voiture"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
