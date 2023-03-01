import React from 'react';

const McOtherQuestion = ({ question, onChange, answers, showError }) => {
  return (
    <div className="questions">
      <div className="required">
        <p>{question.text} </p>
        {showError.includes(question.id) && <span style={{ color: 'red' }}>*</span>}
      </div>
      <div className="multiple-choice-other">
        <ul>
          {question.options.map((option) => (
            <li key={option.id}>
              <label>
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  onChange={() => onChange(question.id, option.id)}
                />
                {option.text}
              </label>
              {option.id === 4 && (
                <input
                  className="other-input"
                  type="text"
                  name={question.id}
                  onChange={(event) => onChange(`${question.id}-other`, event.target.value)}
                  disabled={answers[question.id] !== 4}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default McOtherQuestion;
