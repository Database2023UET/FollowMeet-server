DROP TABLE IF EXISTS users, user_follow_user, posts, comments, user_react_comment, user_react_post;

CREATE TABLE users
(
    id             INTEGER UNIQUE      NOT NULL,
    passWordHash   VARCHAR(100)        NOT NULL,
    userName       VARCHAR(100) UNIQUE NOT NULL,
    profilePicture VARCHAR(1000),
    coverPicture   VARCHAR(1000),
    fullName       VARCHAR(100),
    email          VARCHAR(100),
    gender         BOOL,
    bio            VARCHAR(1000),
    lastLogout     TIMESTAMP,
    isOnline       BOOL,
    PRIMARY KEY (id)
);

CREATE TABLE user_follow_user
(
    userSourceId INTEGER NOT NULL,
    userTargetId INTEGER NOT NULL,
    FOREIGN KEY (userSourceId) REFERENCES users (id),
    FOREIGN KEY (userTargetId) REFERENCES users (id)
);

CREATE TABLE posts
(
    id          INTEGER UNIQUE NOT NULL,
    ownerId     INTEGER        NOT NULL,
    contentImg  VARCHAR(1000),
    contentText VARCHAR(1000),
    createdAt   TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (ownerId) REFERENCES users (id)
);

CREATE TABLE comments
(
    id          INTEGER UNIQUE NOT NULL,
    ownerId     INTEGER        NOT NULL,
    postId      INTEGER        NOT NULL,
    contentText VARCHAR(1000)  NOT NULL,
    createAt    TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (postId) REFERENCES posts (id),
    FOREIGN KEY (ownerId) REFERENCES users (id)
);

CREATE TABLE user_react_post
(
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (postId) REFERENCES posts (id)
);

CREATE TABLE user_react_comment
(
    userId    INTEGER NOT NULL,
    commentId INTEGER NOT NULL,
    FOREIGN KEY (commentId) REFERENCES comments (id),
    FOREIGN KEY (userId) REFERENCES users (id)
);