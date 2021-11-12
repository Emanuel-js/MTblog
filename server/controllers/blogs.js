let pool = require('../queries');
let {registerBlogValidation} = require('../middleware/validate');

//addBlog 
let addBlog = async (req, res) =>{
    try {
        let {error} = registerBlogValidation(req.body);
        if (error) {
            return res.status(400).send((error.details[0].message).toString());
        }
        let {title, description, body, image, author_names, tag_names, category_name, isFeatured, isPublished} = req.body;
        let category = await pool.query(
         "SELECT * FROM categories WHERE category_name = $1",
        [category_name]);
       if(category.rows.length === 0){
            let number_of_blogs=0
            category = await pool.query(
            "INSERT INTO categories (category_name, number_of_blogs) VALUES ($1, $2) RETURNING *",
            [category_name, number_of_blogs]
        );
       }
       let category_id = category.rows[0].category_id;
       let oldNumOfBlogsInCategory = category.rows[0].number_of_blogs;
        let author_ids=[];
        author_names.forEach(async (author_name) =>  {
             let author = await pool.query(
         "SELECT * FROM authors WHERE fullName = $1",
        [author_name]);
       if(author.rows.length === 0){

            return res.status(400).send('Sorry Author not Registered');
       }

       let author_id = author.rows[0].author_id;
       author_ids.push(author_id);
        });


        let blog = await pool.query(
            "INSERT INTO blogs (title, description, body, image, isPublished, category_id, date_created, isFeatured) VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7) RETURNING *",
            [title, description, body, image, isPublished, category_id, isFeatured]
        );
        let blog_id = blog.rows[0].blog_id;
         let newCategory = await pool.query(
            "UPDATE categories SET category_name = $1, number_of_blogs = $2 WHERE category_id = $3",
            [category_name, oldNumOfBlogsInCategory++, category_id]
        );
        let blog_authors=[];
        author_ids.forEach(async (author_id) =>  {
            
      
        let blog_author = await pool.query(
            "INSERT INTO blog_author (blog_id, author_id) VALUES ($1, $2) RETURNING *",
            [blog_id, author_id]
        );
        blog_authors.push(blog_author)
        // console.log(blog_author);
        });

        let blog_tags=[];
        tag_names.forEach(async tag_name => {
             let tag = await pool.query(
         "SELECT * FROM tags WHERE tags_name = $1",
        [tag_name]);
       if(tag.rows.length === 0){
             tag = await pool.query(
            "INSERT INTO tags (tags_name) VALUES ($1) RETURNING *",
            [tag_name]
        );
       }

       let tag_id = tag.rows[0].tags_id;
        let blog_tag = await pool.query(
            "INSERT INTO blog_tags (blog_id, tags_id) VALUES ($1, $2) RETURNING *",
            [blog_id, tag_id]
        );
        blog_tags.push(blog_tag);
        // console.log(blog_tag);
        });


        res.json({blog, blog_authors, blog_tags});
        // console.log(blog);
        
    } catch (error){
        console.log(error.message);
        
    }
};
// get all blogs from mtblog db
let getAllBlogs = async (req, res)=>{
    try {
        // let {query} = req.params;
        let blogs = await pool.query("SELECT * FROM blogs ")
        res.json(blogs.rows);
    } catch (error) {
        console.log(error.message);
    }
};
//  get blog By Id
let getBlogById = async (req, res) =>{
   try{ 
        let blog_id = parseInt(req.params.id);
        let blog = await pool.query("SELECT * FROM blogs WHERE blog_id = $1", [blog_id]);
        if(blog.rows.length === 0){
            console.log("Blog not Found!");
        }
        res.json(blog.rows)
    } catch(error){
        console.log(error.message);
    }
};

// update blogs that are in the mtblog db 
let updateBlog = async (req, res)=>{
    try {
        let {error} = registerBlogValidation(req.body);
        if (error) {
            return res.status(400).send((error.details[0].message).toString());
        }
        let blog_id = parseInt(req.params.id);
        let oldBlog = await pool.query(
         "SELECT * FROM blogs WHERE blog_id = $1",
        [blog_id]);
      
        let {title, description, body, image, category_name, isFeatured, isPublished} = req.body;
          let category = await pool.query(
         "SELECT * FROM categories WHERE category_name = $1",
        [category_name]);
       if(category.rows.length === 0){
            let number_of_blogs=0
            category = await pool.query(
            "INSERT INTO categories (category_name, number_of_blogs) VALUES ($1, $2) RETURNING *",
            [category_name, number_of_blogs]
        );
       }
        
        //cant edit authors
        let oldDate= oldBlog.rows[0].date_created;
        
        
       let category_id = category.rows[0].category_id;
   
      
        let blog = await pool.query(
            "UPDATE blogs SET title = $1, description = $2, body = $3, image = $4, isPublished=$5, category_id=$6,  date_created=$7, isFeatured=$8 WHERE blog_id = $9",
            [title, description, body, image, isPublished, category_id, oldDate, isFeatured, blog_id]
        );
         res.json("Blog updated successfully");
        
    } catch (error) {
        console.log(error.message);
        
    }
};

// DELETE blog
let deleteBlog = async (req, res)=>{
     try{
      let {id}= req.params;
      let blog=await pool.query("DELETE FROM blogs WHERE blog_id = $1",[id]);
      res.json("Blog deleted successfully");
    }catch(err){
      console.error(err.message);
    }
}; 

module.exports = {addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog};