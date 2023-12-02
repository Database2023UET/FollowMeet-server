import pool from "../database.js";

export const reactPost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    let command = "SELECT * FROM user_react_post WHERE postId = (?) AND userId = (?);";
    const [users, fields] = await pool.query(command, [postId, userId]);
    if (users.length > 0) {
      throw new Error("User is already reacted");
    }
    command = "INSERT INTO user_react_post VALUES (?, ?);";
    await pool.query(command, [postId, userId]);
    res.send("React successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const unreactPost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    let command = "SELECT * FROM user_react_post WHERE postId = (?) AND userId = (?) ;";
    const [users, fields] = await pool.query(command, [postId, userId]);
    if (users.length === 0) {
        throw new Error("User is not reacted");
    }
    command = "DELETE FROM user_react_post WHERE userId = (?) AND postId = (?);";
    await pool.query(command, [postId, userId]);
    res.send("Unreact successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};