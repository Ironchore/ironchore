const express = require('express');
const router = express.Router({ mergeParams: true });
const uploader = require('../config/multer.config');
const kids = require('../controllers/kids.controller');
const secure = require('../middleware/secure.middleware');
const user = require('../middleware/user.middleware');

router.get('/', secure.isAuthenticated, kids.list);
router.post('/', secure.isAuthenticated, user.isMe('userId'), kids.create);
router.get('/:id', secure.isAuthenticated, kids.get);
router.delete('/:id', secure.isAuthenticated, user.isMe('userId'), kids.delete);

module.exports = router;