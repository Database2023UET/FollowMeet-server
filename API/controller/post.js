export const getPosts = async (req, res) => {
    const { username } = req.body;
    try {
        const [user, fields] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length === 0) {
            throw new Error("User is not exist");
        }
        const userID = user[0].id;
        const command = 'SELECT * FROM posts INNER JOIN user_follow_user ON posts.ownerId = user_follow_user.userTargetId WHERE user_follow_user.userSourceId = (?);'
        const [posts, fields2] = await pool.query(command, [userID]);
        posts.forEach(element => {
            
        });
        res.send(posts);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const addPost = async (req, res) => {
    const { username, contentImg, contentText } = req.body;
    try {
        const [user, fields] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length === 0) {
            throw new Error("User is not exist");
        }
        const userID = user[0].id;

        let result = await pool.query("SELECT MIN(id + 1) as missing_id FROM posts WHERE id + 1 NOT IN (SELECT id FROM posts)");
        const newPostId = result[0][0].missing_id;
        const data = [
            newPostId,
            userID,
            contentImg,
            contentText,
            new Date(),
        ];
        const command = 'INSERT INTO posts (id, ownerId, contentImg, contentText, createdAt) VALUES (?, ?, ?, ?, ?)';
        await pool.query(command, data);
        res.send("Post added successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

