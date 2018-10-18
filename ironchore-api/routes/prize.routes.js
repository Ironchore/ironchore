const express = require('express');
const router = express.Router({ mergeParams: true });
const prize = require('../controllers/prize.controller');
const secure = require('../middleware/secure.middleware');
const user = require('../middleware/user.middleware');

router.get('/', secure.isAuthenticated, prize.list);
router.post('/', secure.isAuthenticated, user.isKid, prize.create);
router.put('/:id', secure.isAuthenticated, user.isTutor, prize.update);
router.get('/:id', secure.isAuthenticated, prize.get);

module.exports = router;