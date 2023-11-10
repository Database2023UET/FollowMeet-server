import * as argon2 from "argon2";
import checkUserExist from "./Utils/checkUserExist.js";
import getUserPasswordHash from "./Utils/getUserPasswordHash.js";
import pool from "./database.js";
import hashThePassword from "./Utils/hashThePassword.js";

export default async function login(username, password) {
  if ((await checkUserExist(username)) == false) {
    throw new Error("User is not exist");
  } else {
    const passwordHash = await getUserPasswordHash(username);
    const isPasswordCorrect = hashThePassword(password) == passwordHash;
    if (!isPasswordCorrect) {
      throw new Error("Password is not correct");
    }
  }
}
