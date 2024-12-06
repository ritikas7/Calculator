 let currentInput = "0";
        let previousInput = "";
        let operator = null;
        let justCalculated = false;

const resultDisplay = document.getElementById("result");


function updateDisplay() {
    if (operator && previousInput && !justCalculated) {
        resultDisplay.innerText = `${previousInput} ${operator} ${currentInput}`;
    } else {
        resultDisplay.innerText = currentInput;
    }
    
}

function clearDisplay() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    justCalculated = false;
    updateDisplay();
}

function inputDigit(digit) {
    if (justCalculated) {
        currentInput = digit.toString();
        justCalculated = false;
    } else {
        currentInput = currentInput === "0" ? digit.toString() : currentInput + digit;
    }
    updateDisplay();
}

function input00() {
    if (currentInput !== "0" && currentInput !== "00") {
        if (justCalculated) {
            currentInput = "00";
            justCalculated = false;
        } else {
            currentInput += "00";
        }
    }
    updateDisplay();
}

function inputDecimal() {
    if (justCalculated) {
        currentInput = "0.";
        justCalculated = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }
    updateDisplay();
}

function inputOperation(op) {
    if (operator && previousInput && !justCalculated) {
        operator = op;
    } else {
        if (previousInput === "") {
            previousInput = currentInput;
        } else if (!justCalculated) {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = "0";
    }
    justCalculated = false;
    updateDisplay();
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || (isNaN(current) && operator !== "%")) return;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        case "%":
            result = currentInput !== "0" ? (current / 100) * prev : prev / 100;
            break;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = "";
    justCalculated = true;
    updateDisplay();
}

function backspace() {
    if (justCalculated) {
        currentInput = "0";
        justCalculated = false;
    } else if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
    updateDisplay();
}

document.addEventListener("keydown", (event) => {
    if (!isNaN(event.key)) {
        inputDigit(event.key);
    } else if (event.key === ".") {
        inputDecimal();
    } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        inputOperation(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    } else if (event.key === "Backspace") {
        backspace();
    } else if (event.key === "%") {
        inputOperation("%");
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});
