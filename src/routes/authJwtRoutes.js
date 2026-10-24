import express from "express";
import { registerJwt, loginJwt, getMeJwt } from "../../services/auth-jwt-service.js";
import { requireAuthJwt } from "../middleware/requireAuthJwt.js";

const router = express.Router();

// Register with JWT
router.post("/register", async (req, res, next) => {
  try {
    const result = await registerJwt(req.body || {});
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json({ token: result.token, user: result.user });
  } catch (err) {
    next(err);
  }
});

// Login with JWT
router.post("/login", async (req, res, next) => {
  try {
    const result = await loginJwt(req.body || {});
    if (result.error) {
      return res.status(401).json({ error: result.error });
    }
    return res.status(200).json({ token: result.token, user: result.user });
  } catch (err) {
    next(err);
  }
});

// Get current user with JWT
router.get("/me", requireAuthJwt, async (req, res, next) => {
  try {
    const user = await getMeJwt(req.user.id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

export default router;
