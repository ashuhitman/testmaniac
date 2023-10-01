import React, { useContext, useEffect, useState } from "react";
import Modal from "../../Components/Modal/Modal";
import Button from "../../Components/Button/Button";
import "./HomePage.css";
import Loader from "../../Components/Loader/Loader";
import Header from "../../Components/Header/Header";
import TestCard from "../../Components/TestCard/TestCard";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/constants";
import HomePageLoader from "../../Components/HomePageLoader/HomePageLoader";

function HomePage() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.TESTS)
      .then((response) => setTests(response.data))
      .catch((error) => console.log(error));
  }, []);
  let mainContent;
  if (tests.length === 0) {
    console.log("loading...");
    return <HomePageLoader />;
  }
  return (
    <div className="container">
      <Header />
      <div className="test-container">
        {tests.map((test, index) =>
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
