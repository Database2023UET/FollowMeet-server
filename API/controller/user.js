import pool from "../database.js";

/**
 * function to get user info
 * @param userId
 * @returns object of user
 */
export const getUserInfos = async (req, res) => {
  const { userId } = req.body;
  try {
    const command = "SELECT * FROM users WHERE id = ?";
    const [users] = await pool.query(command, [userId]);
    users.forEach((element) => {
      delete element.passWordHash;
    });
    console.log(users);
    res.send(users[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
