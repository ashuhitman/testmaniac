import React, { useContext, useEffect, useState } from "react";

import "./HomePage.css";
import Header from "../../Components/Header/Header";
import TestCard from "../../Components/TestCard/TestCard";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/constants";
import HomePageLoader from "../../Components/HomePageLoader/HomePageLoader";
import TestContext from "../../context/Test/TestContext";
import { actions } from "../../context/Test/TestState";
import Pagination from "../../Components/Pagination/Pagination";

function HomePage() {
  // test context
  const { testState, dispatch } = useContext(TestContext);

  // get yesterday
  const ystDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const [tests, setTests] = useState([]);
  const [isLatest, setIsLatest] = useState(false);
  // console.log(tests);

  useEffect(() => {
    console.log(testState);
    // clear local storage
    localStorage.clear();
    console.log("homepage: ", testState);
    if (testState.tests.length > 0) {
      return;
    }

    console.log("fetching test data ...");
    axios
      .get(API_ENDPOINTS.TESTS)
      .then((response) =>
        dispatch({
          type: actions.save_tests,
          payload: {
            tests: response.data,
          },
        })
      )
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="filter-text">
        <button
          className={!isLatest ? "active-filter" : ""}
          onClick={() => setIsLatest(false)}
        >
          All
        </button>
        <button
          className={isLatest ? "active-filter" : ""}
          onClick={() => setIsLatest(true)}
        >
          Latest
        </button>
      </div>
      {testState.tests.length === 0 ? (
        <div className="container">
          <HomePageLoader />
        </div>
      ) : (
        <div className="test-container">
          {testState.tests
            .filter((test) => {
              if (isLatest) {
                return new Date(test.createdAt) >= ystDate;
              } else {
                return true;
              }
            })
            .map((test, index) =>
              test.questions.length === 0 ? (
                ""
              ) : (
                <TestCard key={index} cardData={test} />
              )
            )}
        </div>
      )}
      <Pagination />
    </div>
  );
}

export default HomePage;
