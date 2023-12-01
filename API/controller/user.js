import pool from "../database.js";

export const getUserInfos = async (req, res) => {
    const { userId } = req.body;
    try {
        const command = "SELECT * FROM users WHERE id = ?";
        const [users] = await pool.query(command, [userId]);
        // Assuming that the query returns an array of users
        const sanitizedUsers = users.map(user => {
            const { passwordHash, ...sanitizedUser } = user;
            return sanitizedUser;
        });
        res.send(sanitizedUsers);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
