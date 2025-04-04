import React from "react";

const Stepper = ({ steps, activeStep, onNext, onPrevious, children }) => {
  return (
    <div className="stepper-container">
      <div className="stepper-header">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`stepper-step ${index === activeStep ? "active" : ""}`}
          >
            <span>{step.label}</span>
          </div>
        ))}
      </div>
      {children}
      <div className="stepper-footer mt20">
        {/* <button
          className="btn btn-secondary me-2"
          onClick={onPrevious}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        {activeStep < steps.length - 1 ? (
          <button className="btn btn-primary" onClick={onNext}>
            Next
          </button>
        ) : null} */}
      </div>
    </div>
  );
};

export default Stepper;
