import pool from "../database.js";

export const isFollowed = async (req, res) => {
  const { userId, followingId } = req.query;
  try {
    let command =
      "SELECT * FROM user_follow_user WHERE userSourceId = (?) AND userTargetId = (?);";
    const [users, fields] = await pool.query(command, [userId, followingId]);
    if (users.length > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const followUser = async (req, res) => {
  const { userId, followingId } = req.body;
  try {
    // check if followed
    let command =
      "SELECT * FROM user_follow_user WHERE userSourceId = (?) AND userTargetId = (?);";
    const [users, fields] = await pool.query(command, [userId, followingId]);
    if (users.length > 0) {
      throw new Error("User is already followed");
    }
    command = "INSERT INTO user_follow_user VALUES (?, ?);";
    await pool.query(command, [userId, followingId]);
    res.send("Follow successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const unfollowUser = async (req, res) => {
  const { userId, followingId } = req.body;
  try {
    // check if followed
    let command =
      "SELECT * FROM user_follow_user WHERE userSourceId = (?) AND userTargetId = (?);";
    const [users, fields] = await pool.query(command, [userId, followingId]);
    if (users.length === 0) {
      throw new Error("User is not followed");
    }
    command =
      "DELETE FROM user_follow_user WHERE userSourceId = (?) AND userTargetId = (?);";
    await pool.query(command, [userId, followingId]);
    res.send("Unfollow successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getFollowers = async (req, res) => {
  const { userId } = req.query;
  try {
    let command = "SELECT * FROM user_follow_user WHERE userTargetId = (?);";
    const [users, fields] = await pool.query(command, [userId]);
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getOnlineFollowings = async (req, res) => {
  const { userId } = req.query;
  try {
    // get online followings order by lastLogout
    let command =
      "SELECT * FROM user_follow_user as ufu JOIN users as u ON ufu.userTargetId = u.id WHERE ufu.userSourceId = (?) ORDER BY u.lastLogout DESC, rand() limit 3;";
    const [users, fields] = await pool.query(command, [userId]);
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
