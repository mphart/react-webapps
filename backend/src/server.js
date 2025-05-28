/**
 * Express Server For mphart's React Portfolio
 * 
 * @author Mason Hart
*/

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const db = require('./db.js');
const {createHash} = require('crypto')

app.use(cors());
app.use(express.json());


// hash function for passwords
function hash(input){
  return createHash('sha256').update(input).digest('hex')
}

// SIGNUP ROUTE
app.post("/api/signup", async (req, res) => {
  const { email, password, username, datetime } = req.body;
  // verify fields
  if(!email || !password || !username){
    return res.status(400).send({error: "Required field was null"});
  }

  try{
    // check if email is in use
    const [exists] = await db.query("SELECT (email) FROM users",[email]);
    if(exists.length){
      res.status(409).send({error: "Email is already in use"})
    }
    // check if username is in use
    [exists] = await db.query("SELECT (username) FROM users",[username]);
    if(exists.length){
      res.status(409).send({error: "Username is already in use"})
    }
    // make the query
    const password = hash(password);
    const result = await db.query(
      "INSERT INTO users (email,password,username,joindate,admin) VALUES (?,?,?,?,?)",
      [email, password, username, datetime, false]
    );
    // Return the new user’s id, username, and admin status
    const userId = hash(result.insertId);
    res.status(201).send({userId: userId, username: result.username, admin: result.admin});
  }catch(err){
    console.error(err);
    res.status(500).send({error: "Internal Server Error"})
  }
});

// LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  // verify fields
  if (!email || !password) {
    return res.status(400).send({error: "All fields required"});
  }

  try {
    // make the query
    const [rows] = await db.query("SELECT id,username,password FROM users WHERE email = ?", [email]);
    // check if user exists and validate password
    if (!rows.length || rows[0].password !== hash(password)) {
      return res.status(401).send({error: "Invalid credentials"});
    }
    // Return user id and username
    const userId = hash(rows[0].id.toString())  // hash the user id so that the number of stored users is unknown
    res.send({ userId: userId, username: rows[0].username });
  } catch (err) {
    console.error(err);
    res.status(500).send({error: "Internal Server Error"});
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});