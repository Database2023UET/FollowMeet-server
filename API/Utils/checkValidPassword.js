export default async function checkValidPassword(password) {
	if (password.length < 6) {
		throw new Error("Password must be at least 6 characters");
	}
	if (!/^[a-zA-Z0-9_]+$/.test(password)) {
		throw new Error("Password must only contain letters, numbers and _");
    }
	return true;
}
