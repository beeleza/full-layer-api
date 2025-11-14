const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");
const { User } = require("../db/models");

const userRepo = new UserRepository(User);

module.exports = {
  register: async (req, res) => {
    try {
      const user = await userRepo.createUser(req.body);

      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userRepo.validateUserLogin(email, password);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
