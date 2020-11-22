import React from 'react';

const Info = (props) => {
    const { city, temp, country, hours, minutes, source, desc } = props;
    return (
        <div className="info">
            <div className="city"><h3>Time in {city} ({country})</h3></div>
            <div className="time-icon">
                <p>{hours}:{minutes}</p>
                <img src={source} />
                <div className="desc"><p>{desc}</p></div>
            </div>
            <div className="temp">
                <h2>{temp}°</h2>

            </div>
            <div className="desc"></div>
        </div>
    )
}

export default Info; 