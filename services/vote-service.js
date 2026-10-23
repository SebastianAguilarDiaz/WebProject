import { Opportunity } from "../models/Opportunity.js";
import { Vote } from "../models/Vote.js";
import { User } from "../models/User.js";

const VALID_VALUES = ["valid", "invalid"];

// Deletes the opportunity and everything that points to it.
const deleteOpportunityCascade = async (opportunity) => {
  const votes = await Vote.find({ opportunity: opportunity._id }).lean();

  // Each existing vote had added one to the voter's counter.
  for (const vote of votes) {
    await User.updateOne({ _id: vote.user }, { $inc: { votesCast: -1 } });
  }

  await Vote.deleteMany({ opportunity: opportunity._id });

  if (opportunity.createdBy) {
    await User.updateOne(
      { _id: opportunity.createdBy },
      { $pull: { createdOpportunities: opportunity._id } }
    );
  }

  await Opportunity.findByIdAndDelete(opportunity._id);
};

// Creates, keeps or changes the user's vote and applies the 100-vote rule.
export const castVote = async (userId, opportunityId, value) => {
  if (!VALID_VALUES.includes(value)) return { outcome: "invalid_value" };

  const opportunity = await Opportunity.findById(opportunityId)
    .catch((dbError) => console.error(dbError.message));
  if (!opportunity) return { outcome: "not_found" };

  const statusBefore = opportunity.status;

  const existingVote = await Vote.findOne({ user: userId, opportunity: opportunityId })
    .catch((dbError) => console.error(dbError.message));

  opportunity.validVotes = opportunity.validVotes || 0;
  opportunity.invalidVotes = opportunity.invalidVotes || 0;

  if (!existingVote) {
    // First vote: create the document and count it.
    await Vote.create({ user: userId, opportunity: opportunityId, value });
    if (value === "valid") opportunity.validVotes += 1;
    else opportunity.invalidVotes += 1;
    await User.updateOne({ _id: userId }, { $inc: { votesCast: 1 } });
  } else if (existingVote.value !== value) {
    // Changing the vote moves one count from one side to the other.
    existingVote.value = value;
    await existingVote.save();
    if (value === "valid") {
      opportunity.validVotes += 1;
      opportunity.invalidVotes = Math.max(0, opportunity.invalidVotes - 1);
    } else {
      opportunity.invalidVotes += 1;
      opportunity.validVotes = Math.max(0, opportunity.validVotes - 1);
    }
  }

  const total = opportunity.validVotes + opportunity.invalidVotes;
  opportunity.trustScore = total
    ? Math.round((opportunity.validVotes / total) * 100)
    : 0;

  if (total >= 100) {
    if (opportunity.trustScore < 70) {
      await deleteOpportunityCascade(opportunity);
      return { outcome: "deleted", statusBefore };
    }
    opportunity.status = "Verified";
  }

  await opportunity.save();
  return { outcome: "saved", statusBefore };
};
