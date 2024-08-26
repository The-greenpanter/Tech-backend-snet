// Test Actions
export const testPost = (req, res) => {
    return res.status(200).json({message: "Message send from user post controller"});
}
