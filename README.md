# Mtix Leet Lab
### Create Folder
* Frontend Backend
* cd backend
* npm init --y 
## Install Depandancy
* npm i nodemon
* npm i express
* npm i jsonwebtoken
* npm i bcryptjs
* npm i cookie-parser
* npm i prisma
* npm i @prisma/client
* npx prisma init

* docker run --name (Type here name) -e POSTGRES_USER=(Type here user) -e POSTGRES_PASSWORD=(Type here password) -p 5432:5432 -d postgres

### Create user Schema and then save
* npx prisma generate

### Create DB.js database and then run commad
* npx prisma migrate dev
* npx prisma db push
### create Controllers
* Register Controllers

### if you want generate rendion secret key
* openssl rand -hex 32



