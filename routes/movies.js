'use strict';

let express = require('express');
let router = express.Router();
let { authenticateToken, isAdmin } = require('../helpers/auth');
let { createMovie, getAllMovies, getFilteredMovies } = require('../controllers/movies');

// Solo admin puede crear
router.post('/', authenticateToken, isAdmin, createMovie);

// Todos los usuarios logueados pueden ver
router.get('/', authenticateToken, getAllMovies);

// Filtrar películas
router.get('/filter', authenticateToken, getFilteredMovies);

module.exports = router;