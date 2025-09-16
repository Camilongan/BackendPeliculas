'use strict';

let User = require('../models/users');
let jwt = require('jsonwebtoken');

// Registrar nuevo usuario
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Validar que no exista ya
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe.' });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado exitosamente.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario.' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};