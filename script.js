let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

const calculator = document.getElementById('calculator');
const currentOperationElement = document.querySelector('.current-operation');
const previousOperationElement = document.querySelector('.previous-operation');
const glowEffect = document.querySelector('.glow-effect');

// Mouse tracking effect
calculator.addEventListener('mousemove', (e) => {
  const rect = calculator.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  requestAnimationFrame(() => {
    glowEffect.style.left = `${x}px`;
    glowEffect.style.top = `${y}px`;
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (/^[0-9]$/.test(e.key)) {
    handleNumber(e.key);
  } else if (e.key === '.') {
    handleNumber('.');
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    handleOperation(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    handleEqual();
  } else if (e.key === 'Escape') {
    handleClear();
  } else if (e.key === 'Backspace') {
    handleBackspace();
  } else if (e.key === '%') {
    handlePercent();
  }
});

function updateDisplay() {
  currentOperationElement.textContent = currentValue;
  previousOperationElement.textContent = previousValue ? `${previousValue} ${operation || ''}` : '';
}

function handleNumber(number) {
  if (shouldResetDisplay) {
    currentValue = number;
    shouldResetDisplay = false;
  } else {
    if (currentValue === '0' && number !== '.') {
      currentValue = number;
    } else if (number === '.' && currentValue.includes('.')) {
      return;
    } else {
      currentValue += number;
    }
  }
  updateDisplay();
}

function handleOperation(op) {
  if (previousValue && operation && !shouldResetDisplay) {
    calculateResult();
  }
  
  previousValue = currentValue;
  operation = op;
  shouldResetDisplay = true;
  updateDisplay();
}

function handleEqual() {
  if (!operation || !previousValue) return;
  calculateResult();
  operation = null;
  previousValue = '';
  updateDisplay();
}

function calculateResult() {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result = 0;

  switch (operation) {
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
        currentValue = 'Error';
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentValue = parseFloat(result.toFixed(10)).toString();
  shouldResetDisplay = true;
}

function handleClear() {
  currentValue = '0';
  previousValue = '';
  operation = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function handleBackspace() {
  if (currentValue.length === 1 || (currentValue.length === 2 && currentValue.startsWith('-'))) {
    currentValue = '0';
  } else {
    currentValue = currentValue.slice(0, -1);
  }
  updateDisplay();
}

function handlePercent() {
  currentValue = String(parseFloat(currentValue) / 100);
  updateDisplay();
}

function handleToggleSign() {
  currentValue = String(-parseFloat(currentValue));
  updateDisplay();
}