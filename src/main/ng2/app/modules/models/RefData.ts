import {AbstractModel} from './../common/AbstractModel';
import {RefDataValue} from './RefDataValue';

export class RefData extends AbstractModel {
    
    public name : string;
    public descr : string;
    public values : RefDataValue[];
    public version : number;
    
    constructor(name? : string, descr? : string, values? : RefDataValue[]) {
        super();
        this.name = name;
        this.descr = descr;
        if(values) {
            this.values = values;
        } else {
            values = new Array<RefDataValue>();
        }
        this.version = 0;
    }
}