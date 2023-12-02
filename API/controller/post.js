import pool from "../database.js";

export const getPostsUserFollowing = async (req, res) => {
  const { userId } = req.query;
  try {
    let command =
      "SELECT * FROM posts INNER JOIN user_follow_user ON posts.ownerId = user_follow_user.userTargetId WHERE user_follow_user.userSourceId = (?);";
    const [posts, fields2] = await pool.query(command, [userId]);
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// export const getPostsOfUser = async (req, res) => {
//     const { userId } = req.body;
//     try {
//         const userId = user[0].id;
//         let command = 'SELECT * FROM posts WHERE ownerId = (?);'
//         const [posts, fields2] = await pool.query(command, [userId]);
//         posts.forEach(async (element) => {
//             command = 'SELECT u.id FROM user_react_post INNER JOIN users AS u on user_react_post.userId = u.id where user_react_post.postId = (?);';
//             const [usersReact, fields3] = await pool.query(command, [element.id]);
//             element.usersReact = usersReact;
//         });
//         res.send(posts);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// }

export const addPost = async (req, res) => {
  const { userId, contentImg, contentText } = req.body;
  try {
    const result = await pool.query(
      "SELECT MIN(id + 1) as missing_id FROM posts WHERE id + 1 NOT IN (SELECT id FROM posts)"
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
