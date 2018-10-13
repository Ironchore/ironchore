
const express = require('express');
const router = express.Router({ mergeParams: true });
const homework = require('../controllers/homework.controller');
const secure = require('../middleware/secure.middleware');
const user = require('../middleware/user.middleware');

router.get('/', secure.isAuthenticated, homework.list);
router.post('/', secure.isAuthenticated, user.isKid, homework.create);
router.put('/:id', secure.isAuthenticated, user.isTutor, homework.update);
router.get('/:id', secure.isAuthenticated, homework.get);

module.exports = router;