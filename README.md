# MERN Stack Project with Next.js and shadcn/UI

This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack application built using Next.js framework for frontend with Chakra UI for styling. The server side is implemented with Express.js in TypeScript. Authentication is handled using JWT (JSON Web Tokens). The project follows clean code principles and clean architecture.

## Project Overview

This project implements a file management system where users can register, login, upload files, view their uploaded files, and download files by entering a unique 6-digit code generated for each uploaded file. Users can also delete files from their profile.

## Technologies Used

- **Frontend**:
  - Next.js
  - shadcn/ui

- **Backend**:
  - Express.js
  - TypeScript
  - MongoDB (with Mongoose)

- **Authentication**:
  - JWT (JSON Web Tokens)

- **Testing**:
  - Jest

- **Containerization**:
  - Docker

- **CI/CD**:
  - GitHub Actions

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/aswanth6000/mobigic-task.git
    ```


## Authentication

Authentication is handled using JWT (JSON Web Tokens). When a user registers or logs in, a JWT token is generated and sent to the client. This token is used for subsequent authenticated requests.


## CI/CD

Continuous Integration (CI) is set up using GitHub Actions. The CI workflow runs tests on each push to the repository and ensures that the code meets quality standards before merging into the main branch.

## Dockerization

The application is containerized using Docker. You can build and run the Docker image using the following commands:

```bash
docker build -t dockerusername/projectname .

```

## Screenshots

![Project Screenshot](https://res.cloudinary.com/dihrwghx2/image/upload/v1708178356/mobigic/r3fyip46113qmyh03may.png)
*User Signup*
![Project Screenshot](https://res.cloudinary.com/dihrwghx2/image/upload/v1708178355/mobigic/yqch56zjz5cytjobzwpa.png)
*User Login*
![Project Screenshot](https://res.cloudinary.com/dihrwghx2/image/upload/v1708178354/mobigic/ydj9dcj1m1sztzxbjnqm.png)
*Home page after file added*
![Project Screenshot](https://res.cloudinary.com/dihrwghx2/image/upload/v1708178354/mobigic/wobnp5la6dr8mxtsuf8n.png)
* Upload file*
![Project Screenshot](https://res.cloudinary.com/dihrwghx2/image/upload/v1708178354/mobigic/o43br65qjq7padtn4gto.png)
*Home page after file added*
![Project Screenshot](https://res.cloudinary.com/dihrwghx2/image/upload/v1708178356/mobigic/j86kgxsfp4vi6tcv3pu4.png)
*Download code error*
