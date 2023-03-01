import React from 'react';

const QuestionnaireHeader = ({ showError }) => {
  return (
    <div className="header">
      <h1>GoTech Questionnaire</h1>
      <p>Show me what you got!</p>
      {showError.length > 0 && <p className="header-required">* Required</p>}
    </div>
  );
};

export default QuestionnaireHeader;
