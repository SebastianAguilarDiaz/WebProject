import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: { type: String, required: true },
    votesCast: { type: Number, min: 0 },
    createdOpportunities: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
