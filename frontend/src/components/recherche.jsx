export default function Recherche(props) {
    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Chercher par marque ou modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}