# Backend Installation Guide

## Getting Started

Before you can start the service you need to make sure you have certain thinks installed.

### Node.js

To run the scripts you need to have Node.js and NPM installed. If you don't follow the next steps.

1. Download the Installer from the [https://nodejs.org/en/download](NodeJs official website).
2. Install Node.js and NPM by following the installation wizard. Make sure Node.js is added to the windows enviroment variables.
3. Check if Node.js and NPM are installed. This can be done by typing `node -v` and `npm -v` in the commandline.

### Postgres

In order to use the Databases you need to have Postgres installed. If you don't follow the next steps.

1. Download the Installer from the [https://www.postgresql.org/download/](Postgresql official website).
2. Install Postgresql by following the installation until you have to set a password. Make sure to remember it.
3. Use the psql shell to create two new databases for the postgres user. For this you might need the root credentials that you set during the installation process. The default names can be found in the auth-db.config and content-db.config files in the /config folder in the project root. You can change the postgres user, password or the database names as long as they are also changed in the the config files.

## Available Scripts

After Node.js and Postgres are installed and the two databases are created you can run the following scipts in the project directory:

### `npm start:content`

Runs the content server.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm start:auth`

Runs the authentication server.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

### `npm start`

Runs both the content and the authentication server.