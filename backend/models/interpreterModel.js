import mongoose from "mongoose";

const interpreterSchema = new mongoose.Schema(
  {
    interpreterTranslatorName: {
      type: String,
      required: true,
    },
    languagesCovered: {
      type: String,
      required: true,
    },
    dialectsCovered: {
      type: String,
      required: true,
    },

    capacityKnown: {
      type: String, // In what capacity do you know this person?
      required: true,
    },

    commentOnAbility: {
      type: String, // Ability to interpret/translate
      required: true,
    },

    durationAssisting: {
      type: String, // How long they've been assisting
      required: true,
    },

    serviceTypesProvided: {
      type: String, // Telephone / Video / Onsite etc.
      required: true,
    },

    assistedLegalMedicalPublic: {
      type: String, // Yes/No/Details
      required: true,
    },

    translationOrTranscriptionWork: {
      type: String, // Details of work carried out
      required: true,
    },

    assistedForCourtPurposes: {
      type: String, // Yes/No/Details
      required: true,
    },

    overallInterpretingHours: {
      type: String,
      required: true,
    },
    otherComments: {
type: String,
    },

    // Reference provider details
    yourName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Interpreter = mongoose.model("Interpreter", interpreterSchema);

export default Interpreter;
