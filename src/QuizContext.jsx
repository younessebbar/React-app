import { createContext, useState } from "react";
import PropTypes from "prop-types"; 

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [quizData, setQuizData] = useState([]);
    const [userResponse, setUserResponse] = useState({});
    return (
        <QuizContext.Provider value={{ quizData, setQuizData, userResponse, setUserResponse }}>
          {children}
        </QuizContext.Provider>
      );
      
};


QuizProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };