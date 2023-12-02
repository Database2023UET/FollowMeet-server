import pool from "../database.js";

export const getComments = async (req, res) => {
  const { postId } = req.query;
  try {
    let command = "SELECT * FROM comments WHERE postId = (?);";
    const [comments, fields] = await pool.query(command, [postId]);
    res.send(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addComment = async (req, res) => {
  const { userId, postId, contentText } = req.body;
  try {
    let result = await pool.query(
      "SELECT MIN(id + 1) as missing_id FROM comments WHERE id + 1 NOT IN (SELECT id FROM comments)"
    );
    const newCommentId = result[0][0].missing_id;
    const data = [newCommentId, userId, postId, contentText, new Date()];
    let command = "INSERT INTO comments VALUES (?, ?, ?, ?, ?);";
    await pool.query(command, data);
    res.send("Add comment successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
