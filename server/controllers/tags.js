const pool = require('../queries');
const {registerTagValidation} = require('../middleware/validate');
//  add tag to mtblog db
const addTag = async (req, res) =>{
    try {
        const {error} = registerTagValidation(req.body);
        if (error) {
            return res.status(400).send((error.details[0].message).toString());
        }
        const {tags_name} = req.body;
        console.log(req.body);
        const tag = await pool.query(
            "INSERT INTO tags (tags_name) VALUES ($1) RETURNING *",
            [tags_name]
        );
        res.json(tag);
        console.log({tag});
        
    } catch (error){
        console.log(error.message);
        
    }
};
// get all tags from mtblog db
const getAllTags = async (req, res)=>{
    try {
        // const {query} = req.params;
        const tags = await pool.query("SELECT * FROM tags ")
        res.json(tags.rows);
    } catch (error) {
        console.log(error.message);
    }
};
//  get tag By Id
const getTagById = async (req, res) =>{
   try{ 
        const {query} = req.params;
        const tag = await pool.query("SELECT * FROM tags WHERE tags_id = $1", [query]);
        if(tag.rows.length === 0){
            console.log("Tag not Found");
        }
        res.json(tag.rows)
    } catch(error){
        console.log(error.message);
    }
};

//get Tag by Name
const getTagByName = async (req, res) =>{
   try{ 
        const {query} = req.params;
        const tag = await pool.query("SELECT * FROM tags WHERE tags_name = $1", [query]);
        if(tag.rows.length === 0){
            console.log("Tag not Found");
        }
        res.json(tag.rows)
    } catch(error){
        console.log(error.message);
    }
};

// update tag that are in the mtblog db 

const updateTag = async (req, res)=>{
    try {
        const {error} = registerTagValidation(req.body);
        if (error) {
            return res.status(400).send((error.details[0].message).toString());
        }
        const tags_id = parseInt(req.params.id);
        const {tags_name} = req.body;
        let tag = await pool.query(
            "UPDATE tags SET tags_name = $1 WHERE tags_id = $2",
            [tags_name, tags_id]
        );
        
    } catch (error) {
        console.log(error.message);
        
    }
};

// DELETE tag
const deleteTag = async (req, res)=>{
    try {
        const tags_id = parseInt(req.params.id);
        const tag = await pool.query(
            "DELETE FROM tags WHERE tags_id = $1",
            [tags_id]
        );
        res.status(200).json(tag);
        
    } catch (error) {
        console.log(error.message);
        
    }

};

module.exports = {addTag, getAllTags, getTagById, getTagByName, updateTag, deleteTag};