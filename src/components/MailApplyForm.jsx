import React, { useState } from "react";
import { toast } from "react-toastify";
import Validation from "../backend/Validation";

function MailApplyForm({ closeForm }) {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phNumber: "",
    selectedPosition: "",
    shiftSystem: "",
    cv: "",
  });
  const [errors, setErrors] = useState({});
  const jobOptions = ["QA Engineer", "Front-end Engineer", "Japanese Teacher", "School Admin", "Admin"];
  const shiftOptions = ["Monday To Friday", "Tuesday To Saturday", "Other"];

  const sendEmail = async () => {
    let fd = new FormData();
    fd.append("fullName", formData.fullName);
    fd.append("phNumber", formData.phNumber);
    fd.append("emailAddress", formData.emailAddress);
    fd.append("selectedPosition", formData.selectedPosition);
    fd.append("shiftSystem", formData.shiftSystem);
    fd.append("cv", formData.cv);

    try {
      const res = await fetch("https://email-backend-z1wz.onrender.com/send", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      console.log(data);

      if (data.status === 401 || !data) {
        console.log("error");
        toast.error("Message Can't Send");
      } else {
        console.log("Email sent");
        toast.success("Message Sent Successfully");
        setFormData("");
        closeForm();
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Message Can't Send");
    }
  };
  const handleValidation = (e) => {
    e.preventDefault();
    const validationErrors = Validation({ formData });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // If no validation errors, send the email
      sendEmail();
      console.log("Form submitted:", formData);
    } else {
      console.log("Form has validation errors");
      toast.error("Form has validation errors");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const cv = e.target.files[0];
    setFormData({ ...formData, cv });
  };

  return (
    <>
      <div className="form">
        <form>
          <div className="row">
            <label htmlFor="fullName">Your full name *</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
            {errors.fullName && <span className="error-txt">{errors.fullName}</span>}
          </div>
          <div className="row">
            <label htmlFor="emailAddress">Your email address *</label>
            <input type="text" id="emailAddress" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} />
            {errors.emailAddress && <span className="error-txt">{errors.emailAddress}</span>}
          </div>
          <div className="row">
            <label htmlFor="phNumber">Your Phone Number *</label>
            <input type="number" id="phNumber" name="phNumber" value={formData.phNumber} onChange={handleInputChange} />
            {errors.phNumber && <span className="error-txt">{errors.phNumber}</span>}
          </div>
          <div className="row ">
            <label htmlFor="selectedPosition">Which position are you interested in? *</label>
            <select id="selectedPosition" name="selectedPosition" value={formData.selectedPosition} onChange={handleInputChange}>
              <option value="" disabled>
                Select
              </option>
              {jobOptions.map((position, index) => (
                <option key={index} value={position}>
                  {position}
                </option>
              ))}
            </select>
            {errors.selectedPosition && <span className="error-txt">{errors.selectedPosition}</span>}
          </div>
          <div className="row ">
            <label htmlFor="shiftSystem">Select your preferred shift *</label>
            <select id="shiftSystem" name="shiftSystem" value={formData.shiftSystem} onChange={handleInputChange}>
              <option value="" disabled>
                Select
              </option>
              {shiftOptions.map((shift, index) => (
                <option key={index} value={shift}>
                  {shift}
                </option>
              ))}
            </select>
            {errors.shiftSystem && <span className="error-txt">{errors.shiftSystem}</span>}
          </div>
          <div className="row mb50 mb30-sp">
            <label htmlFor="cvv">Upload Your CV File *</label>
            <input type="file" id="cvv" onChange={handleFileChange} />
            {errors.cv && <span className="error-txt">{errors.cv}</span>}
          </div>
          <div className="txt-right">
            <button type="submit" onClick={handleValidation}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MailApplyForm;
