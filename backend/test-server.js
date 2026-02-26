/**
 * SERVER DE TEST - Sans MongoDB
 * Teste les routes de sécurité
 */

const express = require('express');
const jwt = require('jsonwebtoken');

// Recreer l'application sans MongoDB
const app = express();

// Middleware
app.use(express.json());

// Import des routes
const { verifyToken, authorizeRoles } = require('./src/Middleware/authMiddleware');

// Routes de test (simulant les vraies routes)
const router = express.Router();

// Simuler /api/users
router.post('/', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'User created' });
});

router.get('/', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Users listed' });
});

router.put('/:id', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'User updated' });
});

router.delete('/:id', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'User deleted' });
});

app.use('/api/users', router);

// Routes de test pour Frigos
const frigoRouter = express.Router();

frigoRouter.post('/', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Frigo created' });
});

frigoRouter.get('/', verifyToken, (req, res) => {
  res.json({ message: 'Frigos listed' });
});

app.use('/api/frigos', frigoRouter);

// Routes de test pour Samples
const sampleRouter = express.Router();

sampleRouter.post('/', verifyToken, authorizeRoles('admin', 'personnel'), (req, res) => {
  res.json({ message: 'Sample created' });
});

sampleRouter.get('/', verifyToken, (req, res) => {
  res.json({ message: 'Samples listed' });
});

sampleRouter.delete('/:id', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Sample deleted' });
});

app.use('/api/samples', sampleRouter);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Test server started on port ${PORT}`);
});