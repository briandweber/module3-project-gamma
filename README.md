# **Gamester Application**

![alt text](/ghi/src/images/image.png)

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

![alt text](/ghi/src/images/wireframe.png)

![alt text](/ghi/src/images/Gamester-login.png)

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

(Insert updated CRUD routes here)
