import React from "react";
import ScrollToTop from "../components/ScrollTop";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  return (
    <div>
      <ScrollToTop />
      <Link to={"/search/name/"}>
        <div class="containerBox">
          <div class="text-box">
            <h4 className="main">New.</h4>
          </div>
          <img
            src="./images/Banner1.jpg"
            className="home-image"
            alt="homeimage1"
          />
        </div>
      </Link>
      <Link to={"/search/gender/Men"}>
        <div className="home-image-container-left">
          <div class="containerBox">
            <div class="text-box">
              <h4 className="sub-main1">Men.</h4>
            </div>
            <img
              src="./images/Banner13.jpg"
              className="home-image"
              alt="homeimage1"
            />
          </div>
        </div>
      </Link>
      <Link to={"/search/gender/Women"}>
        <div className="home-image-container-right">
          <div class="containerBox">
            <div class="text-box">
              <h4 className="sub-main3">Women.</h4>
            </div>
            <img
              src="./images/Banner15.jpg"
              className="home-image"
              alt="homeimage1"
            />
          </div>
        </div>
      </Link>
      <Link to={"/search/name/"}>
        <div class="containerBox">
          <div class="text-box">
            <h4 className="main">Family.</h4>
          </div>
          <img
            src="./images/Banner2.jpg"
            className="home-image"
            alt="homeimage1"
          />
        </div>
      </Link>
      <Link to={"/search/name/"}>
        <div className="home-image-container-left">
          <div class="containerBox">
            <div class="text-box">
              <h4 className="sub-main1">Wild.</h4>
            </div>
            <img
              src="./images/Banner7.jpg"
              className="home-image"
              alt="homeimage1"
            />
          </div>
        </div>
      </Link>
      <Link to={"/search/name/"}>
        <div className="home-image-container-right">
          <div class="containerBox">
            <div class="text-box">
              <h4 className="sub-main2">Beauty.</h4>
            </div>
            <img
              src="./images/Banner8.jpg"
              className="home-image"
              alt="homeimage1"
            />
          </div>
        </div>
      </Link>
      <Link to={"/search/gender/Women"}>
        <div class="containerBox">
          <div class="text-box">
            <h4 className="main">Next.</h4>
          </div>
          <img
            src="./images/Banner3.jpg"
            className="home-image"
            alt="homeimage1"
          />
        </div>
      </Link>
    </div>
  );
}
