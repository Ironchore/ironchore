
const express = require('express');
const router = express.Router({ mergeParams: true });
const homeWork = require('../controllers/home-work.controller');
const secure = require('../middleware/secure.middleware');

router.get('/', secure.isAuthenticated, homeWork.list);
// router.post('/', secure.isAuthenticated, homeWork.create);
router.put('/:id', secure.isAuthenticated, homeWork.update);
router.get('/:id', secure.isAuthenticated, homeWork.get);

module.exports = router;