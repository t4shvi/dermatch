import { useState } from "react";
import "../App.css";

function Quiz() {
  const skinTypeImages = {
    Oily: "/oily.jpg",
    Dry: "/dry.jpg",
    Combination: "/combination.jpg",
    Normal: "/normal.jpg",
    Sensitive: "/sensitive.jpg",
  };

    const questions = [
    {
      question: "How does your skin feel a few hours after cleansing?",
      options: [
        { text: "Shiny or greasy", type: "Oily" },
        { text: "Tight or flaky", type: "Dry" },
        { text: "Oily in T-zone, dry on cheeks", type: "Combination" },
        { text: "Comfortable and balanced", type: "Normal" },
        { text: "Easily irritated or red", type: "Sensitive" }
      ]
    },
    {
      question: "How often do you notice breakouts?",
      options: [
        { text: "Very often", type: "Oily" },
        { text: "Rarely, but skin feels rough", type: "Dry" },
        { text: "Sometimes in T-zone only", type: "Combination" },
        { text: "Almost never", type: "Normal" },
        { text: "After using new products", type: "Sensitive" }
      ]
    },
    {
      question: "How does your skin react to moisturizers?",
      options: [
        { text: "Feels greasy quickly", type: "Oily" },
        { text: "Absorbs fast, still feels dry", type: "Dry" },
        { text: "Only some areas feel greasy", type: "Combination" },
        { text: "Feels just right", type: "Normal" },
        { text: "Burns, stings, or turns red", type: "Sensitive" }
      ]
    },
    {
      question: "What's your skin like in the morning?",
      options: [
        { text: "Shiny", type: "Oily" },
        { text: "Dry patches", type: "Dry" },
        { text: "Shiny forehead, dry cheeks", type: "Combination" },
        { text: "Even and smooth", type: "Normal" },
        { text: "Redness or irritation", type: "Sensitive" }
      ]
    },
    {
      question: "How does your skin feel in different seasons?",
      options: [
        { text: "Oily all year", type: "Oily" },
        { text: "Dry all year", type: "Dry" },
        { text: "Oily in summer, dry in winter", type: "Combination" },
        { text: "Barely changes", type: "Normal" },
        { text: "Fluctuates with irritation", type: "Sensitive" }
      ]
    }
  ];

  const skinDescriptions = { 
Oily: "Oily skin is caused by the overproduction of sebum from the skin's sebaceous glands. This can be triggered by stress, humidity, genetics, and even fluctuating hormones. When the skin produces excessive sebum, it can cause your face to appear shiny and feel greasy—especially in the T-zone (forehead, nose, and chin). Excess sebum can also clog your pores, which is why oily skin tends to be prone to large pores, blackheads, and other types of acne blemishes. However, there can be an upside to having oily skin. According to the American Academy of Dermatology, people with oily skin may have fewer wrinkles.", 
Dry: "Dry skin generally produces less sebum than other skin types. Sebum plays a key role in lubricating your skin and helping to protect it from moisture loss. Without sufficient natural oils, your skin may lose moisture too quickly and appear visibly dehydrated, dull, flaky, or even scaly. It often feels tight, with a rough texture and more visible fine lines. Dry skin may also become itchy or irritated. There are several factors that can trigger dry skin, including a compromised skin barrier. The skin barrier helps retain water in the skin, so when that gets disrupted, water can easily leave—causing the skin to feel dry. Certain skincare habits—like using abrasive or drying products or taking long, hot showers—may worsen dryness.", 
Combination: "Combination skin means that there are some areas of your face that are dry and other areas of your face that are more oily. The T-zone (forehead, nose, and chin) is commonly oily, and the cheeks are often drier. It can look different in each person; some people may notice shine in areas where they tend to have more oil, while others may have red patches in drier spots. Depending on your skin tone, drier areas may also take on a grayish hue (sometimes referred to as ashy skin). The combination skin type may be more likely to vary during different seasons of the year or due to various factors, such as stress or hormone fluctuations.", 
Normal: "Normal skin just means that your skin feels hydrated and comfortable, but not oily or dry. Unlike combination skin, people with normal skin don’t have patches that are oily and patches that are dry. They just have an overall hydrated and comfortable look. Normal skin types are generally not prone to any specific skin concerns, like acne breakouts, redness, or shine. People with normal skin often have a smooth skin texture with less noticeable pores and may be less prone to sensitivity.", 
Sensitive: "Sensitive skin is the only skin type that isn’t determined by how much oil your skin produces. Instead, sensitive skin describes skin that is more reactive than other skin types. Sensitive skin may be more vulnerable to external irritants and easily triggered by certain ingredients (like fragrance) as well as environmental factors (like pollution). People with sensitive skin may notice that their skin looks red and stings, burns, or feels irritated after applying skincare products. Although it’s usually classified as its own skin type, any of the other skin types can experience sensitivity. The exact cause of sensitive skin is still unknown, but recent research suggests that it may be associated with a compromised skin barrier." 
};

  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null);

  const handleAnswer = (type) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = type;
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = (finalAnswers) => {
    const counts = {};
    finalAnswers.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });

    let maxType = "";
    let maxCount = 0;
    for (const type in counts) {
      if (counts[type] > maxCount) {
        maxType = type;
        maxCount = counts[type];
      }
    }
    setResult(maxType);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title"> Skin Type Finder Quiz </h1>
      <p className="quiz-subtitle">
        Discover your skin type in just a few quick questions.
      </p>

      {/* Intro screen */}
      {!quizStarted && !result && (
        <div className="quiz-intro">
          <p>
            This quiz will ask you a series of simple questions to help identify your skin type.
            Based on your answers, you'll receive personalized insights into how to care for your skin.
          </p>
          <button className="quiz-start-btn" onClick={() => setQuizStarted(true)}>
            Start Quiz
          </button>
        </div>
      )}

      {/* Question screen */}
      {quizStarted && !result && (
        <div className="quiz-question">
          {currentQuestion > 0 && (
            <div className="quiz-navigation">
              <button onClick={goBack} className="quiz-back-btn">← Back</button>
            </div>
          )}

          <h3>{questions[currentQuestion].question}</h3>

          {questions[currentQuestion].options.map((option, i) => {
            const isSelected = answers[currentQuestion] === option.type;
            return (
              <button
                key={i}
                className={`quiz-option-btn ${isSelected ? "selected" : ""}`}
                onClick={() => handleAnswer(option.type)}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      )}

      {/* Result screen */}
      {result && (
        <div className="quiz-result-container">
          <h2 className="result-title">{`Your most likely skin type is: ${result}`}</h2>
          <img src={skinTypeImages[result]} alt={result} className="result-image" />
          <p className="result-description">{skinDescriptions[result]}</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
