<h1 align="center">
<br>
<img src="https://raw.githubusercontent.com/NighTzy-Godz/TrendEase/master/client-side/src/assets/img/github_banner.png">
<br>
  Harmony - Server Side
<br>
</h1>

<h4 align="center">An Online Store (Ecommerce) that is built on top of <a href="https://react.dev" target="_blank">React</a> and <a href="https://nodejs.org/en"> NodeJs </a> with <a href="https://expressjs.com">Express</a> and both are using <a href="https://www.typescriptlang.org">Typescript.</a></h4>

# Quick Introduction

<img src="https://raw.githubusercontent.com/NighTzy-Godz/TrendEase/master/client-side/src/assets/img/trendease_home.png">

This project repository contains the code for the whole web application called **TrendEase**. Built with React, Redux, Node.js, and Express (MERN Stack) powered by TypeScript offers a sleek and responsive online shopping experience and a seamlessly integrated frontend and backend. TrendEase is a sophisticated e-commerce platform that brings together the best of modern web development . It has some common features such as Login, Register, Logout, Viewing Products, Creating Products, Buying Products, Cart, Checkout and many more.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Common Features](#common-features)
- [How to Use](#how-to-use)
- [Environment Variables (Dont Skip!)](#environment-variables)

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

## Common Features

### Authenticated Users

- [x] Viewing Products
- [x]Login
- [x]Register
- [x]Change Password
- [x]View Products You've Made
- [x]View Comments You've Made
- [x]View Products You've Bought
- [x]View Product's Current Status (Preparing, Delivering, Delivered)
- [x]View Customer Orders (If Applicable)
- [x]Check Your Cart Items
- [x]Checkout
- [x]Create a Product
- [x]Editing a Product
- [x]Deleting a Product
- [x]Create a Comment on a Product (Must Buy Product First)
- [x]Logout

### Other Features

- Pagination
- 4 Filters for Products
- Popularity
- Most latest products
- Highest to Lowest Price
- Lowest to Highest Price
- 404 Pages
- Loading Indicators
- Responsive Web Design

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

    ## Project Directory
    cd client-side

    ## Install Dependencies
    npm install
```

```bash
    # For Server Side

    ## Project Directory
    cd server-side

    ## Install Dependencies
    npm install
```

3. After that, create an .env file in the for both directories of the project and fill in the required environment variables based on the [ENV Section](#environment-nariables)

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
