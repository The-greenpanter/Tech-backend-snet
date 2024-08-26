import {Router} from "express";
import {testUser, register} from "../controllers/user.js";
const router = Router({});

// Define routes

router.get("/test-user", testUser);
router.get("/register-user", register);

//Export the router

export default router;