const SYMBOLS = ["∧", "∨", "→", "↔"];


class PropositionalLogic{
    constructor(text){
        this.text = this.clearText(text)

        this.getOperations()
        this.getVariables()

        this.resultsDict = []
        this.getAllCombinations()
    }

    clearText(text){
        text = text.trim().replace(/\s+/g, ' ').replaceAll('( ', '(').replaceAll(' )', ')').replaceAll('{ ', '{').replaceAll(' }', '}').replaceAll('¬ ', '¬');
        text = '(' + text + ')'
        for(let symbol of SYMBOLS){ text = text.replaceAll(' ' + symbol + ' ', symbol)}
        
        return text;
    }

    createBooleanCombinations(variableNum) {
        const allBooleanArray = [];
        for (let i = 0; i < (1 << variableNum); i++) {
            const boolArray = [];
            for (let j = variableNum - 1; j >= 0; j--) {
                boolArray.push(Boolean(i & (1 << j)));
            }
    
            allBooleanArray.push(boolArray);
        }
        
        return allBooleanArray.reverse();
    }

    // Unused at the moment
    getCustomCombination(variableDictList){
        if(variableDictList.isArray()){
            for(let [id, variableCombination] of variableDictList.entries()){
                this.variableDict = variableCombination
                this.handleOperations()

                this.resultsDict[id] = {"variables": this.variableDict, "results": this.results}
            }
        } 
    }

    getAllCombinations(){
        const booleanCombinations = this.createBooleanCombinations(this.variables.length)
        for(let [id, combination] of booleanCombinations.entries()){
            this.variableDict = {}
            this.variables.forEach((key, i) => this.variableDict[key] = combination[i]);
            this.handleOperations()

            this.resultsDict[id] = {"variables": this.variableDict, "results": this.results}
        }

        this.handleOperations()
    }

    getOperations(){
        this.operations = []
        const parenthesisStart = []
        for(let [id, letter] of this.text.split('').entries()){
            if(letter == '('){
                parenthesisStart.push(id);

            } else if(letter == ')'){
                let lastId = parenthesisStart.pop();
                this.operations.push(this.text.substring(lastId + 1, id));
            }
        }
    }

    replaceOldOperations(operation, textReplacedTo){
        const reversedOperations = this.operations.slice().reverse()
        for(const [id, otherOperation] of reversedOperations.entries()){
            if(operation.includes('(' + otherOperation + ')')){
                let replacedText = textReplacedTo
                if(textReplacedTo.includes("@id")){replacedText = textReplacedTo.replaceAll("@id", `${reversedOperations.length - id - 1}`)}
                operation = operation.replaceAll('(' + otherOperation + ')', replacedText)
            }
        }

        return operation
    }
    
    getVariables(){
        this.variables = []
        for(let operation of this.operations){
            operation = this.replaceOldOperations(operation, '')
            this.getVariablesFromOperation(operation)
        }
    }

    getVariablesFromOperation(operation){
        const symbol = SYMBOLS.find(symbol =>  operation.includes(symbol));
        if(symbol){
            operation = operation.replaceAll('(', '').replaceAll(')', '').replaceAll('¬', '').trim()
            const variableTextArray = operation.trim().split(symbol)
            for(let variable of variableTextArray){
                if(variable != "" && !this.variables.includes(variable)){
                    this.variables.push(variable)
                }
            } // Add error
        }
    }

    handleOperations(){
        this.changedOperations = []
        this.results = {}
        for(let [id, operation] of this.operations.entries()){
            operation = this.replaceOldOperations(operation, '[ID-@id]')
            
            const symbol = SYMBOLS.find(symbol =>  operation.includes(symbol));
            if(symbol){
                const variables = operation.split(symbol)
                
                let [variable1, variable2]= [variables[0], variables[1]]
                let [value1, value2] = [this.getVariableValue(variable1), this.getVariableValue(variable2)]

                let result = this.operateLogic(value1, value2, symbol)
                
                this.results[this.operations[id]] = result;
            }

            this.changedOperations.push(operation)
        }
    }

    getVariableValue(variable){
        let isNegative = variable.length - variable.replaceAll('¬', '').length
        variable = variable.replaceAll('¬', '')

        let value
        let variableText = ""

        if (variable.includes("[ID-")){
            let variableId = parseInt(variable.replace('ID-', '').replace('[', '').replace(']', ''))
            variableText = this.operations[variableId];
            value = this.results[variableText]

        } else {
            variableText = variable
            value = this.variableDict[variable]
        }

        if (isNegative > 0){
            variableText = '¬'.repeat(isNegative) + variableText
            value = isNegative % 2 == 0 ? value : !value;
            this.results[variableText] = value;
        }

        return value
    }

    operateLogic(variable1, variable2, symbol){
        switch(symbol){
            case '∧': return variable1 && variable2;
            case '∨': return variable1 || variable2;
            case '→': return (variable1 == variable2 || !variable1);
            case '↔': return variable1 == variable2;
            default: return 'error'
        }
    }
}   



let text = "(p ∨ a) ∨ ¬¬(((q ∧ r) ∧ ¬p) ∧ s)"


let l = new PropositionalLogic(text)
console.log(l.operations)
console.log(l.variables)
console.log(l.changedOperations)
console.log(l.resultsDict[0])