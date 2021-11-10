const pool= require('../queries');


const addAuthor = async (req, res) => {
  try{
      const {firstName, email, password, image} = req.body;
      let author = await pool.query(
          "INSERT INTO authors (firstName, lastName, email, password, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [firstName,firstName, email, password, image]
      );
      res.json(author);
   
  } catch (err){
      console.error(err.message);
  }
};
const getAllAuthors= async(req, res) => {
   
    try{
      const users= await pool.query("SELECT * FROM authors");
      res.json(users.rows);

    }catch(err){
      console.error(err.message);
    }

};
const getAuthorById= async(req, res) => {
   
    try{
        const author_id = parseInt(req.params.id);
        console.log(author_id);
        let authors= await pool.query("SELECT * FROM authors WHERE author_id = $1 ",[author_id]);
        console.log("authors.rows");
        if(authors.rows.length===0){
          console.log("empty")
          }
       
        res.json(authors);
    
      }catch(err){
        console.error(err.message);
      }

};


module.exports = {addAuthor, getAuthorById, getAllAuthors};