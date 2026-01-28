const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users(name,email,password) VALUES (?,?,?)",
    [name, email, hash],
    () => res.send("Registered")
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (result.length === 0) return res.send("User not found");

    const match = await bcrypt.compare(password, result[0].password);
    if (match) res.json(result[0]);
    else res.send("Invalid password");
  });
});

module.exports = router;
