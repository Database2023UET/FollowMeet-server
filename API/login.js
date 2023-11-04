import checkUserExist from "./Utils/checkUserExist.js";
import getUserHashPassword from "./Utils/getUserHashPassword.js";
import pool from "./database.js";

export default async function login(username, password) {
    if (!checkUserExist(username)) {
        throw new Error("User is not exist");
    } else {
        const hashPassword = await getUserHashPassword(username);
        const isPasswordCorrect = await argon2.verify(hashPassword, password);
        if (!isPasswordCorrect) {
            throw new Error("Password is not correct");
        }
    }
}