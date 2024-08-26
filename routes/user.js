import {Router} from "express";
import {testUser} from "../controllers/user.js";
const router = Router({});

// Define routes

router.get("/test-user", testUser);

//Export the router

export default router;