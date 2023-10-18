export const quizActions = {
  next_button: "NEXT_BUTTON",
  pre_button: "PRE_BUTTON",
  visit_question: "VISIT_QUESTION",
  select_option: "SELECT_OPTION",
};
// null means ->
// undefined means ->
export const quizintialState = {
  answers: [],
  visitedQuestions: [],
  selectedOption: null,
  visited: 0,
  currentQuestion: 0,
};
const quizReducer = (state, action) => {
  console.log("quizReducer:action ", action);

  switch (action.type) {
    case quizActions.next_button:
      return {
        ...state,
        answers: action.payload.answers,
        visitedQuestions: action.payload.visitedQuestions,
        currentQuestion: action.payload.currentQuestion,
        selectedOption: action.payload.selectedOption,
        visited: action.payload.visited,
      };
    case quizActions.pre_button:
      return {
        ...state,
        visitedQuestions: action.payload.visitedQuestions,
        currentQuestion: action.payload.currentQuestion,
        selectedOption: action.payload.selectedOption,
      };
    case quizActions.visit_question:
      console.log(quizActions.visit_question);
      return {
        ...state,
        currentQuestion: action.payload.currentQuestion,
        selectedOption: action.payload.selectedOption,
        answers: action.payload.answers,
      };
    case quizActions.select_option:
      return {
        ...state,
        selectedOption: action.payload.selectedOption,
      };
    default:
      return state;
  }
};

export default quizReducer;
