import e from "express";
import pool from "../database.js";

export const getPostsUserFollowing = async (req, res) => {
  const { userId } = req.query;
  try {
    let command =
      "SELECT * FROM posts INNER JOIN user_follow_user ON posts.ownerId = user_follow_user.userTargetId WHERE user_follow_user.deletedAt is null and posts.deletedAt is null and user_follow_user.userSourceId = (?) order by posts.createdAt desc;";
    const [posts, fields2] = await pool.query(command, [userId]);
    if (posts.length === 0) {
      let command =
        "SELECT * FROM posts WHERE ownerId != (?) and deletedAt is null order by createdAt desc;";
      const [posts, fields2] = await pool.query(command, [userId]);
      res.send(posts);
    } else {
      res.send(posts);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getPostsOfUser = async (req, res) => {
  const { userId } = req.query;
  try {
    let command =
      "SELECT * FROM posts WHERE ownerId = (?) and deletedAt is null ORDER BY createdAt DESC;";
    const [posts, fields] = await pool.query(command, [userId]);
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addPost = async (req, res) => {
  const { userId, contentImg, contentText } = req.body;
  try {
    const result = await pool.query(
      "SELECT MIN(id + 1) as missing_id FROM posts WHERE deletedAt is null and id + 1 NOT IN (SELECT id FROM posts)"
    );
    const newPostId = result[0][0].missing_id;
    const data = [newPostId, userId, contentImg, contentText, new Date()];
    const command =
      "INSERT INTO posts (id, ownerId, contentImg, contentText, createdAt) VALUES (?, ?, ?, ?, ?)";
    await pool.query(command, data);
    res.send("Post added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
