
const express = require('express');
const router = express.Router({ mergeParams: true });
const chores = require('../controllers/chores.controller');
const secure = require('../middleware/secure.middleware');
const user = require('../middleware/user.middleware');

router.get('/', secure.isAuthenticated, chores.list);
router.post('/', secure.isAuthenticated, user.isTutor, chores.create);
router.delete('/:id', secure.isAuthenticated, user.isTutor, chores.delete);

module.exports = router;
