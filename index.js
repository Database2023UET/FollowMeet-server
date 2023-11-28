import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";
import initDatabase from "./initDatabase.js";
import authRoutes from "./API/routes/auth.js";
import postRoutes from "./API/routes/post.js";
import commentRoutes from "./API/routes/comment.js";
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

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

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
