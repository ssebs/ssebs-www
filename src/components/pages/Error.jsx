import React from 'react'
import { useRouteError } from 'react-router'

const Error = ({ message }) => {
    const err = useRouteError();
    console.error(err);

    return (
        <div>
            <div>Error: {message}</div>
            <p>
                <i>{err.statusText || err.message}</i>
            </p>
        </div>
    )
}

export default Error