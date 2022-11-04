# BOOLEAN BALLOONS (mm-online-shop) Backend

![hero-home](./assets/hero-home.png)

## Description
This is the backend of our online shop. We created an Express API to handle requests from the [frontend client](https://mm-online-shop.netlify.app/), such as creating, reading, updating and deleting information from MongoDB database.

## Instructions
To run this app on your computer, start by forking and cloning this repo and enter the following commands:

```
$ cd online-shop-server
$ npm install
$ npm start
```

Next, create a .env file and add the following environment variables:
```
PORT=5006
ORIGIN=http://localhost:3000
TOKEN_SECRET=y0uRt0k3N$eCr3T
```
To handle image-upload, this project uses Cloudinary. Please set up an account with Cloudinary and add the following details to the .env file:

```
CLOUDINARY_NAME = add-your-cloudinary-name
CLOUDINARY_KEY = add-your-cloudinary-key
CLOUDINARY_SECRET = add-your-cloudinary-secret
```

## Demo
Link to the backend:
https://mm-online-shop.adaptable.app/
