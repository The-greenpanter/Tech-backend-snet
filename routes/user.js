import {Router} from "express";
import {testUser, register, login} from "../controllers/user.js";
const router = Router({});

// Define routes

router.get("/test-user", testUser);
router.post("/register-user", register);
router.post("/login-user", login)

//Export the router

export default router;