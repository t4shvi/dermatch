import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";
import Analysis from "./components/Analysis";
import "./App.css";

function App() {
  const [skinType, setSkinType] = useState("");
  const [concern, setConcern] = useState([]);
  const [budget, setBudget] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleGenerateRoutine = () => {
    if (!skinType || concern.length === 0) {
      alert("Please select your skin type and at least one concern.");
      return;
    }
    setShowAnalysis(true);
  };

  const MainPage = () => (
    <div className="app-container">
      <nav className="navbar navbar-fixed">
        <button className="help-btn" onClick={() => setShowHelp(true)}>
          ⓘ Help 
        </button>
      </nav>

      <div className="navbar-spacer"></div>

      <div className="logo-header">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="DerMatch Logo"
          className="logo-img-main"
        />
      </div>

      {showHelp && (
  <div className="help-popup">
    <div className="help-popup-content">
      <button
        className="help-popup-close"
        onClick={() => setShowHelp(false)}
        aria-label="Close"
      >
        x
      </button>
      <h2 className="help-popup-title">What is Dermatch?</h2>
      <p>
        Hey there, bestie! Feeling lost in the world of skincare? We get it.
        With a new product popping up every other day, finding what's right
        for your skin can be overwhelming.<br /><br />
        That's where <b>Dermatch</b> comes in! We're your <b>completely free</b> skincare
        matchmaker. Just tell us your skin type, concerns, and budget, and
        we'll whip up a personalized routine just for you. No more guesswork,
        just great matches!<br /><br />
        Not sure what your skin type is? No problem! We have a quick and easy quiz
        to help you figure it out.<br /><br />
        Once you have your routine, you can even have it sent straight to your inbox.
        Because great skin shouldn't be a puzzle—it should be a piece of cake!
      </p>
    </div>
  </div>
)}

      <main className="form-container">
        <p
          className="dermatch-subtitle"
          style={{ textAlign: "center", margin: "24px 0" }}
        >
          Discover your personalized skincare journey with DerMatch.
        </p>

        {/* Skin Type */}
        <div className="form-group">
          <label>Skin Type</label>
          <select value={skinType} onChange={(e) => setSkinType(e.target.value)}>
            <option value="">Select your skin type</option>
            <option value="Oily">Oily</option>
            <option value="Dry">Dry</option>
            <option value="Combination">Combination</option>
            <option value="Normal">Normal</option>
            <option value="Sensitive">Sensitive</option>
          </select>
          <p className="quiz-link">
            Not sure?{" "}
        
            <a href={`${process.env.PUBLIC_URL}/quiz`} target="_blank" rel="noopener noreferrer">
              Take our Skin Type Finder Quiz →
            </a>
          </p>
        </div>

        {/* Skin Concern */}
        <div className="form-group">
          <label>Skin Concern</label>
          <div className="checkbox-group">
            {["Acne", "Oiliness", "Dryness", "Pigmentation", "Aging"].map(
              (item) => (
                <label key={item} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={item}
                    checked={concern.includes(item)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setConcern([...concern, item]);
                      } else {
                        setConcern(concern.filter((c) => c !== item));
                      }
                    }}
                  />
                  {item}
                </label>
              )
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Budget (₹{budget || 600})</label>
          <input
            type="range"
            min="600"
            max="2500"
            step="100"
            value={budget || 600}
            onChange={(e) => setBudget(e.target.value)}
          />
          <p>Selected Budget: ₹{budget || 600}</p>
        </div>

        <button
          type="button"
          className="generate-btn"
          onClick={handleGenerateRoutine}
        >
          Generate My Routine ✨
        </button>

        {showAnalysis && (
          <Analysis userPreferences={{ skinType, concern, budget }} />
        )}
      </main>
    </div>
  );

  return (
    <Router basename="/dermatch">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
