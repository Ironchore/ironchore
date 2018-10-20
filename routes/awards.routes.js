const express = require('express');
const router = express.Router({ mergeParams: true });
const awards = require('../controllers/awards.controller')
const secure = require('../middleware/secure.middleware');
const user = require('../middleware/user.middleware');


router.get('/', secure.isAuthenticated, awards.list);
router.post('/', secure.isAuthenticated, user.isTutor, awards.create);
router.delete('/:id', secure.isAuthenticated, user.isTutor, awards.delete);

module.exports = router;
