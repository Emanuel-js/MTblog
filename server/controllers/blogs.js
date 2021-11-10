const pool = require('../queries');


//addBlog 
const addBlog = async (req, res) =>{
    try {
        const {title, description, body, image, author_id, category_id, isFeatured, isPublished} = req.body;
        const date_created = Date.now()
        const blog = await pool.query(
            "INSERT INTO blogs (title, description, body, image, isPublished, author_id, category_id, date_created, isFeatured) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8) RETURNING *",
            [title, description, body, image, isPublished, author_id, category_id, isFeatured]
        );
        res.json(blog);
        console.log({blog});
        
    } catch (error){
        console.log(error.message);
        
    }
};
// get all blogs from mtblog db
const getAllBlogs = async (req, res)=>{
    try {
        // const {query} = req.params;
        const blogs = await pool.query("SELECT * FROM blogs ")
        res.json(blogs.rows);
    } catch (error) {
        console.log(error.message);
    }
};
//  get blog By Id
const getBlogById = async (req, res) =>{
   try{ 
        const blog_id = parseInt(req.params.id);
        const blog = await pool.query("SELECT * FROM blogs WHERE blog_id = $1", [blog_id]);
        if(blog.rows.length === 0){
            console.log("Blog not Found!");
        }
        res.json(blog.rows)
    } catch(error){
        console.log(error.message);
    }
};

// update blogs that are in the mtblog db 
const updateBlog = async (req, res)=>{
    try {
        const blog_id = parseInt(req.params.id);
        const {title, description, body, image, author_id, category_id, isFeatured, isPublished} = req.body;
        let blog = await pool.query(
            "UPDATE blogs SET title = $1, description = $2, body = $3, image = $4, author_id = $5, category_id=$6, isFeatured=$7, isPublished=$8 WHERE blog_id = $9",
            [title, description, body, image, author_id, category_id, isFeatured, isPublished, blog_id]
        );
         res.json("Blog updated successfully");
        
    } catch (error) {
        console.log(error.message);
        
    }
};

// DELETE blog
const deleteBlog = async (req, res)=>{
     try{
      const {id}= req.params;
      const blog=await pool.query("DELETE FROM blogs WHERE blog_id = $1",[id]);
      res.json("Blog deleted successfully");
    }catch(err){
      console.error(err.message);
    }
}; 

module.exports = {addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog};