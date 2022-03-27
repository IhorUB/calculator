(function () {

  class Calculator {
    constructor(previousOperandEl, currentOperandEl) {
      this.previousOperandEl = previousOperandEl;
      this.currentOperandEl = currentOperandEl;

      this.clear();
    }

    clear() {
      this.previousOperand = '';
      this.currentOperand = '';
      this.operation = undefined;
    }

    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.operation !== '') this.compute();

      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }

    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);

      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '/':
          computation = prev / current;
          break;
        default:
          return;
      }

      this.currentOperand = computation;
      this.previousOperand = '';
      this.operation = undefined;
    }

    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const demicalDigits = stringNumber.split('.')[1];
      let integerDisplay;

      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
      }

      if (demicalDigits != null) {
        return `${integerDisplay}.${demicalDigits}`;
      } else {
        return integerDisplay;
      }
    }

    updateDisplay() {
      this.currentOperandEl.innerText = this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
        this.previousOperandEl.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandEl.innerText = '';
      }
    }
  }

  const numberBtns = document.querySelectorAll('[data-number]');
  const operationBtns = document.querySelectorAll('[data-operation]');
  const equalBtn = document.querySelector('[data-equals]');
  const deleteBtn = document.querySelector('[data-delete]');
  const clearBtn = document.querySelector('[data-all-clear]');
  const previousOperandEl = document.querySelector('[data-previous-operand]');
  const currentOperandEl = document.querySelector('[data-current-operand]');

  const calculator = new Calculator(previousOperandEl, currentOperandEl);

  numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calculator.appendNumber(btn.innerText);
      calculator.updateDisplay();
    });
  });

  operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calculator.chooseOperation(btn.innerText);
      calculator.updateDisplay();
    });
  });

  equalBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });

  clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  });

})();