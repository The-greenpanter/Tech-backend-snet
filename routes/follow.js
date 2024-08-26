import {Router} from "express";
import {testFollow} from "../controllers/follows.js";
const router = Router({});

// Define routes

router.get("/test-follow", testFollow);

//Export the router

export default router;

//
