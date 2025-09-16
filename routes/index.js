'use strict';

let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Bienvenido al API de películas!' });
});

module.exports = router;