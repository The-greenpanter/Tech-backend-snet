import User from "../models/users.js"
import bcrypt from "bcrypt";
import {createToken} from "../services/jwt.js"
// Test Actions
export const testUser = (req, res) => {
    return res.status(200).json({message: "Message send from user controller"});
}

// User Register Method

export const register = async (req, res) => {
  try {
    //Get params of request
    let params = req.body;
    // Debug with consol
    // console.log(params);

    // Validate data obtained 
      if (!params.name
        || !params.last_name
        || !params.email
        || !params.password
        || !params.nick_name
      ){
      return res.status(400).json({status: "error", message:"Missing fields"})
      };

    // Object to be store at the DB
      let newUser = new User(params);
      newUser.email = params.email.toLowerCase();
    // Control duplicated users
      const existingUser = await User.findOne({
        $or: [
          {email: newUser.email.toLowerCase()},
          {nick_name: newUser.nick_name.toLowerCase()}
        ]
      });

      //If duplicate

      if (existingUser) {
        return res.status(409).send({
          status: "error",
          message: "User already exist!"
        })
      }


    // Code password
      const key = await bcrypt.genSalt(10); // make a has to make stare the decode
      const hashPassword  = await bcrypt.hash(newUser.password, key) // apply the has to the password
      newUser.password = hashPassword;

    //  Save the user on DB

    await newUser.save();

    return res.status(200).json({status: "success" ,message:"Register successfully made",/*, params,newUser*/});

    // Return register user
  } catch (error) {
    console.error("Fail to register", error);
    return res.status(500).send({
      status: "Error",
      message: "Error issue with the register: ${error.message}",
    });
  }
};

// Login Method using JWT
export const login = async (req, res) => {
  try {
    // get params from body

    // Validate params (email and password)

    // Find email on DB

      // If not found

    //Check password

      // if invalid password

    // Create Autentication Token
    
    // Return Autentication Toke with user profile

    
  } catch {
    //Error handoling

    console.log("Authentication error", error);
    return res.status(500).send({
      status: "Error",
      message: "Authentication error, please enter a valid email or password"
    });
  };

}
