const express = require("express");
const conn = require("./connection");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const authenticateToken = require('./middlewares/auth');

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

// app.get("/users", async (req, res) => {
//   try {
//     const query = "SELECT * FROM `user`";
//     const [data] = await conn.promise().execute(query); // Use .promise() to get a promise-based API
//     res.send(data);
//   } catch (error) {
//     res.status(500).send("There was an error in fetching data: " + error.message);
//   }
// });

app.post("/register", async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    // Log the incoming data to debug
    console.log("Incoming data:", { name, email, age, password });

    // Check for missing fields
    if (!name || !email || !age || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const checkemailquery = "SELECT * FROM `user` WHERE email = ?";
    const [results] = await conn.promise().execute(checkemailquery, [email]);

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    const hashedpassword = await bcrypt.hash(password, salt);

    // Log the generated salt and hashed password
    console.log("Generated salt:", salt);
    console.log("Hashed password:", hashedpassword);

    const insertquery = "INSERT INTO `user`(`name`, `email`, `age`, `password`) VALUES (?,?,?,?)";
    await conn.promise().execute(insertquery, [name, email, age, hashedpassword]);

    const accesstoken = jwt.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Registration Success!" });
  } catch (error) {
    res.status(500).json({ message: "Error in registration: " + error.message });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const checkemailquery = "SELECT * FROM user WHERE email=?";
  conn.execute(checkemailquery, [email], async (error, data) => {
    if (error) {
      return res.status(500).send("Error: ", error.message);
    }
    if (data.length == 0) {
      return res.status(400).send("email is not found");
    }
    const user = data[0];
    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if (!ispasswordvalid) {
      return res.status(400).send("invalid password");
    }
    const accesstoken = jwt.sign(
      { email: user.email, password: user.password },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ accesstoken });
  });
});

app.get("/products", authenticateToken, (req, res) => {
  res.send("protected route");
});

app.listen(3500, () => {
  console.log("Server is running on port 3500");
});
