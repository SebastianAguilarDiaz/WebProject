import mongoose from "mongoose";

// Types of educational opportunities accepted by the schema.
export const OPPORTUNITY_TYPES = [
  'Scholarships & Financial Aid',
  'Competitions & Contests',
  'Internships & Work Experiences',
  'Research Programs',
  'Conferences & Workshops',
  'Summer Programs & Camps',
  'Exchange & Study Abroad',
  'Courses & Certifications'
];

// Subject areas used by the Explore filter.
export const OPPORTUNITY_AREAS = [
  'Mathematics',
  'Computer Science',
  'Arts & Design',
  'Engineering'
];

// Grade levels used by the Explore filter.
export const OPPORTUNITY_GRADE_LEVELS = [
  'Middle School',
  'High School',
  'Undergraduate',
  "Postgraduate / Master's",
  'Doctorate / PhD',
  'Open to all levels'
];

// Verification status of an opportunity.
export const OPPORTUNITY_STATUSES = ['Pending', 'Verified', 'Rejected'];

// MongoDB schema for an opportunity. Mongoose validates these fields on save.
const OpportunitySchema = new mongoose.Schema(
  {
    // Basic information shown on the cards and the detail page.
    title: { type: String, required: true, unique: true, trim: true, maxlength: 200 },
    type: { type: String, required: true, enum: OPPORTUNITY_TYPES, trim: true },
    area: { type: [String], enum: OPPORTUNITY_AREAS, default: undefined },
    gradeLevels: { type: [String], enum: OPPORTUNITY_GRADE_LEVELS, default: undefined },
    imageUrl: { type: String, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    deadline: { type: Date },
    location: { type: String, trim: true, maxlength: 200 },
    url: { type: String, trim: true, maxlength: 2000 },
    tags: { type: [String], default: undefined },
    // Verification data updated by the voting system.
    status: { type: String, enum: OPPORTUNITY_STATUSES },
    trustScore: { type: Number, min: 0, max: 100 },
    validVotes: { type: Number, min: 0 },
    invalidVotes: { type: Number, min: 0 }
  },
  { timestamps: true }
);

export const Opportunity = mongoose.model('Opportunity', OpportunitySchema);
