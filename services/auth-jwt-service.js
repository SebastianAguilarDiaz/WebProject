import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const publicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  votesCast: user.votesCast || 0
});

const generateToken = (user) => {
  return jwt.sign(
    { sub: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export const registerJwt = async ({ name, email, password }) => {
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

    const token = generateToken(created);
    return { token, user: publicUser(created) };
  } catch (err) {
    if (err && err.code === 11000) {
      return { error: "That email is already registered." };
    }
    throw err;
  }
};

export const loginJwt = async ({ email, password }) => {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail || !password) return { error: "Incorrect email or password." };

  const user = await User.findOne({ email: cleanEmail });
  if (!user) return { error: "Incorrect email or password." };

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) return { error: "Incorrect email or password." };

  const token = generateToken(user);
  return { token, user: publicUser(user) };
};

export const getMeJwt = async (userId) => {
  const user = await User.findById(userId).select("name email votesCast").lean();
  if (!user) return null;
  return publicUser(user);
};
