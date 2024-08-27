import { connect }  from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async() => {
    try {
        await connect(process.env.MONGODB_URI);
        console.log("Connected DB");
    } catch (error){
        console.log("Error: Fail to connect DB ", error);
        throw new Error("Fatal. Fail to connect!");
    }
}

export default connection;