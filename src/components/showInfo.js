import React from 'react';

const Info = (props) => {
    const { city, temp } = props;
    return (
        <div className="info">
            <p>In the city of {city}</p>
            <p>The temperature feels like :{temp}</p>
        </div>
    )
}

export default Info; 