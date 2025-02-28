document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    const buttons = document.querySelectorAll('.buttons button');
  
    let currentInput = '';
    let operator = null;
    let firstOperand = null;
    let secondOperand = null;
    let shouldResetDisplay = false;
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.textContent;
  
        if (button.classList.contains('number')) {
          handleNumber(value);
        } else if (button.classList.contains('operator')) {
          handleOperator(value);
        } else if (button.classList.contains('decimal')) {
          handleDecimal();
        } else if (button.classList.contains('equals')) {
          handleEquals();
        } else if (button.classList.contains('clear')) {
          handleClear();
        } else if (button.classList.contains('delete')) {
          handleDelete();
        }
    });
});
  
function handleNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    currentInput += number;
    updateDisplay();
}
  
function handleOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        handleEquals();
    }
    firstOperand = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;
}
  
function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}
  
function handleEquals() {
    if (operator === null || shouldResetDisplay) {
        return;
    }
    secondOperand = parseFloat(currentInput);
    let result = calculate(firstOperand, secondOperand, operator);
  
    // Handle division by zero
    if (result === Infinity || isNaN(result)) {
        result = 'Error';
    } else {
        result = parseFloat(result.toFixed(10)); 
    }
  
    currentInput = result.toString();
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}
  
function calculate(num1, num2, op) {
    
    if (op === '+') {
        return num1 + num2;
    } else if (op === '-') {
        return num1 - num2;
    } else if (op === '*') {
        return num1 * num2;
    } else if (op === '/') {
        return num1 / num2;
    }

    return num2; 
}
  
function handleClear() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    secondOperand = null;
    shouldResetDisplay = false;
    updateDisplay();
}
  
function handleDelete() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}
  
function updateDisplay() {
        display.value = currentInput || '0';
    }
});
