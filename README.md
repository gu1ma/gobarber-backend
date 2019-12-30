# Go Barber Backend!
This is a web service developed for:
- [__gobarber web application__](https://github.com/gu1ma/gobarber-web)
- __gobarber mobile application__ (will be developed soon :D)

### Getting started
These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites
First, you will need that docker images: <br/>
- Postgres: `docker run --name database -e POSTGRES_PASSWORD={YOU_PASSWORD} -p 5432:5432 -d postgres:11`
- Mongodb: `docker run --name mongobarber -p 27017:27017 -d -t mongo`
- Redis: `docker run --name redisbarber -p 6379:6379 -d -t redis:alpine`
- Start the containers: `docker start mongobarber redisbarber database` <br/>

### Installing
Now, just clone this repository and run: 
1. `yarn` for install dependencies
2. `yarn dev` and `yarn queue` for start server

### Built With
- Node 
- Express
- Sequelize
- Yarn 
- Docker
- Sentry
- Postgresql
- Mongodb
- Redis

### Authors
- Gabriel Guimarães Silva

### License
This project is licensed under the MIT License

### Acknowledgments
- Rocketseat Informação e Tecnologia LTDA
