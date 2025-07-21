import React, { useState } from "react";
import axios from "axios";
import { BsPlusCircle } from "react-icons/bs";

export default function AjouterVoiture({ chenge,  fetchCars }) {
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [matricule, setMatricule] = useState("");
  const [price, setPrice] = useState("");
  const [fuel, setFuel] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("marque", marque);
    formData.append("modele", modele);
    formData.append("matricule", matricule);
    formData.append("price", price);
    formData.append("fuel", fuel);
    formData.append("image", image);

    axios
      .post("http://localhost:3000/cars", formData)
      .then((res) => {
        alert("Voiture ajoutée !");
        setMarque("");
        setModele("");
        setMatricule("");
        setPrice("");
        setFuel("");
        setImage(null);
        fetchCars(); // rafraîchir la liste
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de l'ajout !");
      });
  };

  return (
    <div className={""}>
      <div className="d-flex justify-content-center mt-4">
        <form
          onSubmit={handleSubmit}
          style={{
            boxShadow: "0 0 3px black",
            borderRadius: "10px",
            padding: "15px",
            backgroundColor: "#212529",
          }}
          encType="multipart/form-data"
        >
          <label className="text-light">Marque</label>
          <input
            type="text"
            className="form-control"
            value={marque}
            onChange={(e) => setMarque(e.target.value)}
            required
          />

          <label className="mt-4 text-light">Modèle</label>
          <input
            type="text"
            className="form-control"
            value={modele}
            onChange={(e) => setModele(e.target.value)}
            required
          />

          <label className="mt-4 text-light">Immatriculation</label>
          <input
            type="text"
            className="form-control"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
          />

          <label className="mt-4 text-light">Prix (DH/jour)</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label className="mt-4 text-light">Carburant</label>
          <input
            type="text"
            className="form-control"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            required
          />

          <label className="mt-4 text-light">Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-primary">
              Ajouter la voiture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
