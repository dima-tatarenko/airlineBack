.env file configuration
Create a .env file in airlines-api with the following information. Remember to add your password.

PORT -> This one is for your API server. Using 3100 (Default set as 3000). Can be changed in index.js.
DB_PORT -> Database port
------------------------------------------------
PORT=3100
DB_HOST="127.0.0.1"
DB_USER="root"
DB_PASSWORD=""
DB_PORT="3306"
DB_NAME="airline_test_db"
SECRET_KEY="free bird"
------------------------------------------------



A user can be added by using:

POST
http://localhost:3100/api/users

The JSON (body) provided must follow this structure. Email parameter must be unique!

{
"first_name":"Test2",
"last_name":"Testons",
"passport":"1234",
"email":"test2@gmail.com",
"phone":"555444333",
"password":"1234",
"access_level":"user",
"membership":"wooden",
"bookings":""
}

