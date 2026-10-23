import express from "express";
import { registerUser, loginUser, safeRedirect } from "../../services/auth-service.js";
import { requireLogin } from "../middleware/requireLogin.js";

const router = express.Router();

// Returns to the requested internal page after logging in.
const redirectTarget = (req) => safeRedirect(req.body?.redirect || req.query.redirect, "/myProfile");

router.get("/login", (req, res) => {
  if (req.session.userId) return res.redirect("/myProfile");
  res.render("login", { error: null, redirect: req.query.redirect || "", values: {} });
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    const user = await loginUser(email, password);

    if (!user) {
      return res.render("login", {
        error: "Incorrect email or password.",
        redirect: req.body?.redirect || "",
        values: { email: email || "" }
      });
    }

    req.session.userId = user.id;
    res.redirect(redirectTarget(req));
  } catch (err) {
    next(err);
  }
});

router.get("/register", (req, res) => {
  if (req.session.userId) return res.redirect("/myProfile");
  res.render("register", { error: null, redirect: req.query.redirect || "", values: {} });
});

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body || {};
    const values = { name: name || "", email: email || "" };

    if (password !== confirmPassword) {
      return res.render("register", {
        error: "The passwords do not match.",
        redirect: req.body?.redirect || "",
        values
      });
    }

    const result = await registerUser({ name, email, password });
    if (result.error) {
      return res.render("register", {
        error: result.error,
        redirect: req.body?.redirect || "",
        values
      });
    }

    req.session.userId = result.user.id;
    res.redirect(redirectTarget(req));
  } catch (err) {
    next(err);
  }
});

router.post("/logout", requireLogin, (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

export default router;
