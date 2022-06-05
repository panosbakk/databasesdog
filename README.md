# Databases-NodeJS

## Dependencies
1. [NodeJS](https://nodejs.org/en/)
2. [MySQL for Windows](https://dev.mysql.com/downloads/installer/)

## Required NodeJS Dependencies
1. [express](https://www.npmjs.com/package/express) - minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications
2. [mysql2](https://www.npmjs.com/package/mysql2) - mysql driver
3. [ejs](https://www.npmjs.com/package/ejs) - a templating engine
4. [faker](https://www.npmjs.com/package/faker/v/5.5.3) - to create dummy data
5. [express-session](https://www.npmjs.com/package/express-session) - Create session middleware
6. [connect-flash](https://www.npmjs.com/package/connect-flash) - The flash is a special area of the session used for storing messages

## Optional NodeJS Dependencies
1. [nodemon](https://www.npmjs.com/package/nodemon) - a command-line interface (CLI) utility developed by @rem that wraps your Node app, watches the file system, and automatically restarts the process
2. [chalk](https://www.npmjs.com/package/chalk) - style terminal strings 
3. [custom-env](https://www.npmjs.com/package/custom-env) - configure different environments for your project. For example you can create a file named ```.env.localhost``` and keep the variables when you're in the development phase. Usually used so as to keep credentials safe, so as they don't get uploaded to any hosting platforms that are used for Version Control like GitHub

### custom-env Example
1. Create a file named .env.localhost
2. Import it by using ```require('custom-env').env('localhost');```
3. ```.env.localhost``` content
```
SERVER_PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=dbuser
DB_PASS=dbpass
DB=db-name
```

## NodeJS General Information
1. To initialize a new NodeJS Project, create the project folder, open a terminal and use the command ```npm init```
2. To install a new package use ```npm i [package-name]```. If you want to save the package in DevDependencies use ```npm i [package-name] --save-dev```
3. To uninstall a package use ```npm u [package-name]```
4. To add a new script open ```package.json```, find scripts and below a script can be added. Usually a ```start script``` is added.<br>
   Example: ```"start": "nodemon server.js"```, if ```nodemon``` is used in the project.<br>
   To use the script execute ```npm start```

## Create Dummy Data
1. Using the [faker](https://www.npmjs.com/package/faker/v/5.5.3) package dummy data can be created. It can create all kind of data (More on the documentation of the package)
2. To run the ```creator.js``` script which is located inside ```dummyDataCreator``` folder, run ```npm run create-data```, which is a custom script (custom scripts can be declared in ```package.json``` and can be run with ```npm run <script-name>```)