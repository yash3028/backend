🔧 Installation
1. Clone the repo
git clone https://github.com/yash2830/backend.git
cd backend

2. Install dependencies
npm install

3.setup PostgreSql(You can download it or you can use via docker i have installed using doker)
Docker commnads to install postgres
first pull docker image and then setup password and port 
1.docker pull postgres
2.docker run --name my-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=testDb -p 5432:5432 -d postgres
(this command sets up container name, username and password)
3.docker exec -it my-postgre psql -U postgres -d testDb(this command lets us use postgres command in our command prompt)
4.create a databse 
Connect pgAdmin to PostgreSQL
1.open pgadmin in browser and download from there 
2.connect pdagmin to our postgres server using the create username and password
(here username-postgres,password-mysecretpassword and port-5432) 

4.Environment Variables (.env)
create a file where all password and important data is written we can use this in another files.
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=mysecretpassword
DB_NAME=testdb
JWT_SECRET=yashwanth

5.Run Database Migrations
first run npm install typeorm reflect-metadata
add:
npm install -D ts-node typescript @types/node
npm install pg
run npm run migration:generate to generate migration file 
npm run migration:run(this command creates all tables in the database it creates a file Init in migrations folder with timestamp where all the query are created)

6.start the server 
npm run dev

7.API Documentaion 
After running server a url will be generated in the terminal
--- install dependency 
npm install --save-dev swagger-autogen
before running backend run:
npm run generateDoc which generates swagger-output.json 



