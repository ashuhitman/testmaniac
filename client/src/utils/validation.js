const test_page_validation = (values) => {
  const errors = { options: [], alert: false };
  let isNext = true;
  if (!values.question.trim()) {
    errors.question = "Question is required";
    isNext = false;
  } else if (values.question.trim().length <= 5) {
    errors.question = "Question must be longer than 5 characters";
    isNext = false;
  }
  let count = 0;
  for (let option of values.options) {
    errors.options[count] = "";
    if (!option.text) {
      errors.options[count] = "option is required";
      isNext = false;
    }

    count++;
  }

  if (isCorrectOptionChosen(values.options)) {
    if (isNext) {
      isNext = false;
      errors.alert = true;
    }
  }

  return [isNext, errors];
};

const isCorrectOptionChosen = (data) => {
  var valueArr = data.map(function (item) {
    return item.isAnswer;
  });
  return valueArr.every((val, i, arr) => val === arr[0]);
};

const validation = (values) => {
  const errors = {};
  console.log(values);
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

  if (!values.questions) {
    errors.questions = "Number of questions is required";
    isSubmit = false;
  } else if (values.questions < 10) {
    errors.questions = "Number of questions must be greater than 10";
    isSubmit = false;
  }

  if (values.timer === "0" || !values.timer.trim()) {
    errors.timer = "Select a timer";
    isSubmit = false;
  }
  return [isSubmit, errors];
};
export { validation, test_page_validation };
