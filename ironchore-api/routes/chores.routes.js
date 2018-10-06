
const express = require('express');
const router = express.Router({ mergeParams: true });
const chores = require('../controllers/chores.controller');
const secure = require('../middleware/secure.middleware');

router.post('/', secure.isAuthenticated, chores.create);
router.delete('/:id', secure.isAuthenticated, chores.delete);

module.exports = router;