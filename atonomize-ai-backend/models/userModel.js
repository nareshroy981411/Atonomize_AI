const db = require('../config/db');

const UserModel = {
  findUserByUsername: (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  },
  saveUser: (userData, callback) => {
    const { username, avatar_url, location, public_repos, public_gists, followers, following, created_at } = userData;
    db.query(
      'INSERT INTO users (username, avatar_url, location, public_repos, public_gists, followers, following, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [username, avatar_url, location, public_repos, public_gists, followers, following, created_at],
      callback
    );
  },
  getAllUsersSorted: (sortField, callback) => {
    const query = `SELECT * FROM users ORDER BY ??`;
    db.query(query, [sortField], callback);
  },
  deleteUser: (username, callback) => {
    db.query('DELETE FROM users WHERE username = ?', [username], callback);
  },
};

module.exports = UserModel;
