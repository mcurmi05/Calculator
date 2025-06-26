function add(x,y){
    return x+y
}

function subtract(x,y){
    return x-y
}   

function multiply(x,y){
    return x*y
}   

function divide(x,y){
    if (y === 0) {
        return "Infinity";
    }
    return x/y;
}

function operate(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case 'x':
            return multiply(x, y);
        case '/':
            return divide(x, y);
        default:
            return "Error: Invalid operator";
    }
}

//numberButtons = 1,2,3,4,5,6,7,8,9,0 AND decimal point .
//operatorButtons = +,-,*,/


const numberButtons = document.querySelectorAll('.number');

const operatorButtons = document.querySelectorAll('.operator');

const inputDisplay = document.querySelector('#input-display');
const outputDisplay = document.querySelector('#output-display');

const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#backspace');
const negateButton = document.querySelector('#negate');
const decimalButton = document.querySelector('#decimal');
const equalsButton = document.querySelector('#equals');

let currentInput = '';
let negativeSymbol = '−';

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput === '0'){
            currentInput = '';
        }
        currentInput += button.textContent;
        inputDisplay.textContent = currentInput;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(outputDisplay.textContent) {
            currentInput = outputDisplay.textContent;
            inputDisplay.textContent = outputDisplay.textContent;
        }
        
        if (currentInput && (!/[+\-/x]/.test(currentInput))) {
            currentInput += button.textContent;
            inputDisplay.textContent = currentInput;
        }
    });
});

clearButton.addEventListener('click', () => {
    currentInput = '';
    inputDisplay.textContent = '';
    outputDisplay.textContent = '';
});

deleteButton.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    inputDisplay.textContent = currentInput || '';
});

negateButton.addEventListener('click', () => {
    if (!currentInput) return;
    if (/[+\-/x]$/.test(currentInput)) return;

    const operatorMatch = currentInput.match(/[+\-/x]/);
    const negativeMatch = currentInput.includes(negativeSymbol);

    //If its just a non negative number
    if (!operatorMatch && !negativeMatch) {
        if (!isNaN(parseFloat(currentInput))) {
            currentInput = negativeSymbol + currentInput;
            inputDisplay.textContent = currentInput;
        }
    //If its just a negative number
    } else if (!operatorMatch && negativeMatch) {
        currentInput = currentInput.replace(negativeSymbol, '');
        inputDisplay.textContent = currentInput || '0';
    //If its a number with an operator
    } else  if (operatorMatch) {

       const parts = currentInput.split(/[+\-/x]/);
       const lastPart = parts[parts.length - 1];

       if (lastPart.includes(negativeSymbol)) {
            parts[parts.length - 1] = lastPart.replace(negativeSymbol, '');
        } else {
            parts[parts.length - 1] = negativeSymbol + lastPart;
        }
        currentInput = parts.join(operatorMatch[0]);
        inputDisplay.textContent = currentInput;    

    }
});

decimalButton.addEventListener('click', () => {
    const parts = currentInput.split(/[+\-/x]/);
    const lastPart = parts[parts.length - 1];

    if (!lastPart.includes('.')) {
        if (lastPart === '') {
            currentInput += '0.';
        } else {
            currentInput += '.';
        }1
        inputDisplay.textContent = currentInput;
    }
});

equalsButton.addEventListener('click', () => {  

    if(currentInput.endsWith(negativeSymbol) || /[+\-/x]$/.test(currentInput)) {
        return;
    }

    const operatorMatch = currentInput.match(/[+\-/x]/);
    if (!operatorMatch){
        outputDisplay.textContent = currentInput;
    };

    const operator = operatorMatch[0];
    const operatorIndex = currentInput.indexOf(operator);

    let firstNumStr = currentInput.slice(0, operatorIndex);
    let secondNumStr = currentInput.slice(operatorIndex + 1);

    firstNumStr = firstNumStr.replace(negativeSymbol, '-');
    secondNumStr = secondNumStr.replace(negativeSymbol, '-');

    const x = parseFloat(firstNumStr);
    const y = parseFloat(secondNumStr);

    let result = operate(operator, x, y);
    if (typeof result === "number" && !Number.isInteger(result)) {
        result = parseFloat(result.toFixed(10));
    }
    outputDisplay.textContent = result;
    
});  




