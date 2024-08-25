import dotenv from "dotenv";
import express, {urlencoded} from "express";
import cors from "cors";
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

// Cors Config for the HTTPs request

app.use(cors());
 // app.use(cors({origin:'*',methods: 'GET', 'PUT', 'HEAD', 'PATCH', 'POST', 'DELETE' }));

//decode data from the HTTPs request received from apache

app.use(urlencoded({extended: true}));

// Route Config

    //Test route

    app.get('/test-route',(req, rest)=>{
        return rest.status(200).json(
            {
                'id':1,
                'name':'Green Pa nter',
                'username':'PanterTest'

            }
        )
    })

// Server node config

app.listen(port, () => {
    console.log("Server Node running Port:", port);
});

export default app;
