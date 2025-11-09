import React from "react";
import Header2 from "../Common/Header2";
import Footer from "../Common/Footer";
import "./DietPreferencePage.css";
import vegImg from "../../assets/veg.jpeg";
import nonVegImg from "../../assets/nonveg.jpeg";

const DietPreferencePage = () => {
  return (
    <>
      <Header2 />
    <div className="diet-page">

      <h2 className="diet-title">Choose Your Diet Preference</h2>
      <p className="diet-subtitle">Select your dietary preference to get personalized meal plans</p>

      <div className="diet-card-wrapper">

        
        <div className="diet-card green-bg">
          <div className="diet-image-container">
            <img src={vegImg} alt="vegetarian" />
            <div className="diet-overlay"></div>

            
          </div>

          <div className="diet-card-content">
            <h3>Vegetarian</h3>
            <p>Plant-based nutrition for optimal health and wellness</p>
            <button className="select-btn green-btn">Select This Option</button>
          </div>
        </div>

       
        <div className="diet-card orange-bg">
          <div className="diet-image-container">
            <img src={nonVegImg} alt="non-vegetarian" />
            <div className="diet-overlay"></div>

            
          </div>

          <div className="diet-card-content">
            <h3>Non-Vegetarian</h3>
            <p>Balanced protein-rich meals for peak performance</p>
            <button className="select-btn orange-btn">Select This Option</button>
          </div>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default DietPreferencePage;
