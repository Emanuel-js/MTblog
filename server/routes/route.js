const express = require('express');

const {
    addAuthor, 
    getAuthorByName,
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
} = require('../controllers/categories');


const {
    addBlog,
getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require('../controllers/blogs');

const{
    loginAdmin,
    registerAdmin, 
    logout
}=require('../controllers/admin');
const { verify } = require('jsonwebtoken');


const router= express.Router();
// authors end points
router.get('/authors',getAllAuthors)
router.get('/author/:id', getAuthorById);
router.get('/author/:name', getAuthorByName);
router.post('/author', addAuthor);
router.put('/author/:id', updateAuthor);
router.delete('/author/:id', deleteAuthor);

// category end points

router.get('/category', getAllCategories)
router.get('/category/:id', getCategoryById);
router.post('/category', addCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

//blog end points
router.get('/blogs', getAllBlogs)
router.get('/blogs/:id', getBlogById);
router.post('/blogs', addBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

//admin end points
router.post('/loginAdmin', loginAdmin);
router.post('/registerAdmin', registerAdmin);
router.get('/logout', verify, logout);


module.exports = router;