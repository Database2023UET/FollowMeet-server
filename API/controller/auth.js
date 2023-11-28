import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import pool from "../database.js";
import checkValidUsername from "../Utils/checkValidUsername.js";
import checkValidEmail from "../Utils/checkValidEmail.js";
import checkValidPassword from "../Utils/checkValidPassword.js";
import checkValidFullName from "../Utils/checkValidFullName.js";
import checkUserNotExist from "../Utils/checkUserNotExist.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [user, fields] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length === 0) {
            throw new Error("User is not exist");
        }
        console.log(user[0]);
        const passwordHash = user[0].passWordHash;
        console.log(passwordHash);
        console.log(password);
        if (!(await argon2.verify(passwordHash, password))) {
            throw new Error("Wrong password or username");
        }
        
        // const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
        // res.cookie("token", token, { httpOnly: true });

        res.send(user[0].id.toString());
    } catch (err) {
        res.status(500).send(err.message);
    }
}


export const register = async (req, res) => {
    const {username, email, password, fullName, gender} = req.body;
    console.log(req.body);
    try {
        // check valid
        await checkValidUsername(username);
        await checkValidEmail(email);
        await checkValidPassword(password);
        await checkValidFullName(fullName);
        await checkUserNotExist(username);

        let result = await pool.query("SELECT COUNT(*) as count FROM users");
        let id = result[0][0].count + 1; // id = total number of users + 1
        let passwordHash = await argon2.hash(password);
        const data = [
            id,
            passwordHash,
            username,
            fullName,
            email,
            gender,
            new Date(),
        ];
        await pool.query(
            "INSERT INTO users (id, passwordHash, userName, fullName, email, gender) VALUES (?, ?, ?, ?, ?, ?)",
            data);
        res.send("Register successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

export const logout = async (req, res) => {

}

export const test = async (req, res) => {
    res.send("test");
}