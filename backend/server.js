const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { log } = require('console');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// 📂 Configurer le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');  // 📁 Dossier de stockage
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// 🛠️ Connexion MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cars_db'
});

// 🔁 Servir les fichiers statiques (images)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// 📤 Route dédiée pour upload image seule (utilisée par Modifier.jsx)
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier reçu' });
  }

  const imageUrl = `http://localhost:${port}/images/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});



//  CRUD CARS


// GET toutes les voitures
app.get('/cars', (req, res) => {
  db.query('SELECT * FROM Cars', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET voiture par ID
app.get('/cars/:id', (req, res) => {
  const carId = req.params.id;
  db.query('SELECT * FROM Cars WHERE id = ?', [carId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Voiture introuvable' });
    res.json(results[0]);
  });
});

// POST : Ajouter une voiture
app.post('/cars', upload.single('image'), (req, res) => {
  const { brand, model, registration, price_per_day, status, description } = req.body;
  let image_url = 'default_car.jpg';
  if (req.file) {
    image_url = req.file.filename;
  }

  const sql = `INSERT INTO Cars (brand, model, registration, price_per_day, status, image_url, description)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [brand, model, registration, price_per_day, status, image_url, description], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Voiture ajoutée', carId: results.insertId });
  });
});

// PUT : Modifier une voiture
app.put('/cars/:id', upload.single('image'), (req, res) => {
  const carId = req.params.id;
  const { brand, model, registration, price_per_day, status, description } = req.body;
  let image_url = null;

  if (req.file) {
    image_url = req.file.filename;

    // Optionnel : supprimer l'ancienne image
    db.query('SELECT image_url FROM Cars WHERE id = ?', [carId], (err, results) => {
      if (!err && results.length > 0) {
        const oldImage = results[0].image_url;
        if (oldImage && oldImage !== 'default_car.jpg') {
          const oldImagePath = path.join(__dirname, 'public/images', oldImage);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Erreur suppression ancienne image:', err.message);
          });
        }
      }
    });
  }

  let sql = `UPDATE Cars SET brand = ?, model = ?, registration = ?, price_per_day = ?, status = ?, description = ?`;
  const params = [brand, model, registration, price_per_day, status, description];

  if (image_url) {
    sql += `, image_url = ?`;
    params.push(image_url);
  }

  sql += ` WHERE id = ?`;
  params.push(carId);

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Voiture non trouvée' });
    res.json({ message: 'Voiture mise à jour avec succès' });
  });
});

// DELETE : Supprimer une voiture
app.delete('/cars/:id', (req, res) => {
  const carId = req.params.id;

  // Optionnel : supprimer image liée
  db.query('SELECT image_url FROM Cars WHERE id = ?', [carId], (err, results) => {
    if (!err && results.length > 0) {
      const image = results[0].image_url;
      if (image && image !== 'default_car.jpg') {
        const imagePath = path.join(__dirname, 'public/images', image);
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Erreur suppression image:', err.message);
        });
      }
    }
  });

  db.query('DELETE FROM Cars WHERE id = ?', [carId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Voiture non trouvée' });
    res.json({ message: 'Voiture supprimée avec succès' });
  });
});



// Enregistrement
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'L’email est déjà utilisé' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Compte créé avec succès", userId: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("Reçu login request avec:", email, password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
  }

  const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error(" Erreur MySQL:", err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length === 0) {
      console.log(" Aucun utilisateur trouvé avec cet email");
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const user = results[0];
    console.log("🧑 Utilisateur trouvé:", user);

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("🔐 Mot de passe incorrect");
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      res.status(200).json({
        
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (err) {
      console.error("⚠️ Erreur dans le bcrypt.compare:", err);
      res.status(500).json({ error: 'Erreur serveur (bcrypt)' });
    }
  });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const sql = 'INSERT INTO message (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion :', err);
      return res.status(500).json({ error: 'Erreur du serveur.' });
    }

    res.status(200).json({ message: 'Message bien reçu !' });
  });
});
app.get('/messages', (req, res) => {
  const sql = 'SELECT * FROM message ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des messages :', err);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
    res.json(results);
  });
});
app.delete('/messages/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM message WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('err :', err);
      return res.status(500).json({ error: 'err de suprimer' });
    }
    res.json({ message: 'message supprimer' });
  });
});




// hadi laprtie dyal lhajz
app.post('/rentals', (req, res) => {
  const { user_id, car_id, start_date, end_date, total_price, status } = req.body;

  const sql = 'INSERT INTO rentals (user_id, car_id, start_date, end_date, total_price, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())';
  const values = [user_id, car_id, start_date, end_date, total_price, status];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.status(200).json({ message: "Réservation ajoutée" });
  });
});

// // 🔽 GET : Récupérer toutes les réservations avec les noms des utilisateurs et des voitures
// app.get('/rentals', (req, res) => {
//   const sql = `
//     SELECT 
//       rentals.id,
//       rentals.start_date,
//       rentals.end_date,
//       rentals.status,
//       rentals.total_price,
//       users.name AS user_name,
//       CONCAT(cars.brand, ' ', cars.model) AS car_name
//     FROM rentals
//     JOIN users ON rentals.user_id = users.id
//     JOIN cars ON rentals.car_id = cars.id
//     ORDER BY rentals.id DESC
//   `;

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Erreur lors de la récupération des réservations :", err);
//       return res.status(500).json({ error: "Erreur serveur" });
//     }
//     res.status(200).json(results);
//   });
// });





//  Lancer le serveur
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (results.length === 0) return res.status(401).json({ error: 'Email non trouvé' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ error: 'Mot de passe incorrect' });

    // ✅ ENVOYER user SANS password
    const { password: _, ...userWithoutPassword } = user;
    res.json({ message: 'Connexion réussie', user: userWithoutPassword });
  });
});
// Exemple de route dans Express

app.get('/rentals/user/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT rentals.*, users.name AS user_name, cars.brand AS car_name, cars.image_url AS image
    FROM rentals
    JOIN users ON rentals.user_id = users.id
    JOIN cars ON rentals.car_id = cars.id
    WHERE user_id = ?
    ORDER BY rentals.created_at DESC
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});



// ✅ Confirmer la réservation
app.put('/confirm-rentals/:id', (req, res) => {
  const rentalId = req.params.id;
  db.query('UPDATE rentals SET status = ? WHERE id = ?', ['confirmed', rentalId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});

// ✅ Rejeter la réservation
app.put('/reject-rentals/:id', (req, res) => {
  const rentalId = req.params.id;
  db.query('UPDATE rentals SET status = ? WHERE id = ?', ['cancelled', rentalId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});
// ✅ Route: جميع الحجزات مع صورة الطوموبيل
app.get('/rentals', (req, res) => {
  const sql = `
    SELECT 
      rentals.id,
      rentals.user_id,
      rentals.car_id,
      rentals.start_date,
      rentals.end_date,
      rentals.total_price,
      rentals.status,
      rentals.created_at,
      users.name AS user_name,
      cars.brand,
      cars.model,
      cars.image_url
    FROM rentals
    JOIN users ON rentals.user_id = users.id
    JOIN cars ON rentals.car_id = cars.id
    ORDER BY rentals.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des réservations avec images:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    // Ajouter chemin complet de l'image
    const baseUrl = `http://localhost:${port}/images/`;
    const data = results.map(rental => ({
      ...rental,
      image_url: rental.image_url ? `${baseUrl}${rental.image_url}` : null
    }));

    res.status(200).json(data);
  });
});


app.get('/messages/unread/count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM message WHERE lu = FALSE';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur de récupération du nombre de messages non lus :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(result[0]);
  });
});




app.listen(port, () => {
  console.log(`Serveur lancé sur : http://localhost:${port}`);
});
