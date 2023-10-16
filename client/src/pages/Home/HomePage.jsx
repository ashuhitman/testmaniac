import React, { useContext, useEffect, useState } from "react";

import "./HomePage.css";
import Loader from "../../Components/Loader/Loader";
import Header from "../../Components/Header/Header";
import TestCard from "../../Components/TestCard/TestCard";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/constants";
import HomePageLoader from "../../Components/HomePageLoader/HomePageLoader";

function HomePage() {
  const ystDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const [tests, setTests] = useState([]);
  const [isLatest, setIsLatest] = useState(false);
  // console.log(tests);

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.TESTS)
      .then((response) => setTests(response.data))
      .catch((error) => console.log(error));
  }, []);

  if (tests.length === 0) {
    console.log("loading...");
    const cardData = {
      _id: 0,
      testName: "lrmdgd",
      questionAmount: 2,
      timer: "23",
      subject: "jsndnsda",
      options: [],
    };
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
        {tests
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
