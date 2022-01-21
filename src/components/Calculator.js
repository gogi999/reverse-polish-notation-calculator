import React, { useState } from 'react';
import AppHeader from './AppHeader';
import Input from './Input';
import Button from './Button';
import AppFooter from './AppFooter';

const Calculator = () => {
    const [inputVal, setInputVal] = useState('');
    const [err, setErr] = useState('');

    const handleChange = (e) => {
        setInputVal(e.target.value);
        setErr('');
    }
    
    const handleClear = () => {
        setInputVal('');
        setErr('');
    }
    
    const rpnCalc = (newExpression) => {
        let expression = newExpression.split(',');
        let stack = [];
        let numCount = 0;
        let opsCount = 0;
        for (let i = 0; i < expression.length; i++) {
            if (!isNaN(expression[i]) && isFinite(expression[i])) {
                stack.push(expression[i]);
                numCount++;
            } else {
                opsCount++;
                let a = stack.pop();
                let b = stack.pop();
                if (expression[i] === '+') {
                    stack.push((parseFloat(a) + parseFloat(b)).toFixed(2));
                } else if (expression[i] === '-') {
                    stack.push((parseFloat(a) - parseFloat(b)).toFixed(2));
                } else if (expression[i] === '*') {
                    stack.push((parseFloat(a) * parseFloat(b)).toFixed(2));
                } else if (expression[i] === '/') {
                    stack.push((parseFloat(a) / parseFloat(b)).toFixed(2));
                }
            }
        }

        if (inputVal === '') {
            return setErr('You did not enter anything!');
        }

        if (numCount === opsCount + 1 
            && newExpression !== '' 
            && stack[0] !== undefined) {
            setErr('')
            setInputVal(inputVal + ' = ' + stack[0]);
        }else if (inputVal.match(/[a-z=()]/)) {
            setErr('Only numbers and arithmetic operators are valid!');
            setInputVal('');
        } else if (numCount <= opsCount) {
            setErr('Something went wrong! Check the number of OPERATORS!');
        } else if (numCount >= opsCount - 2) {
            setErr('Something went wrong! Check the number of OPERANDS!');
        }
    }

    return (
        <div className="calculator">
            <AppHeader />
            <div className="input-buttons">
                <Input inputVal={inputVal} handleChange={handleChange} />
                <Button inputVal={inputVal} rpnCalc={rpnCalc} handleClear={handleClear} />
            </div>
            <div className="errors">
                <p>{err}</p>
            </div>
            <AppFooter />
        </div>
    );
}

export default Calculator;
