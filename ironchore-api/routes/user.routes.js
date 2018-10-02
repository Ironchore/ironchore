const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller');

router.post('/', users.create);
router.get('/', users.list);