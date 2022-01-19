import React, { useState } from 'react';
import AppHeader from './AppHeader';
import Input from './Input';
import Button from './Button';
import AppFooter from './AppFooter';

const Calculator = () => {
    const [inputVal, setInputVal] = useState('');
    const [err, setErr] = useState('');
    let arithmeticOps = ['+', '-', '*', '/'];

    const handleChange = (e) => {
        setInputVal(e.target.value);
        setErr('');
    }

    const isArithmeticOp = (str, ops) => {
        for (let x = 0; x < ops.length; x++) {
            let op = ops[x];
            if (str.indexOf(op) > -1) return true;
        }

        return false;
    }

    const compute = () => {
        let nums = [];
        let ops = [];
        let stack = [];
        let inputStr = inputVal.split(',');

        for (let x = 0; x < inputStr.length; x++) {
            if (!isArithmeticOp(inputStr[x], ['+', '-', '*', '/'])) {
                nums.push(parseFloat(inputStr[x].toString()));
            } else {
                ops.push(inputStr[x]);
            }
        }

        if (ops.length + 1 === nums.length) {
            for (let y = 0; y < inputStr.length; y++) {
                if (!isNaN(inputStr[y])) {
                    stack.push(inputStr[y]);
                } else if (arithmeticOps) {
                    let i = stack.pop();
                    let j = stack.pop();

                    switch (inputStr[y]) {
                        case '+': 
                            stack.push(parseFloat(i) + parseFloat(j));
                            break;
                        case '-': 
                            stack.push(parseFloat(i) - parseFloat(j));
                            break;
                        case '*': 
                            stack.push(parseFloat(i) * parseFloat(j));
                            break;
                        case '/': 
                            stack.push(parseFloat(i) / parseFloat(j));
                            break;
                        default: 
                            break;
                    }
                }
            }

            let result = stack.pop();
            setInputVal(`${inputVal} = ${result}`);

            if (inputVal === '') {
                setErr('You did not enter anything!');
                setInputVal(inputVal);
            } else if (inputVal.match(/[a-z =()]/)) {
                setErr('Only numbers and arithmetic operators are valid!');
                setInputVal(inputVal);
            }
        } else if (ops.length >= nums.length) {
            return setErr('Something went wrong! Check number of OPERATORS!');
        } else {
            setErr('Something went wrong! Check the number of OPERANDS!');
        }
    }
     
    const handleClear = () => {
        setInputVal('');
        setErr('');
    }

    return (
        <div className="calculator">
            <AppHeader />
            <div className="input-buttons">
                <Input inputVal={inputVal} handleChange={handleChange} />
                <Button compute={compute} handleClear={handleClear} />
            </div>
            <div className="errors">
                <p>{err}</p>
            </div>
            <AppFooter />
        </div>
    );
}

export default Calculator;
