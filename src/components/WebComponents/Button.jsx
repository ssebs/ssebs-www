import React from 'react'

const Button = (props) => {
    const {variant, ...otherProps} = props
    const variantClass = variant === "primary" ? "btn btn-primary" : "btn btn-secondary";

    return (
        <button {...otherProps} className={variantClass}>
            {props.children}
        </button>
    )
}

export default Button
