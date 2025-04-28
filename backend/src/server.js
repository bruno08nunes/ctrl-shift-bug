const express = require("express");
const SwaggerUI = require("swagger-ui-express");
const cors = require("cors");
const connection = require("./lib/db.js");
const swagggerDocument = require("../swagger.json");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docs", SwaggerUI.serve, SwaggerUI.setup(swagggerDocument));

app.post("/users", (req, res) => {
    const {name, age} = req.body;
    const sql = `INSERT INTO users (name, age) VALUES (?, ?)`;
    const values = [name, age];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            res.status(201).json({data: result, message: "User Created", success: true});
        }
    });
});

app.get("/login", (req, res) => {
    const {email, password} = req.body;
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const values = [email, password];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        } else if (result.length === 0) {
            res.status(401).json({message: "Invalid Credentials"});
        } else {
            res.status(200).json({data: result[0], message: "Login Successful", success: true});
        }
    });
});

app.get("/rounds", (req, res) => {
    const sql = `SELECT * FROM rounds order by points desc`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            res.status(200).json({data: result, message: "Rounds Retrieved", success: true});
        }
    });
});

app.post("/rounds", (req, res) => {
    const {userId, points} = req.body;
    const sql = `INSERT INTO rounds (userId, points) VALUES (?, ?)`;
    const values = [userId, points];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            res.status(201).json({data: result, message: "Round Created", success: true});
        }
    });
});

app.listen(3000, () => console.log(3000));