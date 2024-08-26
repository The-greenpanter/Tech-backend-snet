// Test Actions
export const testUser = (req, res) => {
    return res.status(200).json({message: "Message send from user controller"});
}

// User Register Method

export const register = async (req, res) => {
  try {
    //Get params of request

    // Validate data obtained 
  } catch (error) {
    console.error("Fail to register", error);
    return res.status(500).send({
      status: "Error",
      message: "Error issue with the register",
    });
  }
};
