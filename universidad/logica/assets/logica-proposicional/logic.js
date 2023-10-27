// {¬p ∧ ¬¬(((q ∧ r) ∧ ¬p) ∧ s), ((q ∧ r) ∧ ¬p) ∧ s} ⊨ p ∧ s

function getText(){
    let text = document.getElementById('main').value.trim()
    proposition(text)
}

function proposition(text){
    const targetDiv = document.getElementById('result')
    targetDiv.innerHTML = "" // clear div

    const proposition = new PropositionalLogic(text)
    const results = proposition.resultsDict
    console.log(results)
    const table = new CreateTable(targetDiv)
    for(let [id, result] of results.entries()){
        if(id == 0){
            addHeader(table, result)
        }

        addBody(table, result)
    }
    table.create()
}


function addHeader(table, result){
    let operations = clearOperations(Object.keys(result.results))
    
    let items = Object.keys(result.variables).concat(operations)

    let variableRows = Object.keys(result.variables).length
    let operationsRow = Object.keys(result.results).length
    let rows = variableRows + operationsRow

    table.createHeader()
    table.addHead(rows, "Operación")
    table.closeHeader()


    table.createHeader()
    table.addHead(variableRows, "Variables")
    table.addHead(operationsRow, "Operaciones")
    table.closeHeader()

    table.addHeader(items)
}

function clearOperations(operations){
    const clearedOperations = []
    for(let operation of operations){
        for(let symbol of SYMBOLS){
            if(operation.includes(symbol)){
                operation = operation.replaceAll(symbol, ` ${symbol} `)
            }
        }
        operation = operation.trim().replace(/\s+/g, ' ').replaceAll('( ', '(').replaceAll(' )', ')')
        clearedOperations.push(operation)
    }
    return clearedOperations
}

function addBody(table, result){
    let values = Object.values(result.variables).concat(Object.values(result.results))
    values = changeValues(values)
    table.addBody(values)
}

function changeValues(values, trueValue="T", falseValue="F"){
    const outputValues = []
    for(let value of values){
        outputValues.push((value) ? trueValue : falseValue)
    }

    return outputValues
}

function insertDataTextarea(text){
    text = (SYMBOLS.includes(text)) ? ` ${text} `: text;

    const cursorPositionStart = document.getElementById('main').selectionStart;
    const cursorPositionEnd = document.getElementById('main').selectionEnd;
    const currentText = document.getElementById('main').value;

    document.getElementById('main').value = currentText.substring(0, cursorPositionStart) + text + currentText.substring(cursorPositionEnd);
    document.getElementById('main').selectionStart = cursorPositionStart + text.length + 1;
    document.getElementById('main').selectionEnd = cursorPositionStart + text.length;
}