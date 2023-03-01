import React, { useState, useEffect } from 'react';
import SubmittedAnswers from './SubmittedAnswers';
import '../App.css';

const Questionnaire = ({ questionnaireId }) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState({});
  const [formComplete, setFormComplete] = useState(false);
  const [requiredQuestions, setRequiredQuestions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/questionnaires/${questionnaireId}`)
      .then((response) => response.json())
      .then((data) => setQuestionnaire(data))
      .catch((error) => console.error(error));
  }, [questionnaireId]);

  // обновляет состояние answers и удаляет questionId из массива requiredQuestions, если вопрос теперь имеет ответ
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
    setRequiredQuestions((prevRequired) => prevRequired.filter((id) => id !== questionId));
  };

  //проверяет, все ли обязательные вопросы имеют ответы, и устанавливает состояние formComplete в true, если это так, а также устанавливает массив requiredQuestions для отображения любых неотвеченных обязательных вопросов
  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredQuestions = questionnaire.questions
      .filter((question) => question.required && !answers[question.id])
      .map((question) => question.id);

    setRequiredQuestions(requiredQuestions);

    if (requiredQuestions.length === 0) {
      setFormComplete(true);
    }
  };

  if (!questionnaire) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {formComplete ? (
        <SubmittedAnswers answers={answers} />
      ) : (
        <>
          <div className="header">
            <h1>GoTech Questionnaire</h1>
            <p>Show me what you got!</p>
            {requiredQuestions.length > 0 && <p className="header-required">* Required</p>}
          </div>
          <form className="form-main" onSubmit={handleSubmit}>
            {questionnaire.questions.map((question) => (
              <div className="questions" key={question.id}>
                <div className="required">
                  <p>{question.text} </p>
                  {requiredQuestions.includes(question.id) && (
                    <span style={{ color: 'red' }}>*</span>
                  )}
                </div>

                <div className="multiple-choice">
                  {question.type === 'multiple-choice' && (
                    <ul>
                      {question.options.map((option) => (
                        <li key={option.id}>
                          <label>
                            <input
                              type="radio"
                              name={question.id}
                              value={option.id}
                              onChange={() => handleAnswerChange(question.id, option.id)}
                            />
                            {option.text}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="open-text">
                  {question.type === 'open-text' && (
                    <input
                      type="text"
                      name={question.id}
                      placeholder={question.placeholder}
                      onChange={(event) => handleAnswerChange(question.id, event.target.value)}
                    />
                  )}
                </div>
                <div className="multiple-choice-other">
                  {question.type === 'multiple-choice-other' && (
                    <ul>
                      {question.options.map((option) => (
                        <li key={option.id}>
                          <label>
                            <input
                              type="radio"
                              name={question.id}
                              value={option.id}
                              onChange={() => handleAnswerChange(question.id, option.id)}
                            />
                            {option.text}
                          </label>
                          {option.id === 4 && (
                            <input
                              className="other-input"
                              type="text"
                              name={question.id}
                              onChange={(event) =>
                                handleAnswerChange(`${question.id}-other`, event.target.value)
                              }
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
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
