import pool from "../database.js";

export default async function checkUserExist(username) {
    const [rows, fields] = await pool.query(`SELECT * FROM users WHERE username = '${username}'`);
    if (rows.length === 0) {
        return false;
    } else {
        return true;
    }
}