const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Robin@123",
    database: "college_event"
});

db.connect((err) => {
    if (err) {
        console.log("Connection Error:", err);
    } else {
        console.log("MySQL Connected");
    }
});

app.post("/register", (req, res) => {

    console.log("Received Data:", req.body);

    const { name, email, phone, college, event } = req.body;

    const sql =
        "INSERT INTO registrations(name,email,phone,college,`event`) VALUES(?,?,?,?,?)";

    db.query(
        sql,
        [name, email, phone, college, event],
        (err, result) => {

            if (err) {
                console.log("MySQL Error:", err);
                return res.send("Error");
            }

            console.log("Inserted Successfully");
            res.send("Registration Success");
        }
    );
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
