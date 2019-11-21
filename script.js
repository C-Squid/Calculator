/*
This is a basic calculator - it does not display the working operation.
It cannot follow the Order of Operations (guided by user input)
This has bugs (e.g by dbl-clicking any of the operators
	or by adding a number on to the returned result.)
*/

//Var declarations
let displayValue = '';
let digitValue = [];
const operatorRegex = /[\*\-+^÷]/;

//DOM
const displayMain = document.querySelector('#display-main');
const zero = document.querySelector('#zero');
const change = document.querySelector('#change-sign');
change.addEventListener ('click', () => {
	displayValue = +displayValue * -1;
	displayMain.textContent = displayValue});

const del = document.querySelector('#del');
del.addEventListener ('click', () => delOp())
const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {displayValue = '';
	digitValue = [];
	displayMain.textContent = displayValue});

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
	digitValue.push(displayValue);
	calculate();
	equalize();});

const calcNum = Array.from(document.querySelectorAll('.calc-num'));
calcNum.forEach( num => num.addEventListener('click', () => addToDisplay(num)));

const calcOps = Array.from(document.querySelectorAll('.calc-op'));
calcOps.forEach( num => num.addEventListener('click', () => {
	if (displayValue.length == 0) {
		addToDisplay(zero);
	}
	addToDigit(num)}));


function addToDisplay(num) {
	const newValue = num.textContent;
	displayValue += newValue;
	displayMain.textContent = displayValue;
}

function addToDigit(num) {
	digitValue.push(displayValue);
	displayValue = '';
	const newValue = num.textContent;
	digitValue.push(newValue);
	if (digitValue.length > 2) calculate();	
}

function calcResult(input) {
	let op = input[1];
	let a = +input[0];
	let b = +input[2];
    return operate(op, a, b);
}

function calculate() {
        if (operatorRegex.test(digitValue[1]) && typeof(+digitValue[2] != NaN)) {
			let currentOperation = digitValue.splice(0,3);
			console.log(currentOperation)
            digitValue.unshift(calcResult(currentOperation));
		}
	}

function equalize() {
	displayValue = round2SigFigs(+digitValue[0]);
	displayMain.textContent = displayValue;
	digitValue = [];
}

function round2SigFigs(num) {
	return Math.round(num * 100) / 100;
}

function delOp() {
	displayValue = String(displayValue);
	if (displayValue.length >=1) {
		let tempArray = displayValue.split('');
		tempArray.pop();
		displayValue = tempArray.join('');
		displayMain.textContent = displayValue;
	}
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a*b;
}

function divide(a, b) {
	return a/b;
}

function power(a, b) {
	return a**b;
}

function operate(op, a, b) {
	let value = 0;
	switch (op) {
		case '+':
			value = add(a, b);
			break;
		case '-':
			value = subtract(a, b);
			break;
		case '*':
			value = multiply (a, b);
			break;
		case '÷':
			value = divide(a, b);
			break;
		case '^':
			value = power(a, b);
			break;

	}
	return value;
}

