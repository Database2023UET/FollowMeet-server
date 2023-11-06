import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";
import login from "./API/login.js";
import createNewUser from "./API/Utils/createNewUser.js";
import initDatabase from "./API/Utils/initDatabase.js";
import register from "./API/register.js";
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
app.get("/", async (req, res) => {
	await initDatabase();
	res.send("Hello World");
});

app.get("/register", async (req, res) => {
	const { username, email, password, fullName, gender } = req.body;
	console.log(req.body);
	try {
		await register(username, email, password, fullName, gender);
	} catch (err) {
		throw err;
	}
});

/* SERVER */
app.listen(port, async () => {
	console.log(`Server is listening on port ${port}`);
});
