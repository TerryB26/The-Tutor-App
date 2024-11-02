import jwt from 'jsonwebtoken';

const mockDatabase = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

const SECRET_KEY = 'your_secret_key'; 

export default function handler(req, res) {
  const { action } = req.query;

  switch (action) {
    case "Login":
      if (req.method === 'POST') {
        const { username, password } = req.body;
        console.log("Login API Check:", { username, password });

        const user = mockDatabase.find(user => user.username === username && user.password === password);

        if (user) {
          const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
          console.log("🚀 ~ handler ~ token:", token)
          res.status(200).json({ message: 'Login successful', token });
        } else {
          res.status(401).json({ message: 'Invalid username or password' });
        }
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
      break;


      case"Register":
      if (req.method === 'POST') {
        const { username, password } = req.body;
        console.log("🚀 ~ handler ~ req.body:", req.body)
        console.log("Register API Check:", { username, password });

          const userExists = mockDatabase.some(user => user.username === username);

          if (userExists) {
            res.status(409).json({ message: 'Username already exists' });
          } else {
            mockDatabase.push({ username, password });
            res.status(201).json({ message: 'Registration successful' });
          }
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }

      break;


    default:
      res.status(400).json({ message: 'Unknown action' });
  }
}