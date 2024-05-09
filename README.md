# **Gamester Application**

![Gamester Logo](/ghi/src/images/image.png)

## **Team**

**Person 1 - Brian Weber**

**Person 2 - Chase Robles**

**Person 3 - Elliott Porter**

**Person 4 - Monika Pyarali**

## **Overview**

Welcome to Gamester, the one-stop solution for crafting unforgettable gaming experiences with precision and simplicity. Gamester is a platform designed to meet the needs of both tournament managers and participants alike. With Gamester's adaptive design, competitors and tournament managers experience optimized functionality, ensuring a smooth and enjoyable gaming experience for all.

From setting up tournaments to managing registrations, Gamester provides tournament managers with the tools and support needed to navigate the complexities of event coordination with ease. Whether you're a seasoned gamer or a newcomer to the scene, applying to join tournaments has never been easier. With just a few clicks, users can browse available tournaments, view details, and submit their applications hassle-free. Say goodbye to cumbersome registration processes and hello to the ease and efficiency of Gamester.

Let's embark on this gaming journey together, where every tournament becomes an epic adventure!

## **Concept model diagram for Gamester application**

(Insert image of updated wireframes here)

## **Design Features**

### **Wireframe**

![Wireframe](/ghi/src/images/wireframe.png)

Click here to download the excalidraw.

[Excalidraw](/ghi/src/images/gamester-wireframe.excalidraw)

![Landing Page](/ghi/src/images/Gamester-landing-page.png)

The Gamester application features conditional rendering, tailoring functionality based on user types:

**Competitor**

For competitors, the interface prioritizes ease of use, facilitating effortless browsing of tournaments and streamlined application submission.

**Tournament Manager**

Tournament managers access comprehensive tools for tournament setup and participant management. The interface emphasizes intuitive navigation, providing seamless control over every aspect of event organization.

### **Competitor functionality**

When logged in as a competitor, users have the ability to:

1. View a list of all upcoming tournaments

![upcoming tournaments](/ghi/src/images/Gamester-competitor.png)

2. View the details of each tournament, including the event description, roster size, entry fee, prizes and sponsors

![details of each tournament](/ghi/src/images/Gamester-tournaments.png)

3. Apply to a tournament with the click of a button

![Apply to a tournament with the click of a button](/ghi/src/images/Gamester-details.png)

4. Once an application is submitted, navigate to the My Tournaments page for competitors to view to status of their application

![application status](/ghi/src/images/Gamester-application.png)

5. Navigate to see the details of their profile page through the nav bar link

![profile details page](/ghi/src/images/Gamester-mytournaments.png)

6. Make updates to their profile page, including updating phone number, address information and photo

![edit user profile](/ghi/src/images/Gamester-profile.png)

### **Tournament Manager**

When logged in as a tournament manager, users have the ability to:

1. View a list of all tournaments created by the current user

![list all tournaments](/ghi/src/images/Gamester-manager.png)

2. View a list of pending applications from competitors for the tournaments managed by the current user

![pending applications](/ghi/src/images/Gamester-applications.png)

3. View the details of each tournament, including the event description, roster size, entry fee, prizes and sponsors

4. Within the details view for the tournament, managers are able to delete and edit information about the selected tournament

5. Navigate to see the details of their profile page through the nav bar link

![user profile details page through navbar](/ghi/src/images/Gamester-profile2.png)

6. Make updates to their profile page, including updating phone number, address information and photo

### **Technologies used**

-   Frontend: React.js, HTML, CSS, Bootstrap
-   Backend: FastAPI, Python
-   Database: PostgreSQL
-   Deployment: Docker, Docker Compose
-   Version Control: Git, GitLab

### **Installation**

1. Fork and clone the repository: https://gitlab.com/gamester/module3-project-gamma
2. Run Docker:
    - `docker volume create database-volume`
    - `docker-compose build `
    - `docker compose up`
3. Check that all Docker containers are running

-   To troubleshoot containers, try navigating to the container name and checking the logs. You can also run commands from the exec tab on the container.

4. The application should now be running locally on:
    - http://localhost:5173: Gamester application front-end
    - http://localhost:8000: FastAPI backend

If you encounter any issues with installation, please do let us know!

### **Usage**

-   You may use the application once it is installed. Registering a user is as easy as navigating to the signup page through the “Sign Up” link below “No Account Yet?” on the user homepage. The functionality of this application is dependent on user type, so please be sure to register as a tournament manager or competitor accordingly!

### **Contributing**

-   This is an open-source database that accepts contributions from all developers! Please follow the steps below if you would like to contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit changes: `git commit -m "Your message here"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a new Merge request and our team will review your changes for integration!

## **CRUD (Create, Read, Update, Delete) Routes**

Access the API endpoints via the browser or an API client. The development team used OpenAPI's Swagger UI for endpoint testing. You can access it at the following link:

[Swagger UI](http://localhost:8000/docs#/)

### AUTHENTICATION

#### To access the authentication endpoints for a user, hit the following endpoints:

| Action            | Method | URL                                          |
| ----------------- | ------ | -------------------------------------------- |
| Sign Up User      | POST   | http://localhost:8000/api/auth/signup        |
| Sign In User      | POST   | http://localhost:8000/api/auth/signin        |
| Authenticate User | GET    | http://localhost:8000/api/auth/authenticate  |
| Sign Out User     | DELETE | http://localhost:8000/api/auth/signout       |
| Update User       | PUT    | http://localhost:8000/api/auth/users/user_id |
| Get User Details  | GET    | http://localhost:8000/api/auth/users/user_id |
| Delete User       | DELETE | http://localhost:8000/api/auth/users/user_id |

#### To sign up a user, add the following JSON to the request body:

```
{
  "username": "string",
  "password": "string",
  "user_type": "string",
  "first_name": "string",
  "last_name": "string",
  "photo_url": "string",
  "phone_number": "string",
  "address": "string"
}
```

#### Hitting the endpoint will result in the following response body:

```
{
  "id": 0,
  "username": "string",
  "user_type": "string",
  "first_name": "string",
  "last_name": "string",
  "photo_url": "string",
  "phone_number": "string",
  "address": "string"
}
```

#### Request body to sign in:

```
{
  "username": "string",
  "password": "string"
}
```

#### Response body to sign in:

```
{
  "id": 0,
  "username": "string",
  "user_type": "string"
}
```

#### Request body to authenticate a user:

`fast_api_token`

#### Response body to authenticate a user:

```
{
  "id": 0,
  "username": "string",
  "user_type": "string",
  "first_name": "string",
  "last_name": "string",
  "photo_url": "string",
  "phone_number": "string",
  "address": "string"
}
```

#### Request body to sign out:

```
user_id
```

#### Response body to sign out:

```
"string"
```

#### Request body to update user details:

```
user_id
```

#### Response body to update user details:

```
{
  "username": "string",
  "password": "string",
  "user_type": "string",
  "first_name": "string",
  "last_name": "string",
  "photo_url": "string",
  "phone_number": "string",
  "address": "string"
}
```

#### Request body to get user details:

```
user_id
```

#### Response body to get user details:

```
{
  "id": 0,
  "username": "string",
  "password": "string",
  "user_type": "string",
  "first_name": "string",
  "last_name": "string",
  "photo_url": "string",
  "phone_number": "string",
  "address": "string"
}
```

#### Request body to delete a user:

```
user_id
```

#### Response body to delete a user:

```
"true"
```

### VENUE

#### To create, read, update, and delete venues, hit the following endpoints:

| Action             | Method | URL                                       |
| ------------------ | ------ | ----------------------------------------- |
| Get all venues     | GET    | http://localhost:8000/api/venues          |
| Create a venue     | POST   | http://localhost:8000/api/venues          |
| Get venue details  | GET    | http://localhost:8000/api/venues/item_id  |
| Get venues by user | GET    | http://localhost:8000/api/venues/user_id  |
| Delete a venue     | DELETE | http://localhost:8000/api/venues/venue_id |
| Update a venue     | PUT    | http://localhost:8000/api/venues/venue_id |

#### To get a list of all venues, hitting the endpoint will result in the following JSON response body:

```
[
  {
    "id": 0,
    "user_id": 0,
    "venue_name": "string",
    "state": "string",
    "street_address": "string",
    "city": "string",
    "zip": 0,
    "photo_url": "string",
    "capacity": 0,
    "special_accommodations": "string",
    "venue_cost": 0
  }
]
```

#### Request body to create a venue:

```
{
  "user_id": 0,
  "venue_name": "string",
  "state": "string",
  "street_address": "string",
  "city": "string",
  "zip": 0,
  "photo_url": "string",
  "capacity": 0,
  "special_accommodations": "string",
  "venue_cost": 0
}
```

#### Response body to create a venue:

```
{
  "id": 0,
  "user_id": 0,
  "venue_name": "string",
  "state": "string",
  "street_address": "string",
  "city": "string",
  "zip": 0,
  "photo_url": "string",
  "capacity": 0,
  "special_accommodations": "string",
  "venue_cost": 0
}
```

#### Request body to get venue details:

```
item_id
```

#### Response body to get venue details:

```
{
  "id": 0,
  "user_id": 0,
  "venue_name": "string",
  "state": "string",
  "street_address": "string",
  "city": "string",
  "zip": 0,
  "photo_url": "string",
  "capacity": 0,
  "special_accommodations": "string",
  "venue_cost": 0
}
```

#### Request body to get all venues by user:

```
user_id
```

#### Response body to get all venues by user:

```
[
  {
    "id": 1,
    "user_id": 1,
    "venue_name": "some venue name",
    "state": "NE",
    "street_address": "435 N Hubbard Ave",
    "city": "Minden",
    "zip": 68959,
    "photo_url": "photo.png",
    "capacity": 5,
    "special_accommodations": "none",
    "venue_cost": 500
  }
]
```

#### Request body to delete a venue:

```
venue_id
```

#### Response body to delete a venue:

```
string
```

#### Request body to update a venue:

```
venue_id
```

#### Response body to update a venue:

```
{
  "venue_name": "string",
  "street_address": "string",
  "city": "string",
  "zip": 0,
  "state": "string",
  "photo_url": "string",
  "capacity": 0,
  "special_accommodations": "string",
  "venue_cost": 0
}
```

### TOURNAMENTS

#### To create, read, update, and delete tournaments, hit the following endpoints:

| Action                    | Method | URL                                                 |
| ------------------------- | ------ | --------------------------------------------------- |
| Get all tournaments       | GET    | http://localhost:8000/api/tournaments/              |
| Create a tournament       | POST   | http://localhost:8000/api/tournaments/              |
| Get tournament details    | GET    | http://localhost:8000/api/tournaments/item_id       |
| Get tournaments by user   | GET    | http://localhost:8000/api/tournaments/user/user_id  |
| Delete a tournament       | DELETE | http://localhost:8000/api/tournaments/tournament_id |
| Update tournament details | PUT    | http://localhost:8000/api/tournaments/tournament_id |

#### To get a list of all tournaments, hitting the endpoint will result in the following JSON response body:

```
[
  {
    "id": 0,
    "user_id": 0,
    "location": "string",
    "event_name": "string",
    "roster_size": 0,
    "event_start": "2024-05-08",
    "duration": 0,
    "event_description": "string",
    "picture_url": "string",
    "entry_fee": 0,
    "prize": 0,
    "sponsors": "string"
  }
]
```

#### Request body to create a tournament:

```
{
  "user_id": 0,
  "location": "string",
  "event_name": "string",
  "roster_size": 0,
  "event_start": "2024-05-08",
  "duration": 0,
  "event_description": "string",
  "picture_url": "string",
  "entry_fee": 0,
  "prize": 0,
  "sponsors": "string"
}
```

#### Response body to create a tournament:

```
{
  "id": 0,
  "user_id": 0,
  "location": "string",
  "event_name": "string",
  "roster_size": 0,
  "event_start": "2024-05-08",
  "duration": 0,
  "event_description": "string",
  "picture_url": "string",
  "entry_fee": 0,
  "prize": 0,
  "sponsors": "string"
}
```

#### Request body to get the details of a tournament:

```
item_id
```

#### Response body to get the details of a tournament:

```
{
  "id": 0,
  "user_id": 0,
  "location": "string",
  "event_name": "string",
  "roster_size": 0,
  "event_start": "2024-05-08",
  "duration": 0,
  "event_description": "string",
  "picture_url": "string",
  "entry_fee": 0,
  "prize": 0,
  "sponsors": "string"
}
```

#### Request body to get all tournaments managed by a user:

```
user_id
```

#### Response body to get all tournaments managed by a user:

```
[
  {
    "id": 1,
    "user_id": 1,
    "location": "string",
    "event_name": "string",
    "roster_size": 0,
    "event_start": "2024-05-08",
    "duration": 0,
    "event_description": "string",
    "picture_url": "string",
    "entry_fee": 0,
    "prize": 0,
    "sponsors": "string"
  }
]
```

#### Request body to delete a tournament:

```
tournament_id
```

#### Response body to delete a tournament:

```
"string"
```

#### Request body to update the details of a tournament:

```
{
  "location": "string",
  "event_name": "string",
  "roster_size": 0,
  "event_start": "2024-05-08",
  "duration": 0,
  "event_description": "string",
  "picture_url": "string",
  "entry_fee": 0,
  "prize": 0,
  "sponsors": "string"
}
```

#### Response body to update the details of a tournament:

```
{
  "id": 0,
  "user_id": 0,
  "location": "string",
  "event_name": "string",
  "roster_size": 0,
  "event_start": "2024-05-08",
  "duration": 0,
  "event_description": "string",
  "picture_url": "string",
  "entry_fee": 0,
  "prize": 0,
  "sponsors": "string"
}
```

### APPLICATIONS

#### To create, read, update, and delete applications, hit the following endpoints:

| Action                                | Method | URL                                                     |
| ------------------------------------- | ------ | ------------------------------------------------------- |
| Get all applications                  | GET    | http://localhost:8000/api/applications/                 |
| Create an application                 | POST   | http://localhost:8000/api/applications/                 |
| Get application details               | GET    | http://localhost:8000/api/applications/id               |
| Update an application                 | PUT    | http://localhost:8000/api/applications/id               |
| Delete an application                 | DELETE | http://localhost:8000/api/applications/id               |
| Get all applications by tournament ID | GET    | http://localhost:8000/api/applications/by_tournament/id |
| Get all application by user ID        | GET    | http://localhost:8000/api/applications/by_user/id       |

#### To get a list of all applications, hitting the endpoint will result in the following JSON response body:

```
{
  "applications": []
}
```

#### Request body to create an application:

```
{
  "tournament_id": 0,
  "user_id": 0,
  "status": "string"
}
```

#### Response body to create an application:

```
{
  "id": 0,
  "tournament_id": 0,
  "user_id": 0,
  "status": "string"
}
```

#### Request body to get the details of an application:

```
id
```

#### Response body to get the details of an application:

```
{
  "id": 0,
  "tournament_id": 0,
  "user_id": 0,
  "status": "string"
}
```

#### Request body to update the details of an application:

```
{
  "tournament_id": 0,
  "user_id": 0,
  "status": "string"
}
```

#### Response body to update the details of an application:

```
{
  "id": 0,
  "tournament_id": 0,
  "user_id": 0,
  "status": "string"
}
```

#### Request body to delete an application:

```
id
```

#### Response body to delete an application:

```
"string"
```

#### Request body to get a list of applications for a tournament:

```
tournament_id
```

#### Response body to get a list of applications for a tournament:

```
[
  {
    "id": 0,
    "tournament_id": 0,
    "user_id": 0,
    "status": "string"
  }
]
```

#### Request body to get a list of applications for a user:

```
user_id
```

#### Response body to get a list of applications for a user:

```
[
  {
    "id": 0,
    "tournament_id": 0,
    "user_id": 0,
    "status": "string"
  }
]
```
