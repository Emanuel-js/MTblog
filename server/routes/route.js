const express = require('express');


const {
    addAuthor, 
    getAuthorById,
    getAllAuthors,
    updateAuthor,
    deleteAuthor
    
} = require('../controllers/authors');
const{
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}=require('../controllers/categories')

const router= express.Router();
// authors end points
router.get('/authors',getAllAuthors)
router.get('/author/:id', getAuthorById);
router.post('/author', addAuthor);
router.put('/author/:id', updateAuthor);
router.delete('/author/:id', deleteAuthor);

// category end points

router.get('/category',getAllCategories)
router.get('/category/:id', getCategoryById);
router.post('/category', addCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);
module.exports = router;