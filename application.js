'use strict';

let express = require('express');
let mongoose = require('mongoose');
require('dotenv').config();

let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

// Rutas
let userRoutes = require('./routes/users');
let movieRoutes = require('./routes/movies');
let indexRoutes = require('./routes/index');

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/', indexRoutes);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});