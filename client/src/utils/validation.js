const validation = (values) => {
  const errors = [];
  let isSubmit = true;
  if (!values.test_name.trim()) {
    errors.test_name = "Test name is required";
    isSubmit = false;
  } else if (values.test_name.trim().length <= 5) {
    errors.test_name = "Test name must be longer than 5 characters";
    isSubmit = false;
  }

  if (!values.subject.trim()) {
    errors.subject = "Subject name is required";
    isSubmit = false;
  }

  if (values.questions < 10) {
    errors.questions = "Number of questions must be greater than 10";
    isSubmit = false;
  }
  return [isSubmit, errors];
};
export default validation;
