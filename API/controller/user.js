import pool from "../database.js";
import checkValidEmail from "../Utils/checkValidEmail.js";
import checkValidFullName from "../Utils/checkValidFullName.js";
import checkValidUsername from "../Utils/checkValidUsername.js";

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
      throw new Error("User is not exist");
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
      throw new Error("User is not exist");
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
      "select * from users left join user_follow_user as ufu on users.id = ufu.userTargetId where ufu.userTargetId is null and users.id != ? order by rand() limit 3;";
    const [users, fields] = await pool.query(command, [userId]);
    users.forEach((element) => {
      delete element.passWordHash;
    });
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateInfo = async (req, res) => {
  const userId = req.body.userId;
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  try {
    if (username) await checkValidUsername(username);
    if (email) await checkValidEmail(email);
    if (name) await checkValidFullName(name);
    let command = "UPDATE users SET ";
    let data = [];
    if (username) {
      let subCommand = "SELECT * FROM users WHERE username = ?";
      const [res, fields] = await pool.query(subCommand, [username]);
      if (res.length !== 0) {
        throw new Error("Username is already exist");
      }
      command += "username = ?, ";
      data.push(username);
    }
    if (name) {
      command += "name = ?, ";
      data.push(name);
    }
    if (email) {
      command += "email = ?, ";
      data.push(email);
    }
    command = command.slice(0, -2);
    command += " WHERE id = ?";
    data.push(userId);
    if (data.length === 1) {
      throw new Error("No data to update");
    }
    await pool.query(command, data);
    res.send("Update successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
