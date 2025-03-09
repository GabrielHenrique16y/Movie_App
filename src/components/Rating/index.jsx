import React from 'react';

const Rating = ({ rating }) => {
    return (
        <div className="rating">
            <div className="stars">
                ★★★★★
                <span
                    className="overlay"
                    style={{ width: `${(rating / 10) * 100}%` }}
                >
                    ★★★★★
                </span>
            </div>
            <span className="score">{rating.toFixed(1)}</span>
        </div>
    );
};

export default Rating;
