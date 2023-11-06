import pool from "../database.js";
import checkUserExist from "./checkUserExist.js";
import hashThePassword from "./hashThePassword.js";

export default async function createNewUser(username, email, password, fullName, gender) {
    if (!checkUserExist(username)) {
        throw new Error("User is already exist");
    }
    const id = await pool.query("SELECT COUNT(*) FROM users") + 1;
    const passwordHash = await hashThePassword(password);
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
        await pool.query("INSERT INTO users (id, passwordHash, userName, fullName, email, gender, createdAt) VALUES (?)", data);
    } catch (err) {
        throw err;
    }
}