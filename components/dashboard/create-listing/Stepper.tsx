import React, { ReactNode } from "react";

interface Step {
  label: string;
  // Add any additional step properties here if needed
}

interface StepperProps {
  /**
   * Array of step objects containing step information
   */
  steps: Step[];
  /**
   * Index of the currently active step (0-based)
   */
  activeStep: number;
  /**
   * Function to handle moving to the next step
   */
  onNext?: () => void;
  /**
   * Function to handle moving to the previous step
   */
  onPrevious?: () => void;
  /**
   * Child components to be rendered in the stepper content area
   */
  children: ReactNode;
}

/**
 * A stepper component that displays progress through a sequence of steps
 */
const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onNext: _onNext,
  onPrevious: _onPrevious,
  children,
}) => {
  return (
    <div className="stepper-container">
      <div className="stepper-header">
        {steps.map((step: Step, index: number) => (
          <div
            key={index}
            className={`stepper-step ${
              index === activeStep ? "active" : ""
            } ${index < activeStep ? "completed" : ""}`}
            role="progressbar"
            data-valuenow={index === activeStep ? 100 : index < activeStep ? 100 : 0}
            data-valuemin={0}
            data-valuemax={100}
            aria-label={step.label}
            aria-current={index === activeStep ? 'step' : undefined}
          >
            <span className="stepper-step-number">{index + 1}</span>
            <span className="stepper-step-label">{step.label}</span>
          </div>
        ))}
      </div>
      
      <div className="stepper-content">
        {children}
      </div>
      
      <div className="stepper-footer mt20">
        {/* Uncomment and style these buttons as needed
        {activeStep > 0 && (
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={onPrevious}
            disabled={activeStep === 0}
          >
            Previous
          </button>
        )}
        {activeStep < steps.length - 1 ? (
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={onNext}
            disabled={activeStep >= steps.length - 1}
          >
            Next
          </button>
        ) : null}
        */}
      </div>
    </div>
  );
};

export default Stepper;
