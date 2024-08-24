import { connect }  from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async() => {
    try {
        await connect(process.env.MONGO_URI);
        console.log("Connected DB");
    } catch (error){
        console.log("Error: Fail to connect DB ", error);
        throw new Error("Fata. Fail to connect!");
    }
}

export default connection;