import { Router } from "express";
import { addDestination, getDestinationData, getRandom, validateAnswer } from "../controllers/destination.controller.js";


const router = Router();

router.route("/").get(getDestinationData);
router.route("/").post(addDestination);
router.route("/random").get(getRandom);
router.route("/validate").post(validateAnswer);


export default router;