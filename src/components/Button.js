import React from 'react'

const Button = ({ compute, handleClear }) => {
    return (
        <div className="buttons">
            <button className="compute" onClick={() => handleClear()}>
                Clear
            </button>
            <button className="compute" onClick={() => compute()}>
                Compute
            </button>
        </div>
    );
}

export default Button;
