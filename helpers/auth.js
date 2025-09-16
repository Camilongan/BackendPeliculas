'use strict';

let jwt = require('jsonwebtoken');
let User = require('../models/users');

// Verificar token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Acceso denegado. Token requerido.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password'); // Evita enviar la contraseña
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};

// Verificar si es admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden crear películas.' });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };