const express = require('express');


const {
    addAuthor, 
    getAuthorById,
    getAllAuthors
} = require('../controllers/authors');


const router= express.Router();
// authors
router.get('/authors',getAllAuthors)
router.get('/authors/:id', getAuthorById);
router.post('/authors', addAuthor);


module.exports = router;