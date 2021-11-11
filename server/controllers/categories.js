const pool = require('../queries');
//  add category to mtblog db
const addCategory = async (req, res) =>{
    try {
        const {category_name, number_of_blogs} = req.body;
        console.log(req.body);
        const category = await pool.query(
            "INSERT INTO categories (category_name, number_of_blogs) VALUES ($1, $2) RETURNING *",
            [category_name, number_of_blogs]
        );
        res.json(category);
        console.log({category});
        
    } catch (error){
        console.log(error.message);
        
    }
};
// get all categories from mtblog db
const getAllCategories = async (req, res)=>{
    try {
        // const {query} = req.params;
        const categories = await pool.query("SELECT * FROM categories ")
        res.json(categories.rows);
    } catch (error) {
        console.log(error.message);
    }
};
//  get category By Id
const getCategoryById = async (req, res) =>{
   try{ 
        const {query} = req.params;
        const category = await pool.query("SELECT * FROM categories WHERE category_id = $1", [query]);
        if(category.rows.length === 0){
            console.log("Category is Empty");
        }
        res.json(category.rows)
    } catch(error){
        console.log(error.message);
    }
};

// update categories that are in the mtblog db 

const updateCategory = async (req, res)=>{
    try {
        const category_id = parseInt(req.params.id);
        const {category_name, number_of_blogs} = req.body;
        let category = await pool.query(
            "UPDATE categories SET category_name = $1, number_of_blogs = $2 WHERE category_id = $3",
            [category_name, number_of_blogs]
        );
        
    } catch (error) {
        console.log(error.message);
        
    }
};

// DELETE category
const deleteCategory = async (req, res)=>{
    try {
        const category_id = parseInt(req.params.id);
        const category = await pool.query(
            "DELETE FROM categories WHERE category_id = $1",
            [category_id]
        );
        res.status(200).json(category);
        
    } catch (error) {
        console.log(error.message);
        
    }

}; 

module.exports = {addCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory};