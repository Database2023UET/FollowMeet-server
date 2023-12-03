import pool from "../database.js";

/**
 * function to get user info
 * @param userId
 * @returns object of user
 */
export const getUserInfos = async (req, res) => {
	const { userId } = req.query;
	console.log(userId);
	try {
		const command = "SELECT * FROM users WHERE id = ?";
		const [users, fields] = await pool.query(command, [userId]);
		if (users.length === 0) {
			throw new Error("User is not exist");
		}
		users.forEach((element) => {
			delete element.passWordHash;
		});
		res.send(users[0]);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

/**
 * function to get user id
 * @params username
 * @returns userId
 */
export const getUserIdByUsername = async (req, res) => {
	const { username } = req.query;
	try {
		const command = "SELECT * FROM users WHERE username = ?";
		const [users, fields] = await pool.query(command, [username]);
		if (users.length === 0) {
			throw new Error("User is not exist");
		}
		users.forEach((element) => {
			delete element.passWordHash;
		});
		res.send(users[0].id.toString());
	} catch (err) {
		res.status(500).send(err.message);
	}
}