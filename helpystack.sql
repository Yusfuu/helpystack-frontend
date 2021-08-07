CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(35) NOT NULL UNIQUE,
  fullName VARCHAR(35) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS posts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  uid INT NOT NULL,
  url VARCHAR(40) NOT NULL UNIQUE,
  background TEXT NOT NULL, 
  code TEXT NOT NULL, 
  color TEXT NOT NULL, 
  description TEXT NOT NULL,
  lang TEXT NOT NULL,
  name TEXT NOT NULL, 
  tags TEXT NOT NULL,
  avatar TEXT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uid) REFERENCES users (id)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS likes (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  uid INT NOT NULL,
  post_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uid) REFERENCES users (id),
  FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS comments (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  uid INT NOT NULL,
  post_id INT NOT NULL,
  body TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uid) REFERENCES users (id),
  FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
) ENGINE=INNODB;



