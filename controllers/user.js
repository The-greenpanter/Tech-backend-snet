// Test Actions
export const testUser = (req, res) => {
    return res.status(200).json({message: "Message send from user controller"});
}
