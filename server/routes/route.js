const {Router} = require('express');

const router= Router();
const {addAuthor, getAuthorById} = require('../controllers/authors');



router.get('/authors/:id', getAuthorById);
router.post('/authors', addAuthor);


module.exports = router;