import checkUserExist from "./Utils/checkUserExist.js";
import createNewUser from "./Utils/createNewUser.js";
import hashThePassword from "./Utils/hashThePassword.js";

/**
 * return true if register successfully
 */
export default async function register(
	username,
	email,
	password,
	fullName,
	gender
) {
	try {
		await createNewUser(username, email, password, fullName, gender);
		return true;
	} catch (err) {
		throw err;
	}
}
