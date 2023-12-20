# API Documentation

## Introduction

This is an API document for Frontend understand more about
Endpoint - Request - Response - Error Handling…

## Login

### Endpoint

- **/auth/login** -**[POST]**

  - Summary: Login
  - Header (Content-Type): application/json

  - **Request Body:**

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

  - **Responses:**

  ```json
  Message:
  "200" = {
  	"msg": "Login successfully",
      "access_token": access_token
      "token_type": "bearer"
  }
  "404" = {
  	  "detail": {
        "error": "Invalid email or password",
        "msg": "Invalid credentials"
    }
  }
  ```

- **/auth/user** -**[GET]**
- Header (Content-Type): application/json
- Authorization(Bearer):[Token]

  - **Responses:**

  ```json
  Message:
  "200" = {
  	"msg": "User found",
      "data": {
      "email": email
    }
  }
  "401" = {
  	  "detail": "Could not find user info"
  }


  ```
