import pool from "../database.js";

/**
 * function to get user info
 * @param userId
 * @returns object of user
 */
export const getUserInfos = async (req, res) => {
  const { userId } = req.query;
  try {
    const command = "SELECT * FROM users WHERE id = ?";
    const [users, fields] = await pool.query(command, [userId]);
    if (users.length === 0) {
      throw new Error(`User ${userId} is not exist`);
    }
    users.forEach((element) => {
      delete element.passwordHash;
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
      throw new Error("Username is not exist");
    }
    res.send(users[0].id.toString());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getUsernameById = async (req, res) => {
  const { userId } = req.query;
  try {
    const command = "SELECT * FROM users WHERE id = ?";
    const [users, fields] = await pool.query(command, [userId]);
    if (users.length === 0) {
      throw new Error("User id is not exist");
    }
    res.send(users[0].username);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const suggestUser = async (req, res) => {
  const { userId } = req.query;
  try {
    let command =
      "select * from users where users.id not in (select ufu.userTargetId from user_follow_user as ufu) and users.id != (?) order by rand() limit 3;";
    const [users, fields] = await pool.query(command, [userId]);
    users.forEach((element) => {
      delete element.passWordHash;
    });
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
