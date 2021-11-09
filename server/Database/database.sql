CREATE DATABASE mtblog;
CREATE TABLE IF NOT EXISTS blogs(
    blog_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    body VARCHAR(2000),
    description VARCHAR(250),
    image VARCHAR(1000),
    type VARCHAR(100),
    tags VARCHAR(500),
    created_at TIMESTAMP,
     category_id INT,
    CONSTRAINT fk_category
      FOREIGN KEY(category_id) 
	  REFERENCES catagorys(category_id)
);

CREATE TABLE IF NOT EXISTS categorys(
category_id SERIAL PRIMARY KEY,
category VARCHAR(200)
);