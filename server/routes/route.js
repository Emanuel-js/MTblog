const express = require('express');


const {
    addAuthor, 
    getAuthorById,
    getAllAuthors,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authors');


const router= express.Router();
// authors end points
router.get('/authors',getAllAuthors)
router.get('/author/:id', getAuthorById);
router.post('/author', addAuthor);
router.put('/author/:id', updateAuthor);
router.delete('/author/:id', deleteAuthor);

// category end points


module.exports = router;