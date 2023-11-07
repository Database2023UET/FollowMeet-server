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
	res.send("Hello World");
});

app.post("/register", async (req, res) => {
	const { username, email, password, fullName, gender } = req.body;
	console.log(req.body);
	try {
		await register(username, email, password, fullName, gender);
		res.send("Register successfully");
	} catch (err) {
		console.log(err.message);
		res.status(400).send(err.message);
		return;
	}
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	console.log(req.body);
	try {
		await login(username, password);
		res.send("Login successfully");
	} catch (err) {
		console.log(err.message);
		res.status(400).send(err.message);
		return;
	}
});

/* SERVER */
app.listen(port, async () => {
	try {
		await initDatabase();
	} catch(err) {
		console.log(err.message);
		return;
	}
	console.log(`Server is listening on port ${port}`);
});
