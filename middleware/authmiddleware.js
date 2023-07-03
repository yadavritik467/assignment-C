

import { body, validationResult } from 'express-validator';



// Sample users data for demonstration purposes (Replace this with a real database)
const users = [
  { username: 'user1', password: 'P@ssw0rd' },
  { username: 'user2', password: '123456' },
];

// Middleware function to validate user input
const validateUserInput = [
  body('username').isAlphanumeric().isLength({ min: 6, max: 12 }),
  body('password').isLength({ min: 6 }).matches(/^[a-zA-Z0-9!@#$%^&*]+$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateUserInput;

// Login route
// app.post('/api/login', validateUserInput, (req, res) => {
//   const { username, password } = req.body;

//   // Replace this with a real authentication logic (e.g., database lookup)
//   const user = users.find((user) => user.username === username && user.password === password);

//   if (user) {
//     res.json({ message: 'Login successful!' });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials!' });
//   }
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
