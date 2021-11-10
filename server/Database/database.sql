CREATE DATABASE mtblog;



CREATE TABLE  admin(
  admin_id SERIAL PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(16),



);

CREATE TABLE authors(
  author_id SERIAL PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(16),
  image VARCHAR(255)


);

CREATE TABLE tags(
  tags_id SERIAL PRIMARY KEY,
  tags_name VARCHAR(255)
);

CREATE TABLE blogs(
    blog_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(256),
    body text,
    image VARCHAR(1000),
    -- tags_id TEXT REFERENCES tags(tags_id),
    ispublished BOOLEAN,
    author_id INT REFERENCES authors(author_id),
    category_id INT REFERENCES categories(category_id),
    date_created TIMESTAMP
    
    
);

CREATE TABLE  categories(
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(255),
  number_of_blogs INTEGER,

);
