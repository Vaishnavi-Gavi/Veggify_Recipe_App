const User = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    console.log('[auth] signup request body:', req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      console.log('[auth] missing username or password');
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('[auth] user already exists:', username);
      return res.status(409).json({ message: 'User already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    console.log('[auth] user created:', user._id ? user._id.toString() : null);
    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error('[auth] signup error', err && err.stack ? err.stack : err);
    res.status(500).json({ message: 'Server error.' });
  }
};


exports.login = async (req, res) => {
  try {
    console.log('[auth] login request body:', req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      console.log('[auth] missing username or password');
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      console.log('[auth] user not found:', username);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('[auth] invalid password for user:', username);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ sub: user._id.toString(), username: user.username }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    console.log('[auth] login success for user:', username);
    res.status(200).json({ message: 'Login successful.', token, username: user.username });
  } catch (err) {
    console.error('[auth] login error', err && err.stack ? err.stack : err);
    res.status(500).json({ message: 'Server error.' });
  }
};
