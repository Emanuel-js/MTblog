const pool= require('../queries');
const {registerAuthorValidation}= require('../middleware/validate');


// Create authors
const addAuthor = async (req, res) => {

  try{
      const {error} = registerAuthorValidation(req.body);
       if (error) {
        return res.status(400).send((error.details[0].message).toString());
      }
      const {fullName, email, password, image} = req.body;
      let author = await pool.query(
          "INSERT INTO authors (fullName, email, password, image) VALUES ($1, $2, $3, $4) RETURNING *",
          [fullName, email, password, image]
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
       const {fullName} = req.params;
      console.log(fullName);
       const author = await pool.query(
         "SELECT * FROM authors WHERE fullName = $1 ",
        [fullName]);
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
      "UPDATE authors SET fullName = $1, email = $2, password = $3, image = $4 WHERE author_id= $5",
      [fullName, email, password, image, author_id]
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