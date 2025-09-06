import { useEffect, useState } from "react";
import productsData from "./products.json";
import Email from "./Email"; 

const Analysis = ({ userPreferences }) => {
  const [routine, setRoutine] = useState({});

  const { skinType = "", concern = [], budget = 0 } = userPreferences || {};

  useEffect(() => {
    if (!skinType || !budget || Number(budget) < 800) {
      setRoutine({});
      return;
    }

    const categories = ["Cleanser", "Serum", "Moisturizer", "Sunscreen"];
    const newRoutine = {};

    categories.forEach((category) => {
      let matches = productsData.products.filter((product) => {
        const matchesSkinType =
          product.skinType.includes("All") ||
          product.skinType.some(
            (s) => s.toLowerCase() === skinType.toLowerCase()
          );

        const matchesBudget = product.price <= budget;

        let matchesConcern = true;
        if (category === "Serum") {
          matchesConcern = product.concern.some((c) =>
            concern.map((uc) => uc.toLowerCase()).includes(c.toLowerCase())
          );
        }

        return (
          product.category.toLowerCase() === category.toLowerCase() &&
          matchesSkinType &&
          matchesBudget &&
          matchesConcern
        );
      });

      if (matches.length > 0) {
        const bestOption = matches.reduce((prev, curr) =>
          prev.price < curr.price ? prev : curr
        );
        newRoutine[category] = bestOption;
      }
    });

    setRoutine(newRoutine);
  }, [skinType, concern, budget]);

  const hasResults = Object.keys(routine).length > 0;

  if (!hasResults) {
    return (
      <p>
        No suitable routine found. Try adjusting your budget, skin type, or
        concerns.
      </p>
    );
  }

  return (
    <div className="routine-results routine-pink-bg">
      <h2>Your Personalized Skincare Routine ✨</h2>
      <p>
        Based on your <strong>{skinType}</strong> skin type,
        {concern && concern.length > 0 && (
          <>
            {" concerns: "}
            <strong>
              {concern.join(", ")}
            </strong>
            , 
          </>
        )}
        and a budget under <strong>₹{budget}</strong> per product, here’s a balanced
        routine with reasoning:
      </p>
      <div className="routine-grid">
        {Object.entries(routine).map(([category, product], index) => (
          <div key={index} className="product-card">
            <h3>{category}</h3>
            <p>
              <strong>{product.name}</strong> <br />
              {product.brand} <br />
              ₹{product.price}
            </p>
            <p>
              <em>
                Why this?{" "}
                {category === "Cleanser" &&
                  `Gentle cleanser suited for ${skinType} skin. Helps remove dirt and oil without disrupting skin barrier.`}
                {category === "Serum" &&
                  `Targets your concern(s): ${concern.join(", ")}. Chosen because it directly addresses these issues while fitting your budget.`}
                {category === "Moisturizer" &&
                  `Keeps your ${skinType} skin hydrated and supports barrier repair, preventing dryness or irritation.`}
                {category === "Sunscreen" &&
                  `Protects against UV damage, prevents worsening of ${
                    concern.length > 0 ? concern.join(", ") : "skin concerns"
                  }, and is light enough for ${skinType} skin.`}
              </em>
            </p>
            <p>
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
            </p>
          </div>
        ))}
      </div>
      <Email routine={routine} userPreferences={{ skinType, concern, budget }} />
    </div>
  );
};

export default Analysis;
