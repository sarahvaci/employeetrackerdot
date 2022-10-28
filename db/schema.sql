
DROP DATABASE IF EXISTS employeedb;

CREATE DATABASE employeedb;

USE employeedb;


CREATE TABLE departments (
  id INT Auto_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  role_id VARCHAR(30),
  salary DECIMAL (10,2) NOT NULL,
  department_id INT,
  Primary KEY(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id VARCHAR (30),
  Primary KEY (id)
);


