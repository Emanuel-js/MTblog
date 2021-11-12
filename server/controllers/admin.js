const pool= require('../queries');

const { registerAdminValidation, loginAdminValidation } = require('../middleware/validate')
const bcrypt = require('bcryptjs');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');


const loginAdmin = async (req, res) => {
    const { error } = loginAdminValidation(req.body);
    if (error) {
        return res.status(400).send((error.details[0].message).toString());
    }
   
    let admin= await pool.query("SELECT * FROM admin WHERE email = $1 ",[req.body.email]);

    
    if (admin.rows.length===0) {
        return res.status(400).send('Email or password is incorrect');
    }

    const validPass = await bcrypt.compare(req.body.password, admin.rows[0].password);
    console.log(admin.rows[0].password);
    if (!validPass) {
        return res.status(400).send('Email or password is incorrect');
    }

    const token = jwt.sign({
        id: admin.rows[0].admin_id
    }, process.env.TOKEN_SECRET)
    const result = {
        role: 'admin',
        id: admin.rows[0].admin_id,
        token: token
    };

    res.status(200).send(result);
};

const registerAdmin = async (req, res) => {
    const { error } = registerAdminValidation(req.body);

    if (error) {
        return res.status(400).send((error.details[0].message).toString());
    }
     let emailExist= await pool.query("SELECT * FROM admin WHERE email = $1 ",[req.body.email]);
   
    if (emailExist.rows.length!==0) {
        return res.status(400).send('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const {firstName, lastName, email, password} = req.body;
    try{
      
      let admin = await pool.query(
          "INSERT INTO admin (firstName,lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
          [firstName,lastName, email, hashedPassword]
      );

      const token = jwt.sign({
                id:  admin.rows[0].admin_id
            }, process.env.TOKEN_SECRET);
            const postResult = {
                id: admin.rows[0].admin_id,
                role: 'admin',
                token: token
            };
            res.status(200).send(postResult);
     
   
  } catch (err){
      console.error(err.message);
  }

  
   
};




const logout = (req, res) => {
    const authToken = req.headers.authtoken;
    jwt.sign(authToken, "", { expiresIn: 0.1 }, (logout, err) => {
        if (logout) {
            res.send({
                msg: 'You have been Logged Out',
                token: null
            });
        } else {
            res.send({ msg: 'Error' });
        }
    });

};

module.exports = { registerAdmin, loginAdmin, logout }; 