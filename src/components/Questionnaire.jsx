import React, { useState, useEffect } from 'react';
import SubmittedAnswers from './SubmittedAnswers';
import '../App.css';
import { useParams } from 'react-router-dom';
import OpenTextQuestion from './QuestionType/OpenTextQuestion';
import McQuestion from './QuestionType/McQuestion';
import McOtherQuestion from './QuestionType/McOtherQuestion';
import QuestionnaireHeader from './QuestionnaireHeader';

const Questionnaire = () => {
  const { id } = useParams();
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [formComplete, setFormComplete] = useState(false);
  const [showError, setShowError] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/questionnaires/${id}`)
      .then((response) => response.json())
      .then((data) => setQuestionnaireData(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
    setShowError((prevRequired) => prevRequired.filter((id) => id !== questionId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredQuestion = questionnaireData.questions
      .filter((question) => question.required && !answers[question.id])
      .map((question) => question.id);

    setShowError(requiredQuestion);

    if (requiredQuestion.length === 0) {
      setFormComplete(true);
    }
  };

  if (!questionnaireData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {formComplete ? (
        <SubmittedAnswers answers={answers} />
      ) : (
        <>
          <QuestionnaireHeader showError={showError} />

          <form className="form-main" onSubmit={handleSubmit}>
            {questionnaireData.questions.map((question) => {
              if (question.type === 'multiple-choice') {
                return (
                  <McQuestion
                    key={question.id}
                    question={question}
                    onChange={handleAnswerChange}
                    showError={showError}
                  />
                );
              }

              if (question.type === 'open-text') {
                return (
                  <OpenTextQuestion
                    key={question.id}
                    question={question}
                    onChange={handleAnswerChange}
                    showError={showError}
                  />
                );
              }
              if (question.type === 'multiple-choice-other') {
                return (
                  <McOtherQuestion
                    key={question.id}
                    question={question}
                    onChange={handleAnswerChange}
                    answers={answers}
                    showError={showError}
                  />
                );
              }
            })}
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Questionnaire;
