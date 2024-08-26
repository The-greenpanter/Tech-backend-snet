// Test Actions
export const testUser = (req, res) => {
    return res.status(200).json({message: "Message send from user controller"});
}

// User Register Method

export const register = (req, res) => {
    return res.status(200).send({message: "User registered"});
}