const axios = require('axios');
const UserModel = require('../models/userModel');

const UserController = {
  saveUser: async (req, res) => {
    const { username } = req.params;

    UserModel.findUserByUsername(username, async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err.message });

      if (results.length > 0) {
        return res.status(200).json({ message: 'User already exists', data: results[0] });
      }

      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const userData = {
          username: response.data.login,
          avatar_url: response.data.avatar_url,
          location: response.data.location,
          public_repos: response.data.public_repos,
          public_gists: response.data.public_gists,
          followers: response.data.followers,
          following: response.data.following,
          created_at: new Date(response.data.created_at).toISOString().slice(0, 19).replace('T', ' '),
        };

        UserModel.saveUser(userData, (err) => {
          if (err) return res.status(500).json({ error: 'Error saving user', details: err.message });
          res.status(201).json({ message: 'User saved successfully', data: userData });
        });
      } catch (apiError) {
        res.status(500).json({ error: 'GitHub API error', details: apiError.message });
      }
    });
  },

  getAllUsersSorted: async (req, res) => {
    UserModel.getAllUsersSorted((err, users) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err.message });
      res.status(200).json({ message: 'Users retrieved successfully', data: users });
    });
  },
  deleteUser: (req, res) => {
    const { username } = req.params;

    UserModel.deleteUser(username, (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err.message });

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
  },
};

module.exports = UserController;
