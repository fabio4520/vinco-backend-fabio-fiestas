# Backend for Vinco challenge

In order to deploy succesfully this app, you need to follow this steps.

First, you have to have postgresql installed, please follow this documentation.
https://harshityadav95.medium.com/postgresql-in-windows-subsystem-for-linux-wsl-6dc751ac1ff3

Then, you have to create a database following these commands:

```cmd
~ psql
```

```cmd
psql=# create database vinco;
```

Now Please create a table in order to interact with nodejs.

```cmd
psql=# \c vinco
You are now connected to database "vinco" as user "me".
```

```cmd
psql=# CREATE TABLE products(
  ID SERIAL PRIMARY KEY,
  title VARCHAR(100),
  price DECIMAL,
  category VARCHAR(100),
  description TEXT,
  image VARCHAR(200),
	rating DECIMAL
);
```

Now let's configured nodejs connection with sql
Please, set up the configuration for postgresql in `.env.local`, only these variables are neccesaries:
For example:

- PG_USER=me
- PG_HOST=localhost
- PG_PORT=5432

This variables are going to be consumed into queries.js file

After that erase ".local" from file, your final file should look like this: ".env"

Then run:

```cmd
node index.js
```
