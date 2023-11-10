import * as argon2 from "argon2";

export default async function hashThePassword(password) {
	const passwordHash = await argon2.hash(password);
	return passwordHash;
}
