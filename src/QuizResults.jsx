import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "./QuizContext";

export default function QuizResults() {
  const navigate = useNavigate();
  const { quizData, setQuizData, userResponse } = useContext(QuizContext);
  const score = quizData.reduce((acc, item, index) => {
    if (item.correct_answer === userResponse[index]) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const scoreColor =
    score <= 1 ? "#EE1428" : score <= 3 ? "#EEC314" : "#35F100";

  const handleCreateNewQuiz = () => {
    setQuizData([]);
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="mb-4">Results</h2>
      <div>
        {quizData.map((item, index) => (
          <div key={index} className="quiz-question mb-4">
            <p className="text-left">{item.question}</p>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {item.sortedAnswers.map((choice) => {
                const isCorrect = choice === item.correct_answer;
                const isUserChoice = userResponse[index] === choice;
                const backgroundColor = isCorrect
                  ? "#35F100"
                  : isUserChoice
                  ? "#EE1428"
                  : "#f0f0f0";
                return (
                  <p
                    key={choice}
                    className="border p-2 "
                    style={{
                      backgroundColor: backgroundColor,
                      color: "black",
                    }}
                  >
                    {choice}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-4 "
        style={{ backgroundColor: scoreColor, color: "black" }}
      >
        You scored {score} out of {quizData.length}
      </div>

      <button
        className="btn btn-outline-secondary mt-3"
        onClick={handleCreateNewQuiz}
      >
        Create a new Quiz
      </button>
    </div>
  );
}
