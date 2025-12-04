import React, { InputHTMLAttributes, forwardRef, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', ...props }, ref) => {
        // useId generates a unique ID for accessibility mapping
        const generatedId = useId();
        const inputId = props.id || generatedId;
        const descriptionId = `${generatedId}-description`;

        // Clean up class logic. 
        // Note: 'focus:ring-blue-500' is moved into the conditional to avoid conflict
        const baseClasses = [
            "w-full px-3 py-2 border rounded-md shadow-sm",
            "focus:outline-none focus:ring-2",
            "placeholder-gray-400 text-gray-900",
            error 
                ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
            className
        ].join(" ");

        return (
            <div className="w-full">
                {label && (
                    <label 
                        htmlFor={inputId} 
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    ref={ref}
                    className={baseClasses}
                    // Accessibility: Explicitly mark input as invalid if error exists
                    aria-invalid={!!error}
                    // Accessibility: Link input to helper text/error message
                    aria-describedby={error || helperText ? descriptionId : undefined}
                    {...props}
                />
                
                {/* Render Error OR Helper Text (Error takes precedence) */}
                {(error || helperText) && (
                    <p 
                        id={descriptionId} 
                        className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;