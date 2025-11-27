import { MdEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import logo from "./assets/logo.png";
import { useState } from "react";
import Loader from "./components/Loader";

import { createInterpreter } from "./services/interpreterService";
import { toast } from "react-toastify";

function App() {
  const [formData, setFormData] = useState({
    // Top Part
    interpreterTranslatorName: "",
    languagesCovered: "",
    dialectsCovered: "",

    // Middle Part
    capacityKnown: "",
    commentonAbility: "",
    durationAssisting: "",
    serviceTypesProvided: "",
    assistedLegalMedicalPublic: "",
    translationOrTranscriptionWork: "",
    assistedForCourtPurposes: "",
    overallInterpretingHours: "",

    // Lower Part
    yourName: "",
    position: "",
    department: "",
    companyName: "",
    emailAddress: "",
    contactNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validateForm(formData) {
    const errors = {};

    // Helper: required string
    const required = (value) => !value || !value.trim();

    // --- TOP PART ---
    if (required(formData?.interpreterTranslatorName)) {
      errors.interpreterTranslatorName =
        "Interpreter / Translator Name is required.";
    }

    if (required(formData?.languagesCovered)) {
      errors.languagesCovered = "Languages Covered is required.";
    }

    if (required(formData?.dialectsCovered)) {
      errors.dialectsCovered = "Dialects Covered is required.";
    }

    // --- MIDDLE PART ---
    if (required(formData?.capacityKnown)) {
      errors.capacityKnown = "This field is required.";
    }

    if (required(formData?.commentOnAbility)) {
      errors.commentOnAbility = "Comment on ability is required.";
    }

    if (required(formData?.durationAssisting)) {
      errors.durationAssisting = "Duration of assistance is required.";
    }

    if (required(formData?.serviceTypesProvided)) {
      errors.serviceTypesProvided = "Service types provided is required.";
    }

    if (required(formData?.assistedLegalMedicalPublic)) {
      errors.assistedLegalMedicalPublic = "This field is required.";
    }

    if (required(formData?.translationOrTranscriptionWork)) {
      errors.translationOrTranscriptionWork = "This field is required.";
    }

    if (required(formData?.assistedForCourtPurposes)) {
      errors.assistedForCourtPurposes = "This field is required.";
    }

    if (required(formData?.overallInterpretingHours)) {
      errors.overallInterpretingHours =
        "Overall interpreting hours is required.";
    }

    // --- LOWER PART ---
    if (required(formData?.yourName)) {
      errors.yourName = "Your name is required.";
    }

    if (required(formData?.position)) {
      errors.position = "Position is required.";
    }

    if (required(formData?.department)) {
      errors.department = "Department is required.";
    }

    if (required(formData?.companyName)) {
      errors.companyName = "Company name is required.";
    }

    if (required(formData?.emailAddress)) {
      errors.emailAddress = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errors.emailAddress = "Enter a valid email address.";
    }

    // UK Mobile number pattern
    // const ukMobileRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;

    if (required(formData?.contactNumber)) {
      errors.contactNumber = "Contact number is required.";
    }
    // } else if (!ukMobileRegex.test(formData?.contactNumber)) {
    //   errors.contactNumber = "Enter a valid UK mobile number.";
    // }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Make Req Here

    setErrors({});
    console.log("Form submitted:", formData);

    // submit logic here...
    try {
      setIsLoading(true);
      await createInterpreter(formData);
      toast.success("Form Submitted Successfully!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.error("Error creating interpreter:", error.message);
    }
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <header>
        <div className="w-full  bg-primary text-white p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between ">
            <div className="flex gap-1 items-center">
              <MdEmail className="text-white" />{" "}
              <span>info@language-interpreters.com</span>
            </div>
            <div className="flex gap-1 items-center">
              <IoIosCall className="text-white" /> <span>0208 123 5556</span>
            </div>
          </div>
        </div>
        <div className="w-full p-4 border-b-2 border-gray-200">
          <img width="200px" src={logo} alt="lil-logo" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto ">
        <h1 className="text-primary font-semibold text-4xl text-center my-7">
          Interpreter Reference Form
        </h1>
        <div className="border-secondary border p-5">
          <form onSubmit={(e) => handleSubmit(e)} className="">
            {/* TOP PART */}
            <div className="space-y-5 border-secondary border-b py-8">
              {/* Interpreter Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="interpreterTranslatorName">
                  Interpreter / Translator Name{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  onChange={handleFormData}
                  value={formData.interpreterTranslatorName}
                  name="interpreterTranslatorName"
                  id="interpreterTranslatorName"
                  className={`p-2 outline-primary border-2 rounded-md 
          ${
            errors.interpreterTranslatorName
              ? "border-red-500"
              : "border-gray-200"
          }`}
                  type="text"
                />

                {errors.interpreterTranslatorName && (
                  <p className="text-red-500 text-sm">
                    {errors.interpreterTranslatorName}
                  </p>
                )}
              </div>

              {/* Languages Covered */}
              <div className="flex flex-col gap-2">
                <label htmlFor="languagesCovered">
                  Languages they cover <span className="text-red-500">*</span>
                </label>

                <input
                  onChange={handleFormData}
                  value={formData.languagesCovered}
                  name="languagesCovered"
                  id="languagesCovered"
                  className={`p-2 outline-primary border-2 rounded-md 
          ${errors.languagesCovered ? "border-red-500" : "border-gray-200"}`}
                  type="text"
                />

                {errors.languagesCovered && (
                  <p className="text-red-500 text-sm">
                    {errors.languagesCovered}
                  </p>
                )}
              </div>

              {/* Dialects Covered */}
              <div className="flex flex-col gap-2">
                <label htmlFor="dialectsCovered">
                  Dialects they cover <span className="text-red-500">*</span>
                </label>

                <input
                  onChange={handleFormData}
                  value={formData.dialectsCovered}
                  name="dialectsCovered"
                  id="dialectsCovered"
                  className={`p-2 outline-primary border-2 rounded-md 
          ${errors.dialectsCovered ? "border-red-500" : "border-gray-200"}`}
                  type="text"
                />

                {errors.dialectsCovered && (
                  <p className="text-red-500 text-sm">
                    {errors.dialectsCovered}
                  </p>
                )}
              </div>
            </div>

            {/* MIDDLE PART */}
            <div className="space-y-5 border-secondary border-b py-8">
              {/* Capacity Known */}
              <div className="flex flex-col gap-2">
                <label htmlFor="capacityKnown">
                  In what capacity do you know this person?{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  onChange={handleFormData}
                  value={formData.capacityKnown}
                  name="capacityKnown"
                  id="capacityKnown"
                  rows={3}
                  className={`p-2 outline-primary border-2 rounded-md 
        ${errors.capacityKnown ? "border-red-500" : "border-gray-200"}`}
                />

                {errors.capacityKnown && (
                  <p className="text-red-500 text-sm">{errors.capacityKnown}</p>
                )}
              </div>

              {/* Comment on Ability */}
              <div className="flex flex-col gap-2">
                <label htmlFor="commentOnAbility">
                  Comment about their ability{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  onChange={handleFormData}
                  value={formData.commentOnAbility}
                  name="commentOnAbility"
                  id="commentOnAbility"
                  rows={3}
                  className={`p-2 outline-primary border-2 rounded-md 
        ${errors.commentOnAbility ? "border-red-500" : "border-gray-200"}`}
                />

                {errors.commentOnAbility && (
                  <p className="text-red-500 text-sm">
                    {errors.commentOnAbility}
                  </p>
                )}
              </div>

              {/* Duration Assisting */}
              <div className="flex flex-col gap-2">
                <label htmlFor="durationAssisting">
                  How long have they been assisting as an interpreter /
                  translator for you? <span className="text-red-500">*</span>
                </label>

                <textarea
                  onChange={handleFormData}
                  value={formData.durationAssisting}
                  name="durationAssisting"
                  id="durationAssisting"
                  rows={3}
                  className={`p-2 outline-primary border-2 rounded-md 
        ${errors.durationAssisting ? "border-red-500" : "border-gray-200"}`}
                />

                {errors.durationAssisting && (
                  <p className="text-red-500 text-sm">
                    {errors.durationAssisting}
                  </p>
                )}
              </div>

              {/* Services Types Provided */}
              <div className="flex flex-col gap-2">
                <label htmlFor="serviceTypesProvided">
                  What services have they provided?
                </label>

                <textarea
                  onChange={handleFormData}
                  value={formData.serviceTypesProvided}
                  name="serviceTypesProvided"
                  id="serviceTypesProvided"
                  rows={3}
                  className={`p-2 outline-primary border-2 rounded-md 
        ${errors.serviceTypesProvided ? "border-red-500" : "border-gray-200"}`}
                />

                {errors.serviceTypesProvided && (
                  <p className="text-red-500 text-sm">
                    {errors.serviceTypesProvided}
                  </p>
                )}
              </div>

              {/* Assisted with Legal/Medical/Public */}
              <div className="flex flex-col gap-2">
                <label htmlFor="assistedLegalMedicalPublic">
                  Legal / Medical / Public interpreting?{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  onChange={handleFormData}
                  value={formData.assistedLegalMedicalPublic}
                  name="assistedLegalMedicalPublic"
                  id="assistedLegalMedicalPublic"
                  rows={3}
                  className={`p-2 outline-primary border-2 rounded-md 
        ${
          errors.assistedLegalMedicalPublic
            ? "border-red-500"
            : "border-gray-200"
        }`}
                />

                {errors.assistedLegalMedicalPublic && (
                  <p className="text-red-500 text-sm">
                    {errors.assistedLegalMedicalPublic}
                  </p>
                )}
              </div>

              {/* Translation/Transcription Work */}
              <div className="flex flex-col gap-2">
                <label htmlFor="translationOrTranscriptionWork">
                  Translation / transcription work?{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  onChange={handleFormData}
                  value={formData.translationOrTranscriptionWork}
                  name="translationOrTranscriptionWork"
                  id="translationOrTranscriptionWork"
                  rows={3}
                  className={`p-2 outline-primary border-2 rounded-md 
        ${
          errors.translationOrTranscriptionWork
            ? "border-red-500"
            : "border-gray-200"
        }`}
                />

                {errors.translationOrTranscriptionWork && (
                  <p className="text-red-500 text-sm">
                    {errors.translationOrTranscriptionWork}
                  </p>
                )}
              </div>

              {/* Court Purposes */}
              <div className="flex flex-col gap-2">
                <label htmlFor="assistedForCourtPurposes">
                  Interpreted for court? <span className="text-red-500">*</span>
                </label>

                <textarea
                  onChange={handleFormData}
                  value={formData.assistedForCourtPurposes}
                  name="assistedForCourtPurposes"
                  id="assistedForCourtPurposes"
                  rows={3}
                  className={`p-2 outline-primary border-2 rounded-md 
        ${
          errors.assistedForCourtPurposes ? "border-red-500" : "border-gray-200"
        }`}
                />

                {errors.assistedForCourtPurposes && (
                  <p className="text-red-500 text-sm">
                    {errors.assistedForCourtPurposes}
                  </p>
                )}
              </div>

              {/* Overall Interpreting Hours */}
              <div className="flex flex-col gap-2">
                <label htmlFor="overallInterpretingHours">
                  Overall interpreting hours{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  onChange={handleFormData}
                  value={formData.overallInterpretingHours}
                  name="overallInterpretingHours"
                  id="overallInterpretingHours"
                  rows={3}
                  className={`p-2 outline-primary border-2 rounded-md 
        ${
          errors.overallInterpretingHours ? "border-red-500" : "border-gray-200"
        }`}
                />

                {errors.overallInterpretingHours && (
                  <p className="text-red-500 text-sm">
                    {errors.overallInterpretingHours}
                  </p>
                )}
              </div>
            </div>

            {/* LOWER PART */}
            <div className="space-y-5 py-8">
              {/* Your Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="yourName">
                  Your Name <span className="text-red-500">*</span>
                </label>

                <input
                  onChange={handleFormData}
                  value={formData.yourName}
                  name="yourName"
                  id="yourName"
                  className={`p-2 outline-primary border-2 rounded-md 
        ${errors.yourName ? "border-red-500" : "border-gray-200"}`}
                  type="text"
                />

                {errors.yourName && (
                  <p className="text-red-500 text-sm">{errors.yourName}</p>
                )}
              </div>

              {/* Position */}
              <div className="flex flex-col gap-2">
                <label htmlFor="position">
                  Position <span className="text-red-500">*</span>
                </label>

                <input
                  onChange={handleFormData}
                  value={formData.position}
                  name="position"
                  id="position"
                  className={`p-2 outline-primary border-2 rounded-md 
        ${errors.position ? "border-red-500" : "border-gray-200"}`}
                  type="text"
                />

                {errors.position && (
                  <p className="text-red-500 text-sm">{errors.position}</p>
                )}
              </div>

              {/* Department */}
              <div className="flex flex-col gap-2">
                <label htmlFor="department">
                  Department <span className="text-red-500">*</span>
                </label>

                <input
                  onChange={handleFormData}
                  value={formData.department}
                  name="department"
                  id="department"
                  className={`p-2 outline-primary border-2 rounded-md 
        ${errors.department ? "border-red-500" : "border-gray-200"}`}
                  type="text"
                />

                {errors.department && (
                  <p className="text-red-500 text-sm">{errors.department}</p>
                )}
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="companyName">
                  Company Name <span className="text-red-500">*</span>
                </label>

                <input
                  onChange={handleFormData}
                  value={formData.companyName}
                  name="companyName"
                  id="companyName"
                  className={`p-2 outline-primary border-2 rounded-md 
        ${errors.companyName ? "border-red-500" : "border-gray-200"}`}
                  type="text"
                />

                {errors.companyName && (
                  <p className="text-red-500 text-sm">{errors.companyName}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="emailAddress">
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  onChange={handleFormData}
                  value={formData.emailAddress}
                  name="emailAddress"
                  id="emailAddress"
                  className={`p-2 outline-primary border-2 rounded-md 
        ${errors.emailAddress ? "border-red-500" : "border-gray-200"}`}
                  type="email"
                />

                {errors.emailAddress && (
                  <p className="text-red-500 text-sm">{errors.emailAddress}</p>
                )}
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contactNumber">
                  Contact Number <span className="text-red-500">*</span>
                </label>

                <input
                  onChange={handleFormData}
                  value={formData.contactNumber}
                  name="contactNumber"
                  id="contactNumber"
                  className={`p-2 outline-primary border-2 rounded-md 
        ${errors.contactNumber ? "border-red-500" : "border-gray-200"}`}
                  type="tel"
                />

                {errors.contactNumber && (
                  <p className="text-red-500 text-sm">{errors.contactNumber}</p>
                )}
              </div>
            </div>

            <button className="w-full bg-primary text-white grid place-content-center p-2 rounded-md cursor-pointer border border-transparent transition-all duration-200 hover:bg-transparent hover:border-primary hover:text-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
