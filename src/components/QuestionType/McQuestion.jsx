import React from 'react';

const McQuestion = ({ question, onChange, showError }) => {
  return (
    <div className="questions">
      <div className="required">
        <p>{question.text} </p>
        {showError.includes(question.id) && <span style={{ color: 'red' }}>*</span>}
      </div>
      <div className="multiple-choice">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default McQuestion;
