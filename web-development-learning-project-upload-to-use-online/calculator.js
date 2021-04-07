function init() {
    document.querySelector(".container").addEventListener("click", function (event) {
        buttonClick(event.target.innerText);
    });
}

init();

// Ver 1

let total = 0;
let buffer = "0";
let tempBuffer = 0;
let operator;
let negative = false;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    // re-render
    screen.innerText = tempBuffer;
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            total = 0;
            buffer = "0";
            tempBuffer = buffer;
            break;
        case "=":
            if (operator === null) {
                return;
            } else {
                intBuffer = parseInt(buffer);
                handleMath(operator);
            }
            operator = null;
            buffer = total;
            tempBuffer = buffer;
            total = 0;
            break;
        case "+":
        case "-":
        case "÷":
        case "×":
            console.log(value);
            handleOperator(value);
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
                tempBuffer = buffer;
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
                tempBuffer = buffer;
            }
            break;
    }
}

function handleNumber(value) {
    if (buffer === "0" || (total === 0 && operator === null)) {
        if (negative === true) {
            buffer = -value;
            tempBuffer = buffer;
            negative = false;
        } else {
            buffer = value;
            tempBuffer = buffer;
        }
    } else {
        buffer += value;
        tempBuffer = buffer;
    }
}

function handleOperator(value) {
    if (buffer === "0") {
        if (value === "-") {
            negative = true;
        }
        return;
    }
    intBuffer = parseInt(buffer);

    if (total === 0) {
        total = intBuffer;
    } else {
        handleMath(operator);
    }
    // for next calculator
    operator = value;
    // reset buffer after when operator buttons were clicked
    tempBuffer = total;
    buffer = "0";
}

function handleMath(operator) {
    if (operator === "+") {
        total += intBuffer;
    } else if (operator === "-") {
        total -= intBuffer;
    } else if (operator === "×") {
        total *= intBuffer;
    } else {
        total /= intBuffer;
    }
}