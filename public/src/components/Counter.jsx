import React, { useState, useRef } from 'react';

const Counter = () => {
  const [counterValue, setCounterValue] = useState(1);
  const [yOffsets, setYOffsets] = useState([0, 100]);

  const counterRef = useRef(null);
  const incrementBtnRef = useRef(null);
  const decrementBtnRef = useRef(null);
  const inputRef = useRef(null);
  const valueElsRef = useRef([null, null]);

  const setCSSVariable = (element, name, value) => {
    element.style.setProperty(name, value);
  };

  const update = (origin = 'bottom') => {
    const activeIndex = yOffsets.indexOf(0);
    const inactiveIndex = yOffsets.indexOf(100);

    const inactiveIndexElement = valueElsRef.current[inactiveIndex];
    const inputElement = inputRef.current;

    inactiveIndexElement.textContent = counterValue;
    inputElement.value = counterValue;

    setCSSVariable(counterRef.current, '--transition-speed', '0s');
    setCSSVariable(
      inactiveIndexElement,
      '--y-offset',
      origin === 'bottom' ? '100%' : '-100%'
    );

    setTimeout(() => {
      setCSSVariable(counterRef.current, '--transition-speed', '0.6s');
      setCSSVariable(
        valueElsRef.current[activeIndex],
        '--y-offset',
        origin === 'bottom' ? '-100%' : '100%'
      );
      setCSSVariable(valueElsRef.current[inactiveIndex], '--y-offset', '0%');
    }, 0);

    setYOffsets(prevOffsets => prevOffsets.reverse());
  };

  const incrementCounter = () => {
    console.log(counterValue)
    setCounterValue(prevValue => prevValue + 1);
    update('top');
  };

  const decrementCounter = () => {
    if (counterValue === 1) return
    setCounterValue(prevValue => prevValue - 1);
    update('bottom');
  };

  const handleInputChange = e => {
    const value = e.target.value !== '' ? parseInt(e.target.value) : counterValue;
    setCounterValue(value);

    const activeIndex = yOffsets.indexOf(0);
    const activeIndexElement = valueElsRef.current[activeIndex];
    activeIndexElement.textContent = value;
  };
  return (
    <div data-counter ref={counterRef}>
      <button data-counter-decrement ref={decrementBtnRef} onClick={decrementCounter}>
        -
      </button>

      <div data-value-container>
        <input
          type="number"
          data-value-input
          ref={inputRef}
          value={counterValue}
          onChange={handleInputChange}
        />
        <span data-value-one ref={el => (valueElsRef.current[0] = el)}>
          {counterValue}
        </span>
        <span
          data-value-two
          ref={el => (valueElsRef.current[1] = el)}
          style={{ '--y-offset': yOffsets[1], }}
        >
          {counterValue}
        </span>
      </div>

      <button data-counter-increment ref={incrementBtnRef} onClick={incrementCounter}>
        +
      </button>
    </div>
  );
};

export default Counter;
