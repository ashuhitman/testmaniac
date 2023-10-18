export const getDefinedElemenentCount = (array) => {
  const count = array.filter(function (value) {
    if (value) {
      return value.selectedOption ? true : false;
    } else {
      return false;
    }
  }).length;
  return count;
};
export const visitedQuestion = (array) => {
  const count = array.filter((val) => val !== undefined).length;
  return count;
};

export const analytics = (answers, test) => {
  // analyse the data
  // get total question length
  const totalQuestions = test.questions.length;
  // get no correct wrong and attempted questions
  let wrong = 0;
  let correct = 0;
  const solutions = [];
  let count = 0;
  for (let answer of answers) {
    if (answer) {
      if (answer.selectedOption && answer.correctAnswer) {
        if (answer.selectedOption === answer.correctAnswer) {
          correct = correct + 1;
          solutions[count] = 1;
        } else {
          wrong = wrong + 1;
          solutions[count] = 0;
        }
      }
    }
    count++;
  }
  const attempted = getDefinedElemenentCount(answers);
  const accuracy = Math.round((correct * 100 * 100) / attempted) / 100;
  return { correct, wrong, attempted, accuracy, totalQuestions, solutions };
};
