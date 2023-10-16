import React, { useContext, useEffect, useState } from "react";

import "./HomePage.css";
import Header from "../../Components/Header/Header";
import TestCard from "../../Components/TestCard/TestCard";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/constants";
import HomePageLoader from "../../Components/HomePageLoader/HomePageLoader";
import TestContext from "../../context/Test/TestContext";
import { actions } from "../../context/Test/TestState";

function HomePage() {
  // test context
  const { testState, dispatch } = useContext(TestContext);
  // get yesterday
  const ystDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const [tests, setTests] = useState([]);
  const [isLatest, setIsLatest] = useState(false);
  // console.log(tests);

  useEffect(() => {
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

  if (testState.tests.length === 0) {
    return (
      <div className="container">
        <HomePageLoader />
      </div>
    );
  }
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
      <div className="test-container">
        {testState.tests
          .filter((test) => {
            if (isLatest) {
              console.log(
                new Date(test.createdAt),
                ystDate,
                new Date(test.createdAt) >= ystDate
              );
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
    </div>
  );
}

export default HomePage;
