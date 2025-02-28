document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    const buttons = document.querySelectorAll('.buttons button');
  
    let currentInput = '';
    let operator = null;
    let firstOperand = null;
    let secondOperand = null;
    let shouldResetDisplay = false;
  
    // Add event listeners to all buttons
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
  
// Handle decimal button click
function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}
  
// Handle equals button click
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
        result = parseFloat(result.toFixed(10)); // Limit decimal places
    }
  
    currentInput = result.toString();
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}
  
// Perform calculations
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

    return num2; //Default 
}
  
// Handle clear button click
function handleClear() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    secondOperand = null;
    shouldResetDisplay = false;
    updateDisplay();
}
  
// Handle delete button click
function handleDelete() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}
  
// Update the display
function updateDisplay() {
        display.value = currentInput || '0';
    }
});