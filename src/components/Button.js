import React from 'react'

const Button = ({ inputVal, rpnCalc, handleClear }) => {
    return (
        <div className="buttons">
            <button className="compute" onClick={() => handleClear()}>
                Clear
            </button>
            <button className="compute" onClick={() => rpnCalc(inputVal)}>
                Compute
            </button>
        </div>
    );
}

export default Button;
