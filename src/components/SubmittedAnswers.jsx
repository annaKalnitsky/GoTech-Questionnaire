import React from 'react';

const SubmittedAnswers = ({ answers }) => {
  return (
    <div>
      <h2>Thank you for completing the questionnaire!</h2>
      <ul>
        {Object.keys(answers).map((questionId) => (
          <li key={questionId}>
            <strong>{questionId}</strong>: {answers[questionId]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmittedAnswers;
