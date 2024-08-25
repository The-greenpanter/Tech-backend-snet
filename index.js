import dotenv from "dotenv";
import express from "express";
import connection from "./database/connection.js";

// Load environment variables
dotenv.config();

// Welcome message to verified execution

console.log("API is running");

// DB connection

connection();

//Mongo server creation

const app = express();
const port  = process.env.PORT || 300;

// Cors Config



// Server config

app.listen(port, () => {
    console.log("Server Node running Port:", port);
});

export default app;
