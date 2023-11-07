import pool from "../database.js";
import checkUserExist from "./checkUserExist.js";
import checkValidEmail from "./checkValidEmail.js";
import checkValidFullName from "./checkValidFullName.js";
import checkValidPassword from "./checkValidPassword.js";
import checkValidUsername from "./checkValidUsername.js";
import hashThePassword from "./hashThePassword.js";

export default async function createNewUser(
	username,
	email,
	password,
	fullName,
	gender
) {
	await checkValidUsername(username).catch((err) => {
		throw err;
	});
	await checkValidEmail(email).catch((err) => {
		throw err;
	});
	await checkValidPassword(password).catch((err) => {
		throw err;
	});
	await checkValidFullName(fullName).catch((err) => {
		throw err;
	});
	if ((await checkUserExist(username))) {
		throw new Error("Username is already exist");
	}
	let result = await pool.query("SELECT COUNT(*) as count FROM users");
	let id = result[0][0].count + 1;
	let passwordHash = await hashThePassword(password);
	const data = [
		id,
		passwordHash,
		username,
		fullName,
		email,
		gender,
		new Date(),
	];
	try {
		await pool.query(
			"INSERT INTO users (id, passwordHash, userName, fullName, email, gender, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
			data
		);
	} catch (err) {
		throw err;
	}
}
