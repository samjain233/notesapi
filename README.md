
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

## Get All Notes API

### Method

- **GET**

### URL

- `https://notesapi-kpj7.onrender.com/api/notes`

### Headers
```bash
	{"Authorization": "Bearer {{token}}"}


### Example

```bash
curl --location 'https://notesapi-kpj7.onrender.com/api/notes' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzOWE0MTgzYjJmOTMxMjRmNmE1OTUiLCJpYXQiOjE3MDQxNzI0NjMsImV4cCI6MTcwNDE3NjA2M30.rI5lIx9ykcacSHMhhxWd_v0e4XP2uRDcNVx1svIrqVA'
```

### Response

```json
{
  "status": true,
  "message": "Fetch notes successful",
  "data": {
    "username": "sambhav",
    "email": "sambhavjain@gmail.com",
    "notes": []
  }
}
```

### Additional Information

- The provided example demonstrates how to make a request to get all notes with a valid token in the `Authorization` header.
- This API will return all the notes associated with the user.

## Get Specific Note API

### Method

- **GET**

### URL

- `https://notesapi-kpj7.onrender.com/api/notes/{{noteId}}`

### Headers
```bash
	{"Authorization": "Bearer {{token}}"}
```
### Response

- Returns the specific note of the user if the note belongs to the user.

### Example

```bash
curl --location 'https://notesapi-kpj7.onrender.com/api/notes/65939df983b2f93124f6a5a8' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzOWE0MTgzYjJmOTMxMjRmNmE1OTUiLCJpYXQiOjE3MDQxNzI0NjMsImV4cCI6MTcwNDE3NjA2M30.rI5lIx9ykcacSHMhhxWd_v0e4XP2uRDcNVx1svIrqVA'
```

### Response

```json
{
  "status": true,
  "message": "Note fetch successful",
  "data": {
    "_id": "65939df983b2f93124f6a5a8",
    "title": "my first title",
    "content": "my first content",
    "createdAt": "2024-01-02T05:24:09.778Z",
    "updatedAt": "2024-01-02T05:24:09.778Z"
  }
}
```

### Additional Information

- Provide the user's token in the `Authorization` header to authenticate the request.
- This API will return the specific note of the user if the note belongs to the user.
```

### Additional Information

- Enter email and password for login.
- Users will receive a token that is valid for 1 hour.
