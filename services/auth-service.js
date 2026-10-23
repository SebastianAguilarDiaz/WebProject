import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const publicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email
});

// Only allows internal paths, so the redirect cannot point to another site.
export const safeRedirect = (target, fallback = "/myProfile") => {
  if (!target || !target.startsWith("/") || target.startsWith("//")) {
    return fallback;
  }
  return target;
};

// Validates the data, hashes the password and creates the account.
// Returns { user } on success or { error } with a readable message.
export const registerUser = async ({ name, email, password }) => {
  const cleanName = String(name || "").trim();
  const cleanEmail = normalizeEmail(email);

  if (!cleanName) return { error: "Please enter your name." };
  if (!cleanEmail) return { error: "Please enter your email." };
  if (!password || password.length < 6) {
    return { error: "The password must have at least 6 characters." };
  }

  const existing = await User.findOne({ email: cleanEmail });
  if (existing) return { error: "That email is already registered." };

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const created = await User.create({
      name: cleanName,
      email: cleanEmail,
      passwordHash,
      votesCast: 0
    });
    return { user: publicUser(created) };
  } catch (err) {
    if (err && err.code === 11000) {
      return { error: "That email is already registered." };
    }
    throw err;
  }
};

// Returns the public data of the user when the credentials are valid.
export const loginUser = async (email, password) => {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail || !password) return null;

  const user = await User.findOne({ email: cleanEmail });
  if (!user) return null;

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) return null;

  return publicUser(user);
};
