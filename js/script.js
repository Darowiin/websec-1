const btn = document.getElementById("calculate-button");
const firstNumInput = document.getElementById("firstNumber");
const secondNumInput = document.getElementById("secondNumber");
const opSelect = document.getElementById("operator");
const resultBox = document.getElementById("result-box");

const errFirstNum = document.getElementById("error-firstNumber");
const errSecondNum = document.getElementById("error-secondNumber");

let history = [];

btn.addEventListener("click", function() {
    resetErrors();

    const val1 = firstNumInput.value.trim().replace(',', '.');
    const val2 = secondNumInput.value.trim().replace(',', '.');
    const op = opSelect.value;

    let hasError = false;

    if (val1 === "" || isNaN(Number(val1))) {
        showError(firstNumInput, errFirstNum, "Введите корректное число");
        hasError = true;
    }

    if (val2 === "" || isNaN(Number(val2))) {
        showError(secondNumInput, errSecondNum, "Введите корректное число");
        hasError = true;
    }

    if (op === "/" && Number(val2) === 0) {
        showError(secondNumInput, errSecondNum, "Деление на ноль!");
        hasError = true;
    }

    if (hasError) return;

    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);
    let result;

    switch(op) {
        case "+": result = n1 + n2; break;
        case "-": result = n1 - n2; break;
        case "*": result = n1 * n2; break;
        case "/": result = n1 / n2; break;
    }

    result = parseFloat(result.toFixed(4)); 

    const operationString = `${n1} ${op} ${n2} = ${result}`;
    history.push(operationString);

    if (history.length > 3) {
        history.shift(); 
    }

    renderResults();
});

function renderResults() {
    resultBox.innerHTML = "";
    
    history.forEach((item, index) => {
        const p = document.createElement("p");
        p.textContent = item;
        
        if (index === history.length - 1) {
            p.classList.add("current-item");
        } else {
            p.classList.add("history-item");
        }
        
        resultBox.appendChild(p);
    });
}

function showError(inputElement, errorElement, message) {
    inputElement.classList.add("input-error");
    errorElement.textContent = message;
    errorElement.classList.add("show-error");
}

function resetErrors() {
    firstNumInput.classList.remove("input-error");
    secondNumInput.classList.remove("input-error");
    errFirstNum.classList.remove("show-error");
    errSecondNum.classList.remove("show-error");
}