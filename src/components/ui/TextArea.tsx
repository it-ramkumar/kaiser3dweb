import React, { TextareaHTMLAttributes, forwardRef, useId } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, error, helperText, className = '', ...props }, ref) => {
        // Generate unique IDs for accessibility
        const generatedId = useId();
        const inputId = props.id || generatedId;
        const descriptionId = `${inputId}-description`;

        const baseClasses = [
            "w-full rounded-md border px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2",
            "placeholder-gray-400 text-gray-900", // Standard text colors
            "min-h-[80px]", // Default minimum height for textarea
            error 
                ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
            className
        ].join(" ");

        return (
            <div className="flex flex-col gap-1 w-full">
                {label && (
                    <label 
                        htmlFor={inputId} 
                        className="text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    id={inputId}
                    ref={ref}
                    className={baseClasses}
                    // Accessibility: Mark as invalid if error exists
                    aria-invalid={!!error}
                    // Accessibility: Point to the error/helper text ID
                    aria-describedby={error || helperText ? descriptionId : undefined}
                    {...props}
                />
                
                {/* Error or Helper Text */}
                {(error || helperText) && (
                    <p 
                        id={descriptionId} 
                        className={`text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';

export default TextArea;