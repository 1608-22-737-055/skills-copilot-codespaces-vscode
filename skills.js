class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.historyList = document.getElementById('history-list');
        this.history = [];
        this.clear();
    }

    clear() {
        this.display.value = '';
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    setOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.display.value = "Error";
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        this.addToHistory(`${this.previousOperand} ${this.operation} ${this.currentOperand} = ${result}`);
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = `${this.previousOperand} ${this.operation || ''} ${this.currentOperand}`;
    }

    addToHistory(entry) {
        this.history.unshift(entry);
        if (this.history.length > 10) {
            this.history.pop();
        }
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        this.history.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            this.historyList.appendChild(li);
        });
    }

    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }
}

const calculator = new Calculator();

function appendNumber(number) {
    calculator.appendNumber(number);
}

function setOperation(operation) {
    calculator.setOperation(operation);
}

function calculate() {
    calculator.calculate();
}

function clearDisplay() {
    calculator.clear();
}

function clearHistory() {
    calculator.clearHistory();
}