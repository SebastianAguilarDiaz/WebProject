import mongoose from "mongoose";

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

export const OPPORTUNITY_AREAS = [
  'Mathematics',
  'Computer Science',
  'Arts & Design',
  'Engineering'
];

export const OPPORTUNITY_GRADE_LEVELS = [
  'Middle School',
  'High School',
  'Undergraduate',
  "Postgraduate / Master's",
  'Doctorate / PhD',
  'Open to all levels'
];

export const OPPORTUNITY_STATUSES = ['Draft', 'Pending', 'Verified', 'Rejected'];

const OpportunitySchema = new mongoose.Schema(
  {
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
    status: { type: String, enum: OPPORTUNITY_STATUSES },
    trustScore: { type: Number, min: 0, max: 100 },
    validVotes: { type: Number, min: 0 },
    invalidVotes: { type: Number, min: 0 }
  },
  { timestamps: true }
);

export const Opportunity = mongoose.model('Opportunity', OpportunitySchema);