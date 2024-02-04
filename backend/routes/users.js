import express from 'express';
import { updateUser, deleteUser, getUser, getUsers, getUserRecommendation, addMeal } from '../controllers/user.js';
import { verifyUser} from '../utils/verifyToken.js';


const router = express.Router()

// Update
router.put("/:id", verifyUser, updateUser);

//Delete
router.delete("/:id",verifyUser, deleteUser);

//Get
router.get("/:name", getUser);

router.post("/addMeal", addMeal);

//Get All
router.get("/", getUsers);

export default router;