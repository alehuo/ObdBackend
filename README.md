# ObdBackend

https://obd-react.herokuapp.com/

![](https://david-dm.org/alehuo/ObdBackend.svg)

## Documentation

### Generating an access token
**POST** /api/authentication

**Params:** *username, password*

Example:

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

Example:

`
{
  "username" : "testuser",
  "password" : "test123"
}
`

**Returns:** *HTTP 201* if user is created successfully, *HTTP 400* otherwise.
