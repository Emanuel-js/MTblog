CREATE DATABASE mtblog;



CREATE TABLE  admin(
  admin_id BIGSERIAL PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE authors(
  author_id BIGSERIAL PRIMARY KEY,
  fullName VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(16),
  image VARCHAR(255)
);


CREATE TABLE  categories(
  category_id BIGSERIAL PRIMARY KEY,
  category_name VARCHAR(255),
  number_of_blogs INTEGER
);

CREATE TABLE blogs(
    blog_id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(256),
    body text,
    image VARCHAR(1000),
    -- tags_id TEXT REFERENCES tags(tags_id),
    isPublished BOOLEAN,
    -- author_id INT REFERENCES authors(author_id),
    category_id INT REFERENCES categories(category_id),
    date_created TIMESTAMP,
    isFeatured BOOLEAN
);
CREATE TABLE tags(
  tags_id BIGSERIAL PRIMARY KEY,
  tags_name VARCHAR(255)
);


CREATE TABLE blog_tags(
  blog_id INT ,
  tags_id INT ,
  PRIMARY KEY (blog_id, tags_id),
  FOREIGN KEY(blog_id) REFERENCES blogs(blog_id)  ON DELETE CASCADE ,
  FOREIGN KEY(tags_id) REFERENCES tags(tags_id)  ON DELETE CASCADE 



);

CREATE TABLE blog_author(
  blog_id INT,
  author_id INT, 
  PRIMARY KEY (blog_id, author_id),
   FOREIGN KEY(blog_id) REFERENCES blogs(blog_id)  ON DELETE CASCADE ,
   FOREIGN KEY(author_id) REFERENCES authors(author_id) ON DELETE CASCADE 

 
);
