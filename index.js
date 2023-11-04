import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";
import mysql from "mysql";
/* CONFIGUARATION */
dotenv.config();
const app = express();
const port = parseInt(process.env.PORT);

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/check", (req, res) => {
  res.send("Hello World 3");
});


/* SERVER */

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    connectionLimit: 10,
});

pool.getConnection((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to the MySQL server.");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});