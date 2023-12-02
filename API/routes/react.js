import Express from "express";
import { reactPost, unreactPost } from "../controller/react.js";

const router = Express.Router();

router.post("/reactPost", reactPost);
router.post("/unreactPost", unreactPost);

export default router;