import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true
    },
    value: {
      type: String,
      enum: ["valid", "invalid"],
      required: true
    }
  },
  { timestamps: true }
);

VoteSchema.index({ user: 1, opportunity: 1 }, { unique: true });

export const Vote = mongoose.model("Vote", VoteSchema);
