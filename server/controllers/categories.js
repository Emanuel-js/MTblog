const pool = require('../queries');

const addCategory = async (req, res) =>{
    try {
        const {category_name, number_of_blogs} = req.body;
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

const getAllCategories = async (req, res)=>{
    try {
        // const {query} = req.params;
        const categories = await pool.query("SELECT * FROM categories ")
        res.json(categories.rows);
    } catch (error) {
        console.log(error.message);
    }
};

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