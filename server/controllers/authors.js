const pool= require('../queries');
const {registerAuthorValidation}= require('../middleware/validate');


// Create authors
const addAuthor = async (req, res) => {

  try{
      const {error} = registerAuthorValidation(req.body);
       if (error) {
        return res.status(400).send((error.details[0].message).toString());
      }
      const {firstName, lastName, email, password, image} = req.body;
      let author = await pool.query(
          "INSERT INTO authors (firstName,lastName, email, password, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [firstName,lastName, email, password, image]
      );
      res.status(200).json(author);
   
  } catch (err){
      console.error(err.message);
  }
};
//  Read all authors
const getAllAuthors= async(req, res) => {
   
    try{
      const users= await pool.query("SELECT * FROM authors");
      res.status(200).json(users.rows);

    }catch(err){
      console.error(err.message);
    }

};

// get author by name
const getAuthorByName = async (req, res) =>{
  try{ 
       const {firstName, lastName} = req.params;
       const author = await pool.query(
         "SELECT * FROM authors WHERE firstName = $1, lastName = $2 ",
        [firstName, lastName]);
       if(author.rows.length === 0){
           console.log("Author not Found");
       }
       res.json(author.rows)
   } catch(error){
       console.log(error.message);
   }
};
//  read author by id
const getAuthorById= async(req, res) => {
   
    try{
        const author_id = parseInt(req.params.id);
        console.log(author_id);
        let authors= await pool.query("SELECT * FROM authors WHERE author_id = $1 ",[author_id]);
        console.log(authors.rows);
        if(authors.rows.length===0){
          console.log("empty")
          }
       
        res.status(200).json(authors.rows);
    
      }catch(err){
        console.error(err.message);
      }

};

// update author by id 

const updateAuthor = async (req, res)=>{
  try {
    const {error} = registerAuthorValidation(req.body);
       if (error) {
        return res.status(400).send((error.details[0].message).toString());
      }
    const author_id = parseInt(req.params.id);
    console.log(author_id);
    const  {firstName, lastName, email, password, image} = req.body;
    console.log( req.body);

    let authors = await pool.query(
      "UPDATE authors SET firstName = $1, lastName = $2, email = $3, password = $4, image = $5 WHERE author_id= $6",
      [firstName, lastName, email, password, image, author_id]
    );
    console.log(authors);
    res.status(200).json(authors);
    
  } catch (error) {
    console.log(error.message);
  }

};
// Delete author from db 

const deleteAuthor = async  (req, res)=>{
  try {
    const author_id = parseInt(req.params.id); 
    const author = await pool.query(
      "DELETE FROM authors WHERE author_id = $1",
      [author_id]
    );
    res.status(200).json(author);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {addAuthor, getAuthorByName, getAuthorById, getAllAuthors,deleteAuthor,updateAuthor};