# API Documentation

## Introduction

This is an API document for Frontend understand more about
Endpoint - Request - Response - Error Handling…

<details>
  <summary> Create an account </summary>

<b>- Endpoint:</b> /api/account/register
<br>
<b>- Method:</b> [POST]
<br>
<b>- Request:</b>
<br>
<i>+ Body:</i>
<br>

```python
{
  "email": str,
  "first_name": str,
  "last_name": str,
  "role_id": str, 
  "address": str,
  "phone": str,
  "password": str,
  "confirm_password": str
}

```

<br>
<b>- Response:</b>
<br>
<i>+ Status code: 201</i>
<br>

```python
{
  "massage" : "Account successfully created"
}
```

<i>+ Status code: 400</i>

```python
{
  "detail" : "Email is already in use. Please choose another email address."
}

or 

{
    "detail" : "Password and confirm password do not match."
}
```

</details>

<details>
  <summary> Get accounts </summary>

<b>- Endpoint:</b> /api/account
<br>
<b>- Method:</b> [GET]
<br>
<b>- Request:</b>
<br>
<b>- Response:</b>
<br>
<i>+ Status code: 200</i>
<br>

```python
    "email": EmailStr
    "first_name": str
    "last_name": str
    "role_id": str
    "address": str
    "phone": str
```

<i>+ Status code: 401</i>

```python
{
  "detail" : "Unauthorized user"
}
```

<i>+ Status code: 404</i>

```python
{
  "detail" : "Not Found Campaign"
}
```

</details>

<details>
  <summary> Update accounts </summary>

<b>- Endpoint:</b> /api/account/update
<br>
<b>- Method:</b> [PUT]
<br>
<b>- Request:</b>
<br>
<i>+ Body:</i>
<br>

```python
{
  "email": str,
  "first_name": str,
  "last_name": str,
  "role_id": str, 
  "address": str,
  "phone": str,
  "password": str,
  "confirm_password": str
}

```

<br>
<b>- Response:</b>
<br>
<i>+ Status code: 200</i>
<br>

```python
{
  "massage" : "Account successfully updated"
}
```

<i>+ Status code: 400</i>

```python
{
    "detail" : "Password and confirm password do not match."
}
```
