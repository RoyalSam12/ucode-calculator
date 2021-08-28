class Calculator {
    constructor() {
        this.numberBtns = document.querySelectorAll('.number');
        this.operationBtns = document.querySelectorAll('.operation');
        this.outputHistory= document.querySelector('.output-history');
        this.outputCurrent = document.querySelector('.output-current')
        this.outputRessult = document.querySelector('.output-result')
        this.percent = document.querySelector('.percent')
        this.change = document.querySelector('.change')
        this.equalsBtn = document.querySelector('.equals');
        this.clearBtn = document.querySelector('.clear');
        this.changeBtn = document.querySelector('.change');
        this.result = 0;
        this.equation = ''
    };
    calculateEquation() {
        let array = this.equation.trim().split(' ')
        let operators = ['÷', '*', '-', '+'];
        for (let operator of operators) {
            while(array.includes(operator))  {
                let firstItem = parseFloat(array[array.indexOf(operator)-1]);
                let secondItem = parseFloat(array[array.indexOf(operator)+1]);
                let result;
                switch(operator) {
                    case '*':
                        result = parseFloat(firstItem * secondItem);
                        break;
                    case '÷':
                        result = parseFloat(firstItem / secondItem);
                        break;
                    case '-':
                        result = parseFloat(firstItem - secondItem);
                        break;
                    case '+':
                        result = parseFloat(firstItem + secondItem);
                        break;
                };
                array.splice(array.indexOf(operator) - 1, 1);
                array.splice(array.indexOf(operator) + 1, 1, result);
                array.splice(array.indexOf(operator), 1);
            };
        };
        this.outputCurrent.innerText = this.equation
        if (array[0] || array[0] == '0') {
            this.outputRessult.innerText = array[0]
        };
        return array[0]
    };
    clearCalculator() {
        this.equation = new String();
        this.calculateEquation();
        this.outputRessult.innerText = ''
    }
};

const calculator = new Calculator();
let allButton = document.querySelectorAll('button')

calculator.calculateEquation()
turnOnClick(true)


function calculatorClick() {
    let partOfHistory = document.createElement('p')
    partOfHistory.innerText = calculator.equation
    calculator.outputHistory.append(partOfHistory)
    calculator.clearCalculator()
    allButton.forEach((item) => {
        item.removeEventListener('click', calculatorClick)
    })
    calculator.outputRessult.classList.remove('bigger')
    turnOnClick(true)
}



function turnOnClick(bool) {
    if (bool) {
        calculator.numberBtns.forEach((item) => {
            item.onclick = function() {
                calculator.equation += item.innerText
                calculator.calculateEquation()
            };
        });
        
        calculator.operationBtns.forEach((item) => {
            item.onclick = function() {
                if (calculator.equation || calculator.equation[0] == '0') {
                    calculator.equation += ` ${item.innerText} `
                };
                if (['÷', '*', '-', '+'].includes(calculator.equation.slice(-5,-4))) {
                    calculator.equation = spliceSplit(
                        calculator.equation, calculator.equation.length - 5,
                        1, calculator.equation.slice(-2,-1)
                    );
                    calculator.equation = calculator.equation.slice(0,-3)
                };
                calculator.calculateEquation();
            };
        });

        calculator.clearBtn.onclick = function() {
            calculator.clearCalculator();
        };

        calculator.equalsBtn.onclick = function() {
            calculator.outputRessult.classList.add('bigger');
            turnOnClick(false);
            allButton.forEach((item) => {
                item.addEventListener('click', calculatorClick);
            });
        };

        calculator.change.onclick = function() {
            let tempArray = calculator.equation.split(' ')
            let lastElement = parseFloat(tempArray[tempArray.length-1])
            if (lastElement) {
                tempArray[tempArray.length-1] = -tempArray[tempArray.length-1]
                calculator.equation = tempArray.join(' ')
                calculator.calculateEquation();
            }
        }
        calculator.percent.onclick = function() {
            let tempArray = calculator.equation.split(' ')
            let lastElement = parseInt(tempArray[tempArray.length-1])
            if (lastElement) {
                let procented = (calculator.calculateEquation() + lastElement) / 100 * lastElement;
                tempArray[tempArray.length-1] = procented
                calculator.equation = tempArray.join(' ')
                calculator.calculateEquation();
            }
        }

    } else {
        calculator.numberBtns.forEach((item) => {
            item.onclick = function() {};
        });
        
        calculator.operationBtns.forEach((item) => {
            item.onclick = function() {};
        });

        calculator.clearBtn.onclick = function() {};

        calculator.equalsBtn.onclick = function() {};

        calculator.change.onclick = function() {};

        calculator.percent.onclick = function() {};
    };
};

function spliceSplit(str, index, count, add) {
    var ar = str.split('');
    ar.splice(index, count, add);
    return ar.join('');
  }


// ДЖС НЕ ТРОГАЙ
// Осталось пофиксить баги с + в конце в истории
// Любой символ после перегрузки
