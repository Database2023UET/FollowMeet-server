import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";
import login from "./API/login.js";
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
app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
});