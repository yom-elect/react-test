import React, {useState} from 'react';
import './Counter.css';

const Counter = () => {
    const [counterValue, setCounterValue] = useState(0);
    const [inputValue, setInputValue] = useState(1);

    return (
        <div>
            <h3 data-testid="header">My Counter</h3>
            <h2 data-testid="counter">{counterValue}</h2>
            <button data-testid="sub-btn" onClick={()=> setCounterValue(parseInt(counterValue - inputValue))}>-</button>
            <input 
            data-testid="input" 
            type="number" 
            value={inputValue}
            className="text-center"
            onChange={(e)=> setInputValue(parseInt(e.target.value))}
            />
            <button data-testid="add-btn" onClick={()=> setCounterValue(parseInt(counterValue + inputValue))}>+</button>
        </div>
    );
}

export default Counter;