class CreateTable{
    constructor(targetDiv){
        this.targetDiv = targetDiv
        this.table = document.createElement("table")
        targetDiv.appendChild(this.table)
        this.headers = document.createElement('thead')
        this.body = document.createElement('tbody')
    }

    createHeader(){
        this.headerRow = document.createElement('tr')
    }

    addHeader(data, cols=1){
        this.createHeader()
        for(let item of data){
            this.addHead(cols, item)
        }

        this.closeHeader()
    }

    addHead(cols, value){
        if(this.headerRow){
            let th = document.createElement('th')
            if(cols != 1){
                th.colSpan  = `${cols}`;
            }

            let content = document.createTextNode(value)
            th.appendChild(content)
            this.headerRow.appendChild(th)
        }
    }

    closeHeader(){
        this.headers.appendChild(this.headerRow)
    }

    addBody(data){
        this.headerRow = document.createElement("tr")

        for(let item of data){
            let td = document.createElement('td')
            let content = document.createTextNode(item)
            td.appendChild(content)
            this.headerRow.appendChild(td)
        }

        this.body.appendChild(this.headerRow)
    }

    create(){
        this.table.appendChild(this.headers)
        this.table.appendChild(this.body)

        this.targetDiv.appendChild(this.table)

    }

}