const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./Database/db');


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/blog', async (req, res) => {
   
 try {
     const { title, description, image, type, tags, body,created_at} = req.body;
     
     const post = await pool.query("INSERT INTO blogs(title, description, image, type, tags, body,created_at,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,NOW())",
         [title, description, image, type, tags,body,created_at]);
res.json(post);
 } catch (error) {
     console.log({msg: error.message});
 }
    
});
// pool.query("")

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`App is running on port ${port}`) });