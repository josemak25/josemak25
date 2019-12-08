import { Request, Response, Router } from "express";

import userRoutes from "./user.route";

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req: Request, res: Response) =>
  res.send("We're Good")
);

// //mount auth routes
// router.use("/auth", authRoutes);

//mount users routes
router.use("/users", userRoutes);

export default router;
