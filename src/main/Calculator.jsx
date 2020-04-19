import React, { useState } from 'react'
import './Calculator.css'

import Button from '../components/button/Button'
import Display from '../components/display/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default () => {
    
    const [displayValue, setDisplayValue] = useState(initialState.displayValue)
    const [clearDisplay, setClearDisplay] = useState(initialState.clearDisplay)
    const [operation, setOperation] = useState(initialState.operation)
    const [values, setValues] = useState(initialState.values)
    const [current, setCurrent] = useState(initialState.current)

    function clearMemory() {
        setDisplayValue('0')
        setClearDisplay(false)
        setOperation(null)
        setValues([0, 0])
        setCurrent(0)
    }

    function setOp(op) {
        if(current === 0) {
            setOperation(op)
            setCurrent(1)
            setClearDisplay(true)
        } else {
            const equals = op === '='
            const currentOp = operation

            const v = [...values]
            
            switch(currentOp) {
                case '+':
                    v[0] = v[0] + v[1]
                break
                case '-':
                    v[0] = v[0] - v[1]
                break
                case '*':
                    v[0] = v[0] * v[1]
                break
                case '/':
                    v[0] = v[0] / v[1]
                break
                default:
                    v[0] = values[0]
            }

            v[1] = 0

            setDisplayValue(v[0])
            setOperation(equals ? null : op)
            setCurrent(equals ? 0 : 1)
            setClearDisplay(!equals)
            setValues(v)

        }
    }

    function addDigit(n) {
        if(n === '.' && String(displayValue).includes('.')) {
            return;
        }
        
        const clear = displayValue === '0' || clearDisplay

        const currentValue = clear ? '' : displayValue
        const display = currentValue + n

        setDisplayValue(display)
        setClearDisplay(false)

        if(n !== '.') {
            const i = current
            const newValue = parseFloat(display)
            const v = [...values]
            v[i] = newValue
            setValues(v)
        }


    }
    
    return (
        <React.StrictMode>

            <div className="calculator">
                <Display value={displayValue} />
                <Button label="AC" triple click={clearMemory} />
                <Button label="/" operation click={setOp} />
                <Button label="7" click={addDigit} />
                <Button label="8" click={addDigit} />
                <Button label="9" click={addDigit} />
                <Button label="*" operation click={setOp} />
                <Button label="4" click={addDigit} />
                <Button label="5" click={addDigit} />
                <Button label="6" click={addDigit} />
                <Button label="-" operation click={setOp} />
                <Button label="1" click={addDigit} />
                <Button label="2" click={addDigit} />
                <Button label="3" click={addDigit} />
                <Button label="+" operation click={setOp} />
                <Button label="0" double click={addDigit} />
                <Button label="." click={addDigit} />
                <Button label="=" operation click={setOp} />
            </div>
            
        </React.StrictMode>
    )
}