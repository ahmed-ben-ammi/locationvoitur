const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
const bcrypt = require('bcrypt');


app.use(bodyParser.json());
app.use(cors())

// hada bach nrf3o lmilfat
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');  // lmilf dyal tkhzin
  },
  filename: function (req, file, cb) {
    // 2ism jdid ltswira
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); 
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// hadi lpartie dyal sql
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',         
  password: '',
  database: 'cars_db'
});

// bach ikdm dosersyal imag
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// GET 
app.get('/cars', (req, res) => {
  db.query('SELECT * FROM Cars', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET id
app.get('/cars/:id', (req, res) => {
  const carId = req.params.id;
  db.query('SELECT * FROM Cars WHERE id = ?', [carId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Car not found' });
    res.json(results[0]);
  });
});

// POST 
app.post('/cars', upload.single('image'), (req, res) => {
  const { brand, model, registration, price_per_day, status, description } = req.body;
  let image_url = 'default_car.jpg'; // tswirabach njrb
  if (req.file) {
    image_url = req.file.filename; // smit lmolf
  }

  const sql = `INSERT INTO Cars (brand, model, registration, price_per_day, status, image_url, description)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [brand, model, registration, price_per_day, status, image_url, description], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Car added', carId: results.insertId });
  });
});
app.put('/cars/:id', upload.single('image'), (req, res) => {
  const carId = req.params.id;
  const { brand, model, registration, price_per_day, status, description } = req.body;
  let image_url = null;

  if (req.file) {
    image_url = req.file.filename;
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
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car updated successfully' });
  });
});
app.delete('/cars/:id', (req, res) => {
  const carId = req.params.id;
  db.query('DELETE FROM Cars WHERE id = ?', [carId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  });
});


// nsjlo user jdid
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // hadi z3ma wch 3mrti limtlob
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
  }

  try {
    // tcfirpasword
    const hashedPassword = await bcrypt.hash(password, 10);

    // ndkhlo user f db
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Lemail est utilisé'});
        }
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({ message: "Le compte a été créé avec succès.", userId: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur du serveur' });
  }
});
// Route de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Vérification des champs
  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
  }

  // Rechercher l’utilisateur par email
  const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const user = results[0];

    // Comparer le mot de passe avec le hash enregistré
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Authentification réussie
    res.status(200).json({
      message: 'Connexion réussie',
      userId: user.id,
      name: user.name,
      email: user.email
    });
  });
});


// server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
