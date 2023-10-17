import React, { useReducer } from "react";
const quizActions = {
  next_button: "NEXT_BUTTON",
  pre_button: "PRE_BUTTON",
  visit_question: "VISIT_QUESTION",
};
const intialState = {
  correctoptions: [],
  chosenOptions: [],
  visitedQuestions: [],
  chosenOption: undefined,
};
const quizReducer = (state, action) => {
  switch (action.type) {
    case action.next_button:
      return {
        ...state,
        chosenOption: action.payload.chosenOption,
        chosenOptions: action.payload.chosenOptions,
        visitedQuestions: action.payload.visitedQuestions,
      };
    case action.pre_button:
      return {
        ...state,
        visitedQuestions: action.payload.visitedQuestions,
      };
    case action.pre_button:
      return {
        ...state,
        visitedQuestions: action.payload.visitedQuestions,
      };
    default:
      return state;
  }
};

function QuizReducers() {
  const [quizState, quizDispatch] = useReducer(quizReducer, intialState);
  return [quizState, quizDispatch];
}

export default QuizReducers;
