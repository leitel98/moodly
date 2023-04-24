import { ButtonProps } from '<leitel>/types/propTypes';
import React from 'react'

const Button = ({ title, type, disabled, cls, onClick }: ButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={cls}
        >
            {disabled ? 'Processing...' : title}
        </button>
    )
}

export default Button;
