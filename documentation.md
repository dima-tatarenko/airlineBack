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


------------------------------------------------
USER INTERACTIONS


A user can be retrieved by ID with:

GET http://localhost:3100/api/users/1

A user can be added by using:


POST http://localhost:3100/api/users

The JSON (body) provided must follow this structure. Email parameter must be unique!

{
"first_name":"Test2",
"last_name":"Testons",
"passport":"1234",
"email":"test5@gmail.com",
"phone":"555444333",
"password":"1234",
"access_level":"user",
"membership":"wooden",
"bookings":""
}

------------------------------------------------

FLIGHT INTERACTIONS

ROUTE LIST

// Get
GET ALL - GET http://localhost:3100/api/flights/flightID
GET BY ID - GET http://localhost:3100/api/flights

// Post
ADD A FLIGHT - POST http://localhost:3100/api/flights
SEARCH BY ORIGIN|DESTINATION|DATES - POST http://localhost:3100/api/flights/search

REQUEST.REST Examples
### Get by ID
GET http://localhost:3100/api/flights/2

### Get all
GET http://localhost:3100/api/flights

### Full search / Tested with Thunder client!
POST http://localhost:3100/api/flights/search

{
"origin_id": 1,
"destination_id": 3,
"departure": "2023-01-15"
}

### Create a new flight
POST http://localhost:3100/api/flights
Content-Type: application/json

{
"origin_id": 1,
"destination_id": 3,
"departure": "2023-01-15",
"arrival": "2023-01-15",
"duration": 2,
"price": 200,
"available_seats": 50,
"available_luggage": 300,
"terminal": 2,
"gate": 3,
"img": "https://cdn.insuremytrip.com/resources/29337/spain_travel_insurance_seville.jpg"
}


AIRPORT INTERACTIONS

ROUTE LIST

// Get
GET ALL - GET http://localhost:3100/api/airports
GET BY ID - GET http://localhost:3100/api/airports/airportID

// Post
ADD AN AIRPORT - POST http://localhost:3100/api/airports

### Get all
GET http://localhost:3100/api/airports

### Get By ID
GET http://localhost:3100/api/airports/2

###
POST http://localhost:3100/api/airports
Content-Type: application/json

{
"name": "John F. Kennedy International Airport",
"name_acr": "JFK",
"city": "New York City",
"city_acr": "NYC",
"country": "United States",
"country_acr": "US",
"terminals": "6",
"gates": "128",
"img": "https://nyartlife.com/wp-content/uploads/2022/06/jfk-jpg.jpg"
}