# ObdBackend

https://obd-react.herokuapp.com/

[![Build Status](https://travis-ci.com/alehuo/ObdBackend.svg?token=gaC7xtybK3sQe2uWiGwx&branch=master)](https://travis-ci.com/alehuo/ObdBackend)
![](https://david-dm.org/alehuo/ObdBackend.svg)

## License

To do

## API routes

### Generating an access token
**POST** /api/authentication

**Params:** *username, password*

Example body:

`
{
  "username" : "testuser",
  "password" : "test123"
}
`

**Returns:** *HTTP 200* if authentication is successful, *HTTP 400* otherwise. Response body includes a generated token that must be used if a request is made to a protected API route.

### Registering a new user
**POST** /api/users

**Params:** *username, password*

Example request body:

`
{
  "username" : "testuser",
  "password" : "test123"
}
`
**Requires:** Data as request body, token as query param or x-access-token header value

**Returns:** *HTTP 201* if user is created successfully, *HTTP 400* otherwise.

### Returning all users
**GET** /api/users

**Requires:** Token as query param or x-access-token header value

**Returns:** List of all users

### Returning a single user
**GET** /api/users/USER_ID

**Params:** *USER_ID* = User ID

**Requires:** *User ID* as URL param, token as query param or x-access-token header value

**Returns:** Single user

### Returning current user
**GET** /api/currentuser

**Requires:** Token as query param or x-access-token header value

**Returns:** Current user that the token currently has stored

### Returning a single car
**GET** /api/car/VIN

**Params:** *VIN* = Car VIN

**Requires:** *Car VIN* as URL param, token as query param or x-access-token header value

**Returns:** Single car

### Returning car's location points
**GET** /api/location/CAR_ID

**Params:** *CAR_ID* = Car ID

**Requires:** *Car ID* as URL param, token as query param or x-access-token header value

**Returns:** All car's logged location points

### Returning car's sensor data
**GET** /api/sensordata/CAR_ID

**Params:** *CAR_ID* = Car ID

**Requires:** *Car ID* as URL param, token as query param or x-access-token header value

**Returns:** All car's sensor data

### Adding sensor data to a car
**POST** /api/sensordata

**Params:** Car ID, Sensor name, Sensor reading, Timestamp

Example request body:

`
{
  "CarId" : 1,
  "Sensor" : "RPM",
  "Value" : "9001",
  "Timestamp" : "2017-05-14 15:36:00"
}
`

*Note: Timestamp in form YYYY-MM-DD HH:MM:SS*

**Requires:** Data as request body, token as query param or x-access-token header value

**Returns:** *HTTP 201* if data is added successfully, *HTTP 400* otherwise.
