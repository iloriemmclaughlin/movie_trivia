import React, { useState } from 'react';

import { quiz } from '../Question/TestQuiz';

const TestGame = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;

  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult(prev =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 },
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion(prev => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log('right');
    } else {
      setSelectedAnswer(false);
      console.log('wrong');
    }
  };

  const addLeadingZero = number => (number > 9 ? number : `0${number}`);

  return (
    <div className="flex aspect-auto items-center justify-center bg-red-300">
      {!showResult ? (
        <div>
          <div>
            <span>{addLeadingZero(activeQuestion + 1)}</span>
            <span>/{addLeadingZero(questions.length)}</span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                className="my-4 rounded-lg bg-red-100"
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div>
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TestGame;