const express = require("express");
const SwaggerUI = require("swagger-ui-express");
const cors = require("cors");
const connection = require("./lib/db.js");
const swagggerDocument = require("../swagger.json");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docs", SwaggerUI.serve, SwaggerUI.setup(swagggerDocument));

app.post("/register", (req, res) => {
    const {name, email, password} = req.body;
    const sql = `INSERT INTO players (name, email, password) VALUES (?, ?, ?)`;
    const values = [name, email, password];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            res.status(201).json({data: result, message: "User Created", success: true});
        }
    });
});

app.get("/rounds", (req, res) => {
    const sql = `SELECT p.name AS name, r.weeks AS weeks FROM rounds r
    JOIN players p ON r.player_id = p.id ORDER BY r.weeks DESC;`;
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
    const {player_id, weeks} = req.body;
    const sql = `INSERT INTO rounds (player_id, weeks) VALUES (?, ?)`;
    const values = [player_id, weeks];
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