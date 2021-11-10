const express = require('express');


const {
    addAuthor, 
    getAuthorById
} = require('../controllers/authors');


const router= express.Router();

router.get('/authors/:id', getAuthorById);
router.post('/authors', addAuthor);


module.exports = router;