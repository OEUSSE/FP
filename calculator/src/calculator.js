/**
 * @todo validar las operaciones con decimal.
 * @todo poner foco cuando los valores vienen desde el teclado.
 */

const display = document.querySelector('#display');
const displayOp = document.querySelector('.operation');
let initWithCero = false;
let inOperation = false; // Bandera para validar la no concatenación continua de operadores -> (8++5)
let thereIsDecimal = false;
const config = {
  specialKey: '/*-+±%'
}

function validation (tecla) {
  if (initWithCero) {
    if (config.specialKey.includes(tecla)) {
      display.value += tecla;
      initWithCero = !initWithCero;
      inOperation = true;
    } else if (tecla !== '0') {
      display.value = '';
      display.value += tecla;
      initWithCero = !initWithCero;
    }
  } else if (!initWithCero && !displayOp.value) {
    if (config.specialKey.includes(tecla) && inOperation) return false;
    else if (config.specialKey.includes(tecla) && !inOperation) {
      display.value += tecla;
      inOperation = true;
    } else {
      display.value += tecla;
      inOperation = false;
    }
  }
}

function inputFromCalculator(e) {
  const tecla = e.target.dataset.number;
  if (tecla === '=') {
    return getResultOperation(display.value);
  } else if (tecla === 'ac') {
    return deleteNumber();
  }
  validation(tecla);
}

function inputFromKeyboard(e) {
  e.preventDefault();
  const keyConfig = {
    Backspace: 'ac',
    Enter: '='
  }
  const tecla = e.key;
  const regex = /\b[0-9]|[/*+.%±=]|[-]|Backspace|Enter/g;
  if (regex.test(tecla)) {
    if (keyConfig[tecla] === '=') {
      return getResultOperation(display.value);
    } else if (keyConfig[tecla] === 'ac') {
      return deleteNumber();
    }
    validation(tecla)
  }
}

function getResultOperation(operation) {
  const result = eval(operation);
  const isValid = new Boolean(result); // si es uno no lo tome como valor falsy
  try {
    if (isValid) {
      displayOp.textContent = operation;
      display.value = result;
    }  
  } catch(e) { }
}

function deleteNumber() {
  if (!initWithCero) {
    display.value = display.value.slice(0, display.value.length - 1);
  }
  if (display.value.length === 0 || displayOp.textContent) {
    init();
  }
  inOperation = false;
}

function setFocus() {
  if (display.selectionStart || display.selectionStart == '0') {
    var elemLen = display.value.length;
    display.selectionStart = elemLen;
    display.selectionEnd = elemLen;
    display.focus();
  }
}

function init() {
  initWithCero = !initWithCero;
  initWithCero ? display.value = "0" : false;
  displayOp.textContent = '';
  display.focus();
}

init()

document.querySelectorAll('button').forEach((button) => button.addEventListener('mousedown', inputFromCalculator));
document.body.addEventListener('keydown', inputFromKeyboard);
display.addEventListener('focusout', setFocus);