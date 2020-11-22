import React from 'react'

const Error = (props) => {
    const { error } = props;
    return (
        <div className="error">
            <p>{error}</p>
        </div>
    )
}

export default Error; 