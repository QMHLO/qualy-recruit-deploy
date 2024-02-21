export default function Validation({ formData }) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (formData.fullName === "") {
    errors.fullName = "Name is Required";
  } else if (formData.fullName.length < 3) {
    errors.fullName = "Please enter at least 3 characters";
  }

  if (formData.emailAddress === "") {
    errors.emailAddress = "Email is Required";
  } else if (!emailRegex.test(formData.emailAddress)) {
    errors.emailAddress = "This email address is incorrect or invalid";
  }

  if (formData.selectedPosition === "") {
    errors.selectedPosition = "Please select a position";
  }

  if (formData.cv === "") {
    errors.cv = "Please upload your cv file";
  }
  return errors;
}
