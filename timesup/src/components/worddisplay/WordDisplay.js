import React from 'react';

const WordDisplay = ({ word }) => {
    return (
        <div className="word-display">
            <h2>{word}</h2>
        </div>
    );
};

export default WordDisplay;