import * as argon2 from "argon2";
import checkUserExist from "../Utils/checkUserExist.js";
import getUserPasswordHash from "../Utils/getUserPasswordHash.js";
import express from "express";

async function login(username, password) {
    if (await checkUserExist(username) == false) {
        throw new Error("User is not exist");
    } else {
        const passwordHash = await getUserPasswordHash(username);
        const isPasswordCorrect = await argon2.verify(passwordHash, password);
        if (!isPasswordCorrect) {
            throw new Error("Password is not correct");
        }
    }
}

const router = express.Router();

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	console.log(req.body);
	try {
		await login(username, password);
		res.send("Login successfully");
	} catch (err) {
		res.status(400).send(err.message);
		return;
	}
});

export default router;