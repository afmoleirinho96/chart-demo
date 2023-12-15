# Charting Demo
Welcome to Charting Demo, a full-stack website built to display charts, in an interactive way. This project includes an integration with a Third-party API, to fetch the cryptocurrency data that will be displayed in the charts.

## Project Overview
The Charting Demo project is developed using [NestJS](https://nestjs.com/), [Next.js](https://nextjs.org/) with [React](https://react.dev/), It consists of a backend API and a frontend application. 
The backend API is built with NestJS, providing a robust and scalable server-side solution.
API documentation is available through [Swagger](https://swagger.io/), for easy exploration of the endpoints and their functionalities. 
The frontend is developed using React/Next.js, incorporating [Tailwind CSS](https://tailwindcss.com/) and [Google's Material Components](https://mui.com/components/) Design components to create a modern and intuitive user interface.

# Features
The Charting Demo is split between basic charts and cryptocurrency charts.

As for the basic charts, it satisfies the following user stories:
* Line Chart - With 10000 points
* Stock Chart -.
* Sunburst - World population in 2017

As for the Cryptocurrencies chart, it satisfies the following user stories:
* Select a cryptocurrency, out of more than 11000 available tokens.
* Line Chart - Full Price History
* Line Chart - Full Market Cap History 
* Candlestick - In order to analyze open, high, low, close prices for a given period and token.
* Donut Chart Race - Real-time data on the Top 20 exchanges in the last 24 hours by BTC trading volume

## Getting Started
To run the Charting project, follow these steps:
* Clone the repository to your local machine.
* Run backend.
* Run frontend.

### API Integration and env variables needed

For a proper API integration, you will need to create an account in [CoinGecko](https://www.coingecko.com/en/api/documentation) and get an API key.

An example file will help you understand which variables are needed to setup the database succesfully - `.env-example` file

Don't forget to name your .env file as `.env` and place it in the backend folder.


### Backend

* Open a terminal and navigate to the `backend` directory.
```
# Install backend dependencies
$ npm install 

# Run development server
$ npm run start
```
* The backend server will be running on port `3100` by default. If needed, you can modify this configuration in the main.ts file located in the backend folder.


### Frontend

* Open another terminal and navigate to the `frontend` directory.
```
# Install frontend dependencies
$ npm install 

# Run development server
$ npm run dev
```
* Configure the API endpoints in the Frontend's axios.config.ts file. Currently, it's pointing to port `3100`.
* Access the Chart Project in your browser at http://localhost:3000.

### API Documentation
The Chart Demo API is documented using Swagger.
To explore the API and view the available endpoints, you can visit http://localhost:3000/api, or whatever port you chose for the backend, in your browser after starting the backend server. 

Since I have the backend port pre-defined as 3100, you would see Swagger running on http://localhost:3100/api
 - This can be changed  under `main.ts` file located in the backend folder.

