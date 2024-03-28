# Paint Company Stock Status Web Application README

## Introduction
This repository contains the source code for a web application that displays the stock status of a paint company. 
The application utilizes React for the frontend and Node.js with Express for the backend. 
The backend service has been deployed to the Google Cloud Platform (GCP) and is accessible via the following URL: https://bcpublicpaint.uc.r.appspot.com.

## Frontend (React)

- **User Interface**:
     - Simple and intuitive UI, considering John's needs, it should be easy to use on mobile phones.
     - For Jane, also needs to perform well on a tablet or laptop.
     - A "kanban style" interface should be provided to display the inventory status (available, low stock, out of stock) of various paint materials.
     - Paint colors only available in blue, grey, black, white or purple
- **Functional Requirements**:
     - Allows John and Jane to view the status of all paints.
     - Allow Jane to update paint inventory.
     - Allows painters to view paint inventory and update quickly.
     - Should support different user roles and permissions (such as Adam's user management function).

## Backend (Node.js)

- **Data Management**:
     - Design and implement a data model for paint inventory, which requires 5 colors: blue, gray, black, white or purple.
     - Provide API endpoints to support viewing and updating paint inventory quantities and colors.
- **User and Permission Management**:
     - Implement user authentication and authorization mechanisms.
     - Manage user roles and permissions, allowing specific operations (such as inventory updates) to be restricted based on user role.
     - Create the following users John, Jane, Adam, Painters
- **Business logic**:
     - Handle inventory status update logic (such as changing from "Available" to "Low Stock" or "Out of Stock").

## DevOps

Currently deployed to Google Cloud Platform




## Installation

To run the application locally, follow these steps:
1.To run the application locally, follow these steps:
2.Navigate to the project directory.
3.Install dependencies by running the command:

~~~
npm install
~~~


## Running the Application
Once the dependencies are installed, you can start the application by running the command:

~~~
npm start
~~~
This will start both the frontend and backend servers locally, allowing you to access the application via your web browser.



## Deployment
The backend service has been deployed to the Google Cloud Platform. For deployment instructions or to make modifications, refer to the documentation provided by GCP.

## Only need Run Frontend side.

## Features
Stock Status Display: View the current stock status of various paint products.
React Frontend: Utilizes React for a dynamic and responsive user interface.
Node.js Backend: Powered by Node.js with Express for handling API requests and business logic.
Google Cloud Platform Deployment: Backend service is deployed to GCP for scalability and reliability.

## License
This project is licensed under the MIT License. Feel free to use and modify the code according to the terms of the license.

## Acknowledgements
Thanks to the contributors and developers of the libraries and frameworks used in this project.
Special thanks to the Google Cloud Platform for providing hosting and deployment services.
