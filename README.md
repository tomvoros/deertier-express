# DeerTier Express.js

This repository contains a full rewrite of [the original ASP.NET MVC website](https://github.com/tomvoros/deertier) for [deertier.com](https://deertier.com) now in **Express.js**. This is currently a straightforward 1:1 rewrite with no real improvements.

## Tech

The website is written in **Node.js 22** and **Express.js 5** using **Handlebars** with minimal additional dependencies.

## Database

The database used on deertier.com is **MySQL** but other flavours of SQL would probably work as well.

If you'd like to work with the database please use the scripts in the db folder to set up your own instance and then enter the connection
info in **app/.env**.
