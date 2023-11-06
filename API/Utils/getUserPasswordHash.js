import pool from "../database.js";


/** 
    assume that username is exist and unique
*/ 
export default async function getUserPasswordHash(username) {
    const [rows, fields] = await pool.query(`SELECT password FROM users WHERE username = '${username}'`);
    console.assert(rows.length === 1, "username is not unique");
    return rows[0].password;
}