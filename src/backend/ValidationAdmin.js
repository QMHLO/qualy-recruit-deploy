export default function ValidationAdmin({ title, value, date, description }) {
  const errors = {};
  if (title === "") {
    errors.title = "Title is required";
  }
  if (value === "") {
    errors.value = "Salary is required";
  }
  if (date === "") {
    errors.date = "Deadline is required";
  }
  if (description === "") {
    errors.description = "Description is required";
  }
  return errors;
}
