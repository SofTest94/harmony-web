import React from 'react';
type progressType = {
  currentStep: number;
  totalSteps: number;
};
const ProgressBar: React.FC<progressType> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${progressPercentage}%` }}
      >
        Paso {currentStep} de {totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar;
