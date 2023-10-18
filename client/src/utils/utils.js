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
