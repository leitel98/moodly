import React from 'react'
import ButtonProps from '../../../types/propTypes'

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
