import { Router } from "express";
import zoom_router from "./zoom.routes";
const router = Router();

router.use("/zoom", zoom_router);

export default router;
