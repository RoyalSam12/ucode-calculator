class Calculator {
    constructor() {
        this.numberBtns = document.querySelectorAll('.number');
        this.operationBtns = document.querySelectorAll('.operation');
        this.outputCurrent = document.querySelector('.output-current')
        this.outputRessult = document.querySelector('.output-result')
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
        if (array[0]) {
            this.outputRessult.innerText = array[0]
        };
    };
};

const calculator = new Calculator();

calculator.calculateEquation()

calculator.numberBtns.forEach((item) => {
    item.onclick = function() {
        calculator.equation += item.innerText
        calculator.calculateEquation()
    };
})

calculator.operationBtns.forEach((item) => {
    item.onclick = function() {
        calculator.equation += ` ${item.innerText} `
        calculator.calculateEquation()
    };
})
