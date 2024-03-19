# ERD: MAZRealty

This document explores the design of MAZRealty, a social experience for sharing useful programming resources.

We'll use a basic client/server architecture, where a single server is deployed on a cloud provider next to a relational database, and serving HTTP traffic from a public endpoint.

## APIs

**users:**

- `POST /api/v1/users/` - Create a new user
- `GET /api/v1/users/` - Get all users
- `GET /api/v1/users/:id` - Get a user
- `PATCH /api/v1/users/:id` - Update a user (only for admin)
- `DELETE /api/v1/users/:id` - Delete a user (only for admin)

**auth:**

- `POST /api/v1/auth/signup` - Sign up and get a token
- `POST /api/v1/auth/login` - Log in and get a token

## Schema

**users:**

| Column               | Type   | Validation/Options                                              |
| -------------------- | ------ | --------------------------------------------------------------- |
| name                 | String | Required, Trimmed, Maximum length: 255 characters               |
| email                | String | Required, Unique, Lowercased, Validated as an email             |
| photo                | String | Default: 'default.jpg'                                          |
| role                 | String | Enum: ['user', 'guide', 'lead-guide', 'admin'], Default: 'user' |
| password             | String | Required, Minimum length: 8 characters, Select: false           |
| passwordConfirm      | String | Required, Validation function checks if it matches password     |
| passwordChangedAt    | Date   |                                                                 |
| passwordResetToken   | String |                                                                 |
| passwordResetExpires | Date   |                                                                 |

**Property**

| Column               | Type   | Validation/Options                                              |
| -------------------- | ------ | --------------------------------------------------------------- |
| name                 | String | Required, Trimmed, Maximum length: 255 characters               |
| description          | String | Required, Maximum length: 1000 characters                       |
| price                | Number | Required                                                        |
| owner                | Embedded Document | Required, ObjectID, Ref: 'User'                      |  
| address              | String | Required, Maximum length: 255 characters                        |
| images               | [String] | Required, Array of strings                                    |
| approved             | Boolean | Default: false                                                 |
| location             | GeoJSON | Required, Object, GeoJSON type: 'Point', Coordinates: [Number] |
