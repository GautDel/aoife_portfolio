import express from "express";
import { getNavItems } from "../controllers/navItems.js";
const router = express.Router();
router.route('/').get(getNavItems);
export default router;
