# Marvel Heroes App

This is a Marvel Heroes web application built with Angular CLI 16, Firebase 9, and Firestore. The app allows users to register, browse a list of comics, and create personalized favorite lists.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Build](#build)
- [Firebase Configuration](#firebase-configuration)
- [Deploying to Firebase Hosting](#deploying-to-firebase-hosting)

## Demo

A demo of the app can be found [here](#) (https://app-marvel-heroes.web.app).

## Features

- User registration and login
- Browse Marvel comics
- Personalized favorite lists
- SweetAlert2 for user notifications

## Tech Stack

- **Angular CLI**: 16.2.15
- **Firebase**: 9
  - Firebase Authentication
  - Firestore (NoSQL database)
  - Firebase Hosting
- **Tailwind CSS**: 3.4.10 for responsive styling
- **SweetAlert2**: 11.6.13 for notifications

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 16 or higher is recommended): [Download Node.js](https://nodejs.org/)
- **Angular CLI** (v16 or higher): Install Angular CLI globally
  ```bash
  npm install -g @angular/cli
  npm install -g firebase-tools

## Installation
- **Clone the Repository
    Clone the project to your local machine using the following command:
    git clone https://github.com/your-username/app-marvel-heroes.git
    ```bash
    cd app-marvel-heroes
- **Install Dependencies
    ```bash
    npm install
- **Configure Firebase
    To use Firebase services such as authentication and Firestore, configure Firebase as follows:
       - Create a Firebase project at Firebase Console.
       - Register your web app and copy the Firebase configuration details.
       - Add your Firebase configuration to the environment files:
       - In src/environments/environment.ts (for development):
        ```bash
        export const environment = {
            production: false,
            firebaseConfig: {
                apiKey: 'YOUR_API_KEY',
                authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
                projectId: 'YOUR_PROJECT_ID',
                storageBucket: 'YOUR_PROJECT_ID.appspot.com',
                messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
                appId: 'YOUR_APP_ID',
                measurementId: 'YOUR_MEASUREMENT_ID'
            }
        };
- **Setup Tailwind CSS
    ```bash
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

## Running the App
- **To run the app locally, use the Angular CLI development server:
    ```bash
    npm start

- **Custom Server Port
    - The app is configured to run on port 4500 by default. If you want to change this port, you can modify the start script in package.json.
        ```bash
        "start": "ng serve -o --port 4500"

## Build
- **To build the project for production, run:
    ```bash
    npm run build

## Firebase Configuration
- **Initialize Firebase Hosting
    - To deploy the app to Firebase, you need to configure Firebase Hosting.
        - Run the following command to initialize Firebase in the project:
            ```bash
            firebase init
        - Select Hosting from the list of Firebase services.
        - Choose the Firebase project you created earlier.
        - Set the public directory to dist/[app-marvel-heroes], where [app-marvel-heroes] is the name of your Angular project.
        - Choose No when asked if the app should be configured as a Single Page Application (SPA).

## Deploying to Firebase Hosting
- **After building the project and configuring Firebase Hosting, you can deploy the app to Firebase using the following command:
    ```bash
    firebase deploy
- **Firebase will deploy the contents of the dist/ directory to Firebase Hosting, and the app will be live at the URL provided after deployment.

## License
- **This project is licensed under the MIT License.
    1. **Complete Integration: All installation, configuration, and command steps are integrated within the same README.md file.
    2. **Commands Included: All commands, such as npm install, firebase deploy, etc., are directly included in the file without being separated.
    3. **Full Flow: Follows the flow defined in the table of contents, without leaving any steps out or independent.
