export class DatasetsItem {
    fill: boolean;
    steppedLine: boolean;
    label: string;
    borderColor: string;
    backgroundColor: string;
    data: any[];      
    
    constructor(fill: boolean, steppedLine: boolean, label: string, borderColor: string,backgroundColor: string, data?: any[]){
        this.fill  = fill;
        this.steppedLine  = steppedLine;
        this.label  = label;
        this.borderColor  = borderColor;
        this.backgroundColor  = backgroundColor;
        if(data){
            this.data  = data;
        }else{
            this.data = [];
        }
    }

    addData(data) { 
        this.data.push(data)       
    }

}
