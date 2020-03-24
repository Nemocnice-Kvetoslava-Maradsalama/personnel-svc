CREATE TABLE nurse(
   nurse_id serial PRIMARY KEY,
   firstname VARCHAR (50) NOT NULL,
   lastname VARCHAR (50) NOT NULL,
   created_on TIMESTAMP NOT NULL
);