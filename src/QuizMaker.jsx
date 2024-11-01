import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "./QuizContext";

export default function QuizMaker() {
  const [difficultyLevels] = useState(["easy", "medium", "hard"]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const { quizData, setQuizData, userResponse, setUserResponse } =
    useContext(QuizContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("https://opentdb.com/api_category.php");
      if (response) {
        const data = await response.json();
        setCategories(data.trivia_categories);
      }
    };
    getCategories();
  }, []);

  const createQuiz = async () => {
    const apiUrl = `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;
    const response = await fetch(apiUrl);
    if (response) {
      const data = await response.json();
      const formattedData = data.results.map((item) => {
        return {
          ...item,
          sortedAnswers: randomAnswers(
            item.correct_answer,
            item.incorrect_answers
          ),
        };
      });
      setQuizData(formattedData);
      setUserResponse({});
    }
  };

  const handleChoiceClick = (index, choice) => {
    setUserResponse((previousResponse) => ({
      ...previousResponse,
      [index]: choice,
    }));
  };

  const randomAnswers = (correctOne, incorrectOnes) => {
    const listAnswers = [...incorrectOnes, correctOne];
    return listAnswers.sort(() => Math.random() - 0.5);
  };

  const quizAnswered =
    quizData.length > 0 && quizData.length === Object.keys(userResponse).length;

  const handleSubmit = () => {
    if (quizData.length > 0) {
      navigate("/results");
    }
  };
  return (
    <>
      <div className="d-flex gap-2 mb-3 justify-content-center">
        <select
          id="categorySelect"
          className="form-select"
          aria-label="Select category"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          id="difficultySelect"
          className="form-select"
          aria-label="Select category"
          value={selectedDifficulty}
          onChange={(e) => {
            setSelectedDifficulty(e.target.value);
          }}
        >
          <option value="">Select difficulty</option>
          {difficultyLevels.map((difficultyLevel) => (
            <option key={difficultyLevel} value={difficultyLevel}>
              {difficultyLevel.charAt(0).toUpperCase() +
                difficultyLevel.slice(1)}
            </option>
          ))}
        </select>
        <button
          id="createBtn"
          className="btn btn-outline-secondary"
          onClick={createQuiz}
        >
          Create
        </button>
      </div>

      {quizData.length > 0 && (
        <div>
          {quizData.map((item, index) => (
            <div key={index} className="quiz-question mb-4">
              <p className="text-left">{item.question}</p>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {item.sortedAnswers.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => handleChoiceClick(index, choice)}
                    className={`btn ${
                      userResponse[index] === choice
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {quizAnswered && (
            <div className="text-center mt-4">
              <button className="btn btn-secondary w-50" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
