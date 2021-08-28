class Calculator {
    constructor() {
        this.numberBtns = document.querySelectorAll('.number');
        this.operationBtns = document.querySelectorAll('.operation');
        this.equalsBtn = document.querySelector('.equals');
        this.clearBtn = document.querySelector('.clear');
        this.changeBtn = document.querySelector('.change');
        this.result = 0;
        this.equation = new String()
    };

};

const calculator = new Calculator();
