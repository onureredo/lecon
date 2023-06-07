# Social Media Application - Backend Development Overview

This document provides a comprehensive summary of the process, tools, and technologies used in the development of the backend of our social media application.

## Technology Stack

The technology stack for this project is as follows:

- **Node.js**: The runtime environment executing server-side JavaScript code. It allows the creation of scalable network applications.
- **Express.js**: A minimal and flexible Node.js web application framework, Express.js provides a robust set of features for web and mobile applications, such as routing, middleware configuration, and template engines.
- **MongoDB**: A source-available cross-platform document-oriented database program. Classified as a NoSQL database, MongoDB avoids the traditional table-based relational database structure in favor of JSON-like documents with optional schemas.
- **Mongoose**: This Object Data Modeling (ODM) library provides a straightforward, schema-based solution to model application data. It includes built-in type casting, validation, query building, business logic hooks, and more.
- **Joi**: A powerful library for JavaScript data validation. Joi allows the creation of blueprints or schemas for JavaScript objects (an object that stores information) to ensure validation of key information.
- **JSON Web Tokens (JWTs)**: An open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. In our application, we use JWTs for authentication and information exchange.

## Development Stages

### Initialization & Setup

- Started with initializing a new Node.js project using `npm init`.
- Set up the server using Express.js with essential middleware like `express.json()` to parse incoming request bodies.
- Established a connection with a MongoDB database via Mongoose. We've also included error handlers for database connection errors.

### Schemas & Models

- Defined Mongoose schemas and models for two major entities: `User` and `Post`. The User schema includes fields like username, email, password, and an array of posts. The Post schema includes fields like title, content, author, and comments.
- Added data validation rules using Mongoose's built-in validation features.
- Created necessary relationships between these schemas, such as linking posts with users.

### Middleware & Utility Functions

- Developed a middleware for error handling. This middleware function captures errors and sends them in the HTTP response.
- Developed middleware to protect routes. This middleware function verifies a JWT passed in the `Authorization` header of the request and allows the request to proceed if the token is valid.
- Created utility functions such as an async handler to remove some boilerplate code from route handlers and a custom error response to consistently format error messages.

### Authentication & Authorization

- Created a user authentication mechanism using JWTs. This includes routes and controllers for user sign-up and sign-in, along with JWT creation and verification.
- Encrypted passwords using the bcrypt library before storing them in the database.
- Stored JWTs as HTTP-only cookies to improve security. An HTTP-only cookie is only sent in HTTP requests to the server and cannot be accessed through JavaScript. This mitigates the risk of XSS attacks.
- Developed an authorization middleware to restrict certain routes to authenticated users only. This middleware function checks if a valid JWT is present before allowing the request to proceed.

### Route Definitions

- Designed routes for user-related operations: sign-up, sign-in, follow and unfollow users, and retrieve user information.
- Created routes for post-related operations: create, read, update, and delete posts.
- Included middleware functions in appropriate routes to validate JWTs, check user permissions, validate incoming data, and handle errors.

### Controllers

- Created controllers to handle the business logic for each route. This includes processing incoming requests, interacting with the MongoDB database, and preparing the outgoing responses.
- Incorporated error handling for proper feedback during any unsuccessful operations.

### Validation Using Joi

- Employed Joi to define validation schemas for the incoming data in request bodies. This validation helps ensure that data is in the correct format before it's saved in the database.
- Used these schemas in relevant routes to ensure incoming requests are validated. If incoming data fails validation, the request is rejected, and an error is returned.

### Testing

- Executed thorough testing of all endpoints using the Insomnia tool. This includes testing for success cases as well as failure cases, such as invalid data and unauthorized requests.
- Reviewed server logs and database entries to ensure that data is being processed and saved correctly.

### Documentation

- Ensured comprehensive commenting of code for clarity and easy maintainability.
- Maintained an up-to-date and detailed README file to document the project setup and progress.

This document provides a comprehensive overview of the backend development process for our social media application. We ensured the implementation of clean, maintainable code and adhered to best practices for Node.js and Express.js development.
