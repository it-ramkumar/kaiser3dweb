import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'font-medium rounded transition-colors duration-200 cursor-pointer';

    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
        secondary: 'bg-gray-300 text-gray-900 hover:bg-gray-400 active:bg-gray-500',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
        <button className={combinedClassName} {...props} />
    );
};

export default Button;