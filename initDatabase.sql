CREATE TABLE IF NOT EXISTS users (
	id INTEGER UNIQUE NOT NULL,
    passWordHash INTEGER NOT NULL,
    userName VARCHAR(100) NOT NULL,
    profilePicture VARCHAR(1000),
    fullName VARCHAR(100),
    email VARCHAR(100),
    gender BOOL,
    lastLogin TIMESTAMP,
    createdAt TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS follow (
	userSourceId INTEGER NOT NULL,
    userTargetId INTEGER NOT NULL,
    createdAt TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS user_friend (
	userSourceId INTEGER NOT NULL,
    userTargetId INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS user_react_post (
	postId INTEGER NOT NULL,
    userId INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
	id INTEGER UNIQUE NOT NULL,
    ownerId INTEGER NOT NULL,
    contentImg VARCHAR (1000),
    contentText VARCHAR(1000),
    createdAt TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS comments (
	id INTEGER UNIQUE NOT NULL,
    ownerId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    contentText VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_react_comment (
	userId INTEGER NOT NULL,
    commentId INTEGER NOT NULL
);

ALTER TABLE user_friend
ADD FOREIGN KEY (userTargetId) REFERENCES users(id);

ALTER TABLE user_friend
ADD FOREIGN KEY (userSourceId) REFERENCES users(id);

ALTER TABLE user_react_post
ADD FOREIGN KEY (userId) REFERENCES users(id);

ALTER TABLE user_react_post
ADD FOREIGN KEY (postId) REFERENCES posts(id);

ALTER TABLE follow
ADD FOREIGN KEY (userSourceId) REFERENCES users(id);

ALTER TABLE follow
ADD FOREIGN KEY (userTargetId) REFERENCES users(id);

ALTER TABLE comments
ADD FOREIGN KEY (id) REFERENCES posts(id);

ALTER TABLE user_react_comment
ADD FOREIGN KEY (commentId) REFERENCES comments(id);

ALTER TABLE user_react_comment
ADD FOREIGN KEY (userId) REFERENCES users(id);

ALTER TABLE posts
ADD FOREIGN KEY (ownerId) REFERENCES users(id);