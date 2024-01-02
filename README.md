
## Sign Up API

### Method

- **POST**

### URL

- `https://notesapi-kpj7.onrender.com/api/auth/signup`

### Request Body

```json
{
    "email": "{{email}}",
    "password": "{{password}}",
    "username": "{{username}}"
}
```

### Example

```bash
curl --location 'https://notesapi-kpj7.onrender.com/api/auth/signup' \
--data-raw '{
    "email":"sambhavjain@gmail.com",
    "password":"123456789a",
    "username":"sambhav"
}'
```

### Response

```json
{
  "status": true,
  "message": "User created successfully :- sambhavjain@gmail.com.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzOWE0MTgzYjJmOTMxMjRmNmE1OTUiLCJpYXQiOjE3MDQxNzIwOTcsImV4cCI6MTcwNDE3NTY5N30.JN2msriZx7Lac8AL0WYJOL_vgmzwr8lFiiSkEw85zF0"
}
```

### Additional Information

- Password must be a minimum of 8 characters long and must contain letters and numbers.
- Username must be at least 6 characters.
- Users will receive a token that is valid for 1 hour.

Certainly! Here is the information for your "Login" API formatted in Markdown:

## Login API

### Method

- **POST**

### URL

- `https://notesapi-kpj7.onrender.com/api/auth/login`

### Request Body

```json
{
    "email": "{{email}}",
    "password": "{{password}}"
}
```

### Example

```bash
curl --location 'https://notesapi-kpj7.onrender.com/api/auth/login' \
--data-raw '{
    "email":"sambhavjain@gmail.com",
    "password":"123456789a"
}'
```

### Response

```json
{
  "status": true,
  "message": "Logged in successfully :- sambhavjain@gmail.com.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzOWE0MTgzYjJmOTMxMjRmNmE1OTUiLCJpYXQiOjE3MDQxNzI0NjMsImV4cCI6MTcwNDE3NjA2M30.rI5lIx9ykcacSHMhhxWd_v0e4XP2uRDcNVx1svIrqVA"
}
```

### Additional Information

- Enter email and password for login.
- Users will receive a token that is valid for 1 hour.
