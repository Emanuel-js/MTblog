const pool= require('../queries');


const addAuthor = async (req, res) => {
  try{
      const {firstname,lastname, email, password, image} = req.body;
      let author = await pool.query(
          "INSERT INTO authors (firstname,lastname, email, password, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [firstname,lastname, email, password, image]
      );
      res.json(author);
   
  } catch (err){
      console.error(err.message);
  }
};
// const getAllAuthors= async(req, res) => {
//     // response.json({ info: 'Node.js, Express, and Postgres API' })
//     // console.log("Get working");
//     try{
//       const users= await pool.query("SELECT * FROM authors");
//       res.json(users.rows);

//     }catch(err){
//       console.error(err.message);
//     }

// };
const getAuthorById= async(req, res) => {
   
    try{
        const {query}=req.params;
        let authors= await pool.query("SELECT * FROM authors WHERE author_id = $1 ",[query]);
        if(authors.rows.length===0){
          console.log("empty")
           };
       
        res.json(authors.rows);
    
      }catch(err){
        console.error(err.message);
      }

};


module.exports = {addAuthor, getAuthorById};