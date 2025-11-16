import { Calculator } from "./modules/calculator.js"

export class CalculatorPage {
    result_calculator = document.getElementById("result-calculator");
    input_calculator = document.getElementById("input-calculator");
    display_calculator = document.getElementById("display-calculator");
    
    constructor() {
        this.calculatorObject = new Calculator();
        this.proceed = this.proceed.bind(this);

        this.input_calculator.addEventListener("input", this.inputValidator);
        this.input_calculator.addEventListener("keydown", this.keyEventValidator);
        this.result_calculator.addEventListener("click", this.proceed);
    }

    keyEventValidator = (event) => {
        const allowedKeys = ['Backspace', 'Enter', 'Delete', 'ArrowLeft', 'ArrowRight'];
        const pattern = /^[0-9+\-*/.^()]/;
        if (!allowedKeys.includes(event.key) && !pattern.test(event.key)) {
            event.preventDefault();
        }

        if (event.key == "Enter") {
            this.proceed();
        }
    }

    inputValidator = (event) => {
        const pattern = /^[0-9+\-*/.^()]/;
        event.target.value = event.target.value.replace(!pattern, "");
    }

    proceed() {
        let textContent = this.input_calculator.value;
        if (textContent.length > 0) {
            let result = this.calculatorObject.result(textContent);
            this.display_calculator.textContent = result;
        }
    }
}