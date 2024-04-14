// server.js
import express from 'express'
import session from "express-session";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 4000;

app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL || "http://localhost:3000", 
    })
  );

// Express session middleware with cookie configuration
app.use(session({
  secret: 'secret', // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    sameSite: 'strict', // Set to 'strict' for better security
    secure: false, // Set to 'true' if using HTTPS
    httpOnly: true // Prevent client-side JavaScript access to the cookie
  }
}));

// Express JSON middleware
app.use(express.json());

// Routes
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  if (req.session.user && req.session.user.username == username ) {
    return res.status(400).json({ message: 'User already signed up' });
  }
  req.session.user = { username, password }; // Set session variable
  res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { user } = req.session;
  if (!user || user.username !== username || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  res.status(200).json({ message: 'Login successful', user });
});

app.post('/logout', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'User not logged in' });
  }
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
