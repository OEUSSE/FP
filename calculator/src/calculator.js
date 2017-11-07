/**
 * @todo poner foco cuando los valores vienen desde el teclado.
 * @todo Si se quiere hacer una operación con el resultado de una previa operación, al momento de 
 * eliminar no se puede eliminar todo.
 */

const display = document.querySelector('#display');
const displayOp = document.querySelector('.operation');
const config = { specialKey: '/*-.+±%' };
let initWithCero = false;
let inOperation = false; // Bandera para validar la no concatenación continua de operadores -> (8++5)
let thereIsDecimal = false;

function validation (key) {
  if (initWithCero) {
    if (config.specialKey.includes(key)) {
      display.value += key;
      initWithCero = !initWithCero;
      inOperation = true;
    } 
    else if (key !== '0') {      
      display.value = '';
      display.value += key;
      initWithCero = !initWithCero;
    }
  } 
  else if (!initWithCero && !displayOp.value) {
    if (config.specialKey.includes(key) && inOperation) return false;
    else if (config.specialKey.includes(key) && !inOperation) {
      display.value += key;
      inOperation = true;
    }
    else {
      display.value += key;
      inOperation = false;
    }
  }
}

function inputFromCalculator(e) {
  const key = e.target.dataset.number;
  if (key === '=') {
    return getResultOperation(display.value);
  } else if (key === 'ac') {
    return deleteNumber();
  }
  validation(key);
}

function inputFromKeyboard(e) {
  e.preventDefault();
  const keyConfig = { Backspace: 'ac', Enter: '=' };
  const key = e.key;
  const regex = /\b[0-9]|[/*+.%±=]|[-]|Backspace|Enter/g;
  if (regex.test(key)) {
    if (keyConfig[key] === '=') {
      return getResultOperation(display.value);
    } else if (keyConfig[key] === 'ac') {
      return deleteNumber();
    }
    validation(key)
  }
}

function getResultOperation(operation) {
  let result = eval(operation);

  if (result % 1 !== 0)
    result = result.toFixed(2);

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