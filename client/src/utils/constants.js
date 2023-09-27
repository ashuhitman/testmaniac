// constants.js
const API_BASE_URL = "https://test-maniac.onrender.com";
export const API_ENDPOINTS = {
  TESTS: API_BASE_URL + "/tests",
  TESTS_CREATE: API_BASE_URL + "/tests/add",
  TEST_UPDATE: API_BASE_URL + "/tests/update/",
  TESTS_DELETE: API_BASE_URL + "/tests/delete/",
  QUESTIONS: API_BASE_URL + "/questions",
  QUESTIONS_ADD: API_BASE_URL + "/questions/add/",
  QUESTIONS_UPDATE: API_BASE_URL + "/questions/update/",
  QUESTIONS_DELETE: API_BASE_URL + "/questions/delete/",
};

export const MIN_QUESTION = 2;
export const TEXT_LENGTH = 5;
