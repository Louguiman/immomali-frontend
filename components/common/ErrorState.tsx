import { AlertCircle } from "lucide-react";
import { FC } from "react";

interface ErrorStateProps {
  /** Optional title for the error message */
  title?: string;
  /** Detailed error message */
  message?: string | React.ReactNode;
  /** Callback function for retry action */
  onRetry?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for the alert */
  ariaLabel?: string;
}

/**
 * ErrorState component displays an error message with optional retry button.
 * It's designed to be used when an error occurs during data fetching or processing.
 */
const ErrorState: FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
  className = "",
  ariaLabel = "Error message",
}) => {
  const defaultTitle = "Something went wrong";
  const defaultMessage =
    "We couldn't load the requested content. Please try again.";
  const retryButtonText = "Try again";

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex flex-col items-center justify-center p-6 ${className}`}
    >
      <div
        className="w-full max-w-md p-4 rounded-lg border border-red-200 bg-red-50 text-red-800"
        aria-label={ariaLabel}
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <h3 className="font-semibold m-0">{title || defaultTitle}</h3>
        </div>
        <p className="mt-2">{message || defaultMessage}</p>
        {onRetry && (
          <div className="mt-4">
            <button
              onClick={onRetry}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              aria-label={retryButtonText}
            >
              {retryButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

ErrorState.displayName = "ErrorState";

export default ErrorState;
