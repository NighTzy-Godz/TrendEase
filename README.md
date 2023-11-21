<h1 align="center">
<br>
<img src="https://raw.githubusercontent.com/NighTzy-Godz/TrendEase/master/client-side/src/assets/img/github_banner.png">
<br>
  Harmony - Server Side
<br>
</h1>

<h4 align="center">An Online Store (Ecommerce) that is built on top of <a href="https://react.dev" target="_blank">React</a> and <a href="https://nodejs.org/en"> NodeJs </a> with <a href="https://expressjs.com">Express</a> with the power of <a href="https://www.typescriptlang.org">Typescript.</a></h4>

# Quick Introduction

<img src="https://raw.githubusercontent.com/NighTzy-Godz/TrendEase/master/client-side/src/assets/img/trendease_home.png">

This project repository contains the code for the whole web application called **TrendEase**. Built with React, Redux, Node.js, and Express (MERN Stack) powered by TypeScript offers a sleek and responsive online shopping experience and a seamlessly integrated frontend and backend. TrendEase is a sophisticated e-commerce platform that brings together the best of modern web development . It has some common features such as Login, Register, Logout, Viewing Products, Creating Products, Buying Products, Cart, Checkout and many more.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Cloudinary Instructions](#cloudinary-instructions)
- [Common Features](#common-features)
- [How to Use](#how-to-use)
- [Environment Variables (Dont Skip!)](#environment-variables)
- [Contact](#contact)

## Technologies Used

### Client Side

- React
- Redux
- Axios
- React-Toastify
- React-Slick
- Typescript

### Server Side

- NodeJs
- Express
- Mongoose
- MongoDB
- Multer
- Bcrypt
- JsonWebToken
- Cloudinary
- Joi
- Typescript

## Cloudinary Instructions

Cloudinary is one of the technologies used in this web application for processing images, and to work it on your machine, you need to follow these steps first:

1. Go to the [Cloudinary Website](https://cloudinary.com) and sign up for a free account.
2. Once you've signed up, you'll be redirected to your Cloudinary dashboard. From there, click on the **Account Details** tab.
3. Under **Account Details**, you'll find your **Cloudinary Cloud name**, **API Key**, and **API Secret**. Copy these values and keep them safe as you will need those values for your [environment variables](#environment-variables)

## Common Features

### Authenticated Users

- [x] Viewing Products
- [x] Login
- [x] Register
- [x] Change Password
- [x] View Products You've Made
- [x] View Comments You've Made
- [x] View Products You've Bought
- [x] View Product's Current Status (Preparing, Delivering, Delivered)
- [x] View Customer Orders (If Applicable)
- [x] Check Your Cart Items
- [x] Checkout
- [x] Create a Product
- [x] Editing a Product
- [x] Deleting a Product
- [x] Create a Comment on a Product (Must Buy Product First)
- [x] Logout

### Other Features

- [x] Pagination
- [x] 4 Filters for Products
- [x] Popularity
- [x] Most latest products
- [x] Highest to Lowest Price
- [x] Lowest to Highest Price
- [x] 404 Pages
- [x] Loading Indicators
- [x] Responsive Web Design

## How to Use

To clone and use this client-side project, you'll need to download these items:

- Git
- Node.Js

After that, you can now follow these steps:

1. Clone the repository

```bash
  git clone https://github.com/NighTzy-Godz/TrendEase.git

```

2. Go to the project directory and install dependencies for both the client and server

```bash
    # For Client Side
    cd client-side

    ## Install Dependencies
    npm install
```

```bash
    # For Server Side
    cd server-side

    ## Install Dependencies
    npm install
```

3. After that, create an .env file in the for both directories of the project and fill in the required environment variables based on the [ENV Section](#environment-variables)

   > **NOTE**
   > Make sure that you're using two VSCodes (One for Client Side and One for Server Side) or else this will not work.

4. Run these commands on your terminal of VSCode

```bash
  # For Client Side
  npm run dev
```

```bash

  # For Server Side
  ts-node index.js
```

5. Enjoy and play around with the application :>

## Environment Variables

Setup you Environment Variables for Safety. These Variables are required in order to run the whole web application.

### For Front-End, these are the required variables

\*`VITE_BASE_URL` - This is the URL that the Redux will use in order to connect to the backend

> **NOTE**
> The Default is `http://localhost:8080/api`

### For Back-End, these are the required variables

- `DB_URL` - The URL of the MongoDB database to connect to (e.g. mongodb://localhost:27017/trendease).
- `jwtSecretPass` - The secret key to use for JWT token generation and validation.
- `CLOUDINARY_NAME` - The cloudinary name that is provided in cloudinary main website.
- `CLOUDINARY_KEY` - The cloudinary name that is provided in cloudinary main website.
- `CLOUDINARY_SECRET` - The cloudinary secret password that is provided in cloudinary main website.
  > **Note**
  > Please refer on [Cloudinary Section](#cloudinary-instructions) on how to get the variables that starts with **CLOUDINARY**. Also you need those 3 cloudinary variables in order to work the images that you will upload on the server.

## Contact

If you have any questions or suggestions, please contact me at `ajhubero16@gmail.com`. I'll be happy to hear suggestions from you!
