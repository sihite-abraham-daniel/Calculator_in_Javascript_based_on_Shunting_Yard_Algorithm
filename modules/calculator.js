export class Calculator {
    tokens = [];
    expression = ""

    // constructor() {}

    static isNumber(token) {
        if (token == null && token.trim() == "") return false;
        return !isNaN(token);
    }

    static isInteger(token) {
        if (this.isNumber(token)) {
            return parseFloat(token) % 1 == 0;
        }

        throw console.error("Invalid Number: ", token);
    }

    result(expression) {
        this.expression = expression

        this.tokenizer();
        this.parser();

        return this.evaluator();
    }

    tokenizer() {
        console.log("Initial expression: ", this.expression)
        this.tokens = this.expression.match(/\d+(?:\.\d+)?|[+\-*/^()]/g);
    }

    parser() {
        console.log("Parsing...")
        // Evaluate the Postfix Array
        let operatorStack = [];
        let outputQueue = [];

        let precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '^': 3
        }

        const associativity = {
            '+': "l",
            '-': "l",
            '*': "l",
            '/': "l",
            '^': "r"
        }

        for (let token of this.tokens) {
            if (Calculator.isNumber(token)) {
                outputQueue.push(token);
            } else if (token in precedence) {
                while(operatorStack.length > 0 && operatorStack.at(-1) in precedence && 
                    ((associativity[token] === 'l' && precedence[operatorStack.at(-1)] >= precedence[token]) ||
                    (associativity[token] === 'r' && precedence[operatorStack.at(-1)] > precedence[token]))) {
                        outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            } else if (token === '(') {
                operatorStack.push(token);
            } else if (token === ')') {
                while (operatorStack.length > 0 && operatorStack.at(-1) !== '(') {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop();
            } else {
                throw new console.error('Invalid token: ', token);
            }
        }

        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }

        console.log("Postfix form: ", outputQueue);
        this.tokens = outputQueue;
    }

    evaluator() {
        console.log("Evaluating...")
        // Shunting-Yard Algorithm
        let stack = [];
        for (let token of this.tokens) {
            if (Calculator.isNumber(token)) {
                stack.push(parseFloat(token));
            } else {
                let b = stack.pop();
                let a = stack.pop();
                if (token === "+") { stack.push(a + b) };
                if (token === "-") { stack.push(a - b) };
                if (token === "*") { stack.push(a * b) };
                if (token === "/") { stack.push(a / b) };
                if (token === "^") { stack.push(a ^ b) };
            }
        }
        let result = stack[0];
        if (Calculator.isInteger(result)) {
            result = parseInt(result);
        }

        console.log("Result: ", result)
        return result
    }
}

