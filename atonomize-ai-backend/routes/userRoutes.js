const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.post('/users/:username', UserController.saveUser);
router.get('/users', UserController.getAllUsersSorted);
router.delete('/users/:username', UserController.deleteUser); 

module.exports = router;
