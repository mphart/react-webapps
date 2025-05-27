const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8080

app.use(cors)
app.use(express.json)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const db = require('./db.js')

// LOGIN ROUTE
app.get("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "All fields required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT id,name,password_hash FROM users WHERE email = ?",
      [email]
    );
    if (!rows.length || rows[0].password_hash !== hash(password)) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    // Return user id & name
    res.send({ userId: rows[0].id, name: rows[0].name });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});