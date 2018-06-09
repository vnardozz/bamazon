DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    ID INT AUTO_INCREMENT, 

product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL(5,3),
stock_quantity INT,
PRIMARY KEY (ID)
);
