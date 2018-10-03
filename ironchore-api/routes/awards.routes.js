const express = require('express');
const router = express.Router({ mergeParams: true });
const comments = require('../controllers/awards.controller')
const secure = require('../middleware/secure.middleware');

router.post('/', secure.isAuthenticated, awards.create);
router.delete('/:id', secure.isAuthenticated, awards.delete);

module.exports = router;