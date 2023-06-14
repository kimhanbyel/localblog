const express = require('express');
const router = express.Router();
const myBlogHandler = require('../handlers/myBlog');

router.use(myBlogHandler.index);
router.get('/:userID', myBlogHandler.userID);
router.post('/:userID/edit', myBlogHandler.userEdit);

module.exports = router;