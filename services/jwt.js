import jwt from "jwt-simple";
import moment from "moment";

// Secret Class
const secret = 'SECRET_KEY_pRoJeCt_SoCial_NetWork_';

// Generating a Token
const createToken = (user)=> {
    const payload = {
        userId: user._id,
        role: user._role,
        //Fecha de emision
        iat:moment().unix(),
        exp: moment().add(30,'days').unix()
    };
    // Return jwwt_token coded
    return jwt.encode(payload, secret);
};
export {secret, createToken}