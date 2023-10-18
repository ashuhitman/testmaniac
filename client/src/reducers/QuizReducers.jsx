export const quizActions = {
  next_button: "NEXT_BUTTON",
  pre_button: "PRE_BUTTON",
  visit_question: "VISIT_QUESTION",
  select_option: "SELECT_OPTION",
  clear_response: "CLEAR_RESPONSE",
  submit_test: "SUBMIT_TEST",
};
// null means ->
// undefined means ->
export const quizintialState = {
  answers: [],
  selectedOption: null,
  visited: 0,
  currentQuestion: 0,
  analytics: null,
  showSolution: false,
};
const quizReducer = (state, action) => {
  console.log("quizReducer:action ", action);

  switch (action.type) {
    case quizActions.next_button:
      return {
        ...state,
        answers: action.payload.answers,

        currentQuestion: action.payload.currentQuestion,
        selectedOption: action.payload.selectedOption,
        visited: action.payload.visited,
      };
    case quizActions.pre_button:
      return {
        ...state,

        currentQuestion: action.payload.currentQuestion,
        selectedOption: action.payload.selectedOption,
        answers: action.payload.answers,
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
    case quizActions.clear_response:
      return {
        ...state,
        answers: action.payload.answers,
        selectedOption: action.payload.selectedOption,
      };
    case quizActions.submit_test:
      return {
        ...state,
        showSolution: true,
        analytics: action.payload,
      };
    default:
      return state;
  }
};

export default quizReducer;
