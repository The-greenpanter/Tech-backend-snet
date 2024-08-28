import jwt from 'jwt-simple';
import moment from 'moment';
import { secret } from '../services/jwt.js';

// Authentication fx

export const ensureAuth = (req, res, next) => {
    // compare authentication header
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: "Error",
            message: "Request without authentication header"
        });
    }
    // Clean token and extract the token
    const token = req.headers.authorization.replace(/['" ]+/g,'').replace("Bearer","");
    try{
        // Decode token
        let payload =  jwt.decode(token, secret);
        // Check if the token is not empty
        if (!token) {
            return res.status(400).send({
                status: "Error",
                message: "Token is empty or malformed"
            });
        }
        // Check if the token has expired
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({status:"Error", message: "Token has expire"});
        }
    // Attach user data
    req.user = payload;
    } catch (error) {
        // Differentiating error messages
        let errorMessage = "Invalid token";
        if (error.message.includes("Signature")) {
            errorMessage = "Invalid token signature";
        } else if (error.message.includes("No token supplied")) {
            errorMessage = "Token is missing";
        } else if (error.message.includes("Unexpected token")) {
            errorMessage = "Token is malformed";
        }

        // Catch any errors related to token decoding or verification
        return res.status(400).send({
            status: "Error",
            message: errorMessage,
            error: error.message // Include the error message from jwt-simple
        });
    }
    // execute next action
    next();
};