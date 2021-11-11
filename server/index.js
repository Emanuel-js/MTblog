const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./database/db');
const auth = require('./middleware/auth');
const router = require('./routes/route');
const dotenv = require("dotenv");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extends:false}));
app.use(cors());

dotenv.config();


const port = process.env.PORT || 5000;

app.use('/', router);
// app.post('/api/blog', async (req, res) => {
   
//  try {
//      const { title, description, image, type, tags, body,created_at} = req.body;
     
//      const post = await pool.query("INSERT INTO blogs(title, description, image, type, tags, body,created_at,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,NOW())",
//          [title, description, image, type, tags,body,created_at]);
// res.json(post);
//  } catch (error) {
//      console.log({msg: error.message});
//  }
    
// });
// pool.query("")

app.listen(port, () => { 
    console.log(`App is running on port ${port}`) });