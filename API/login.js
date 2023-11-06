import checkUserExist from "./Utils/checkUserExist.js";
import getUserPasswordHash from "./Utils/getUserPasswordHash.js";
import pool from "./database.js";

export default async function login(username, password) {
    if (!checkUserExist(username)) {
        throw new Error("User is not exist");
    } else {
        const passwordHash = await getUserPasswordHash(username);
        const isPasswordCorrect = await argon2.verify(passwordHash, password);
        if (!isPasswordCorrect) {
            throw new Error("Password is not correct");
        }
    }
}