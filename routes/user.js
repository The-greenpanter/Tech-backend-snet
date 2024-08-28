import { Router } from "express";
import {
    testUser,
    register,
    login,
    profile,
    listUsers,
    updateUser,
    uploadAvatar,
    avatar
} from "../controllers/user.js";
import { ensureAuth } from "../middlewares/auth.js";
const router = Router({});
import multer from "multer";
import User from "../models/users.js";
import { checkEntityExists } from "../middlewares/checkEntityExists.js";

// Config file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatars");
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-" + Date.now() + "-" + file.originalname);
    },
});

const uploads = multer({ storage });

// Define routes

router.get("/test-user/", ensureAuth, testUser);
router.post("/register-user", register);
router.post("/login-user", login);
router.get("/profile/:id", ensureAuth, profile);
router.get("/userList/:page?", ensureAuth, listUsers);
router.put("/update", ensureAuth, updateUser);
router.post('/upload-avatar', [ensureAuth, checkEntityExists(User, 'user_id'), uploads.single("file0")], uploadAvatar);
router.get('/avatar/:file', avatar)

//Export the router

export default router;
