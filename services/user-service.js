import { User } from "../models/User.js";
import { Vote } from "../models/Vote.js";
import { Opportunity } from "../models/Opportunity.js";

// Returns a map { opportunityId: value } with the user's votes for the given ids.
export const getMyVotes = async (userId, opportunityIds) => {
  if (!userId || !opportunityIds || !opportunityIds.length) return {};

  const votes = await Vote.find({
    user: userId,
    opportunity: { $in: opportunityIds }
  }).lean();

  const map = {};
  for (const vote of votes) {
    map[String(vote.opportunity)] = vote.value;
  }
  return map;
};

// Returns the public data of the user, without the password hash.
export const getUserById = async (userId) => {
  return await User.findById(userId).select("name email votesCast").lean();
};

// Builds the statistics shown on MyProfile and Verify.
export const getUserStats = async (userId) => {
  const [shared, verified, created, user, validVotes, invalidVotes] = await Promise.all([
    Opportunity.countDocuments({ createdBy: userId }),
    Opportunity.countDocuments({ createdBy: userId, status: "Verified" }),
    Opportunity.find({
      createdBy: userId,
      trustScore: { $exists: true, $ne: null }
    }).select("trustScore").lean(),
    User.findById(userId).select("votesCast").lean(),
    Vote.countDocuments({ user: userId, value: "valid" }),
    Vote.countDocuments({ user: userId, value: "invalid" })
  ]);

  // New opportunities without votes do not lower the average.
  const trustScore = created.length
    ? Math.round(
        created.reduce((sum, opportunity) => sum + (opportunity.trustScore || 0), 0) /
          created.length
      )
    : 0;

  const votesCast = user ? user.votesCast || 0 : 0;

  return {
    shared,
    verified,
    trustScore,
    votesCast,
    rank: Math.min(5, 1 + Math.floor(votesCast / 10)),
    validVotes,
    invalidVotes
  };
};
