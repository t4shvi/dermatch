import { useState } from "react";
import emailjs from "@emailjs/browser";

const Email = ({ routine, userPreferences }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const categories = ["Cleanser", "Serum", "Moisturizer", "Sunscreen"];
    const productVars = {};
    categories.forEach((cat) => {
      const product = routine[cat];
      productVars[`${cat.toLowerCase()}Name`] = product ? product.name : "Not matched";
      productVars[`${cat.toLowerCase()}Brand`] = product ? product.brand : "";
      productVars[`${cat.toLowerCase()}Price`] = product ? product.price : "";
      // Use the same detailed reason logic as Analysis.js
      let reason = "";
      if (product) {
        if (cat === "Cleanser") {
          reason = `Gentle cleanser suited for ${userPreferences.skinType} skin. Helps remove dirt and oil without disrupting skin barrier.`;
        } else if (cat === "Serum") {
          reason = `Targets your concern(s): ${userPreferences.concern.join(", ")}. Chosen because it directly addresses these issues while fitting your budget.`;
        } else if (cat === "Moisturizer") {
          reason = `Keeps your ${userPreferences.skinType} skin hydrated and supports barrier repair, preventing dryness or irritation.`;
        } else if (cat === "Sunscreen") {
          reason = `Protects against UV damage, prevents worsening of ${userPreferences.concern.length > 0 ? userPreferences.concern.join(", ") : "skin concerns"}, and is light enough for ${userPreferences.skinType} skin.`;
        }
      }
      productVars[`${cat.toLowerCase()}Reason`] = reason;
      productVars[`${cat.toLowerCase()}Link`] = product ? product.link : "";
    });

    const templateParams = {
      to_email: email,
      skinType: userPreferences.skinType,
      concern: userPreferences.concern.join(", "),
      budget: userPreferences.budget,
      ...productVars,
    };

    console.log("EmailJS templateParams:", templateParams);

    emailjs
      .send("dermatch737", "dermatch", templateParams, "XguOJFn1m2dKJSirI")
      .then(
        () => {
          setStatus("✅ Email sent! Check your inbox.");
          setEmail("");
        },
        (error) => {
          console.error("EmailJS error:", error);
          setStatus("❌ Failed to send. Try again later. " + (error?.text || error?.message || ""));
        }
      );
  };

  return (
    <div className="email-section">
      <h3>💌 Happy with your routine?</h3>
      <p>We’ll email it to you so you can save it!</p>
      <form onSubmit={handleSend}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="email-input"
        />
        <button type="submit" className="send-btn">
          Send to Me
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Email;
