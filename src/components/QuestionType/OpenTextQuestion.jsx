import React from 'react';

const OpenTextQuestion = ({ question, onChange, showError }) => {
  return (
    <div className="questions">
      <div className="required">
        <p>{question.text} </p>
        {showError.includes(question.id) && <span style={{ color: 'red' }}>*</span>}
      </div>
      <div className="open-text">
        {question.type === 'open-text' && (
          <input
            type="text"
            name={question.id}
            placeholder={question.placeholder}
            onChange={(event) => onChange(question.id, event.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default OpenTextQuestion;
