class Calculator {
    constructor() {
        this.initCalculator()

        return this
    }

    onKeyPress(key) {

    }

    initCalculator() {
        this.el = this.query('calculatorApp')
        this.operationDisplay = this.query('operationDisplay')
        this.mainDisplay = this.query('mainDisplay')

        this.mainDisplay.innerHTML = `init'd`
        this.operationDisplay.innerHTML = `123 + 321`
    }

    query(id) {
        return document.getElementById(id)
    }
}

export default Calculator
