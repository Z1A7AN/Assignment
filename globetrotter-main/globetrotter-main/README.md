# Globetrotter Challenge : Headout Assignment

Globetrotter is a full-stack web app where users get cryptic clues about a famous place and must guess which destination it refers to. Once they guess, they’ll unlock fun facts, trivia, and surprises about the destination!

This is a part of headout swe, backend challenge

Live Link : https://globetrotter-guessgame.vercel.app

## Installation

### Prerequisite

1. Node Install in local machine
2. Cloudinary Account
3. MongoDb Url ( Either Local or hosted cluster )

### Steps to run the project locally

1.  Clone the respository

    ```
    git clone https://github.com/Piyushhpatel/globetrotter.git
    ```

2.  Setup the backend

    a. Go to backend directory

        cd globetrotter-backend

    b. Run npm install for all installing packages

        npm install

    c. Create .env in the root and copy the content of .env.sample and replace the placeholders with actual values

    d. Start the server using npm run start

        npm run start

3.  Setup the frontend

    a. Make sure you are on the root directory if not run the command

        cd ..

    b. Go to front end directory

        cd globetrotter-frontend

    c. Run npm install for all installing packages

        npm install

    d. Go to the file "./globetrotter-frontend/src/utils/axios.js" and make sure the baseUrl matches your local server url

    e. Run the commad npm run dev to start the server

        npm run start

## Technologies Used

1. Frontend : React + Vite with Tailwind
2. Backend : NodeJs
3. Database : MongoDb (NoSQL database)
4. Cloudinary : For dynamic image generation for challenge a friend feature

## API Documentation:

Base Url: `http://localhost:3000/api/v1`

### Destination API

| Method | Endpoint                 | Description                                            |
| ------ | ------------------------ | ------------------------------------------------------ |
| POST   | `/destinations`          | Add a new destination.                                 |
| GET    | `/destinations`          | Get all destinations.                                  |
| GET    | `/destinations/random`   | Get a random destination with multiple-choice options. |
| POST   | `/destinations/validate` | Validate the user's answer and return facts/trivia.    |

#### Add a Destination

- **Endpoint:** `POST /destinations`
- **Request Body:**
  ```json
  {
    "city": "Paris",
    "country": "France",
    "clues": ["Eiffel Tower", "Seine River", "Louvre Museum"],
    "fun_fact": ["Paris has over 1,800 bakeries."],
    "trivia": ["The Eiffel Tower can be 15 cm taller in the summer."]
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "data": {
      "city": "Paris",
      "country": "France",
      "clues": ["Eiffel Tower", "Seine River", "Louvre Museum"],
      "fun_fact": ["Paris has over 1,800 bakeries."],
      "trivia": ["The Eiffel Tower can be 15 cm taller in the summer."]
    },
    "message": "Success"
  }
  ```

#### Get a Random Destination

- **Endpoint:** `GET /destinations/random`
- **Response:**
  ```json
  {
    "statusCode": 200,
    "data": {
      "token": "65af89...",
      "options": ["Paris", "London", "New York", "Tokyo"],
      "clues": ["Eiffel Tower", "Seine River"]
    },
    "message": "Success"
  }
  ```

#### Validate an Answer

- **Endpoint:** `POST /destinations/validate`
- **Request Body:**
  ```json
  {
    "token": "65af89...",
    "answer": "Paris"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "data": {
      "city": "Paris",
      "country": "France",
      "correct": true,
      "fact": "Paris has over 1,800 bakeries."
    },
    "message": "Answer sent"
  }
  ```

---

### User API

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/users`           | Add or update a user.   |
| GET    | `/users/:username` | Get a user by username. |

#### Add or Update a User

- **Endpoint:** `POST /users`
- **Request Body:**
  ```json
  {
    "username": "JohnDoe",
    "score": 50
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "data": {
      "username": "JohnDoe",
      "score": 50,
      "imageUrl": "https://res.cloudinary.com/...jpg"
    },
    "message": "Success"
  }
  ```

#### Get a User by Username

- **Endpoint:** `GET /users/:username`
- **Response:**
  ```json
  {
    "statusCode": 200,
    "data": {
      "username": "JohnDoe",
      "score": 50,
      "imageUrl": "https://res.cloudinary.com/...jpg"
    },
    "message": "Success"
  }
  ```

## Author

Piyush Patel ( mail: piyushpatel1746@gmail.com )



Note: To get my dataset of 100+ destinations you can hit the api call on

    Get https://globetrotter.hikariworks.in/api/v1/destinations
