const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman';

// ======================
// REGISTER
// ======================
const register = async (req, res) => {
  try {
    const { nama, email, password, no_hp} = req.body;

    if (!nama || !email || !password || !no_hp) {
      return res.status(400).json({
        error: true,
        message: 'nama, email, dan password wajib diisi',
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: 'Email sudah terdaftar',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nama,
      email,
      password: hashedPassword,
      no_hp
    });

    res.status(201).json({
      error: false,
      message: 'Registrasi berhasil',
      user: {
        id: newUser.id,
        nama: newUser.nama,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

// ======================
// LOGIN
// ======================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Email dan password wajib diisi',
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Email tidak ditemukan',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: 'Password salah',
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      error: false,
      message: 'Login berhasil',
      loginResult: {
        userId: user.id,
        nama: user.nama,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

// ======================
// CHECK TOKEN (opsional)
// ======================
const checkAuth = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: true, message: 'Token tidak ditemukan' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    res.status(200).json({
      error: false,
      message: 'Token valid',
      user: decoded,
    });
  } catch (error) {
    res.status(401).json({
      error: true,
      message: 'Token tidak valid',
    });
  }
};

// Ekspor fungsi-fungsi
module.exports = { register, login, checkAuth };
