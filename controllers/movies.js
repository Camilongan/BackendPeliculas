'use strict';

let Movie = require('../models/movies');

// Crear película (solo admin)
exports.createMovie = async (req, res) => {
  try {
    const { title, director, year, studio, price } = req.body;

    const newMovie = new Movie({ title, director, year, studio, price });
    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear película.' });
  }
};

// Obtener todas las películas
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ year: -1 }); // Ordenar por año descendente
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener películas.' });
  }
};

// Filtrar películas por año y precio
exports.getFilteredMovies = async (req, res) => {
  try {
    let { year, price } = req.query;

    const filter = {};
    if (year) filter.year = { $gt: parseInt(year) };
    if (price) filter.price = { $lte: parseFloat(price) };

    let movies = await Movie.find(filter).sort({ year: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar películas.' });
  }
};