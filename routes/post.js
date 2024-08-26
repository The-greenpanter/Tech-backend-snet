import {Router} from "express";
import {testPost} from "../controllers/posts.js";
const router = Router({});

// Define routes

router.get("/test-post", testPost);

//Export the router

export default router;

//
