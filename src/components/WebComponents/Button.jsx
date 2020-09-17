import React from 'react'

const Button = (props) => {

    return (
        <div {...props}>
            {props.value}
        </div>
    )
}

export default Button
