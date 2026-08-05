require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((error) => {
    if (error) {
        console.error("Database connection failed:", error.message);
        return;
    }

    console.log("DB connected successfully");
});

app.post("/contact", (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            message: "Name, email and message are required."
        });
    }

    const sql = `
        INSERT INTO contacts (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name.trim(), email.trim(), subject?.trim() || "", message.trim()],
        (error, result) => {
            if (error) {
                console.error("Database insert error:", error.message);

                return res.status(500).json({
                    message: "Error saving message."
                });
            }

            res.status(201).json({
                message: "Message saved successfully!",
                id: result.insertId
            });
        }
    );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});