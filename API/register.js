import createNewUser from "./Utils/createNewUser.js";

export default async function register(
	username,
	email,
	password,
	fullName,
	gender
) {
	try {
		await createNewUser(username, email, password, fullName, gender);
	} catch (err) {
		throw err;
	}
}
