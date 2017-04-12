import {AbstractModel} from './../common/AbstractModel';
import {RefDataValue} from './RefDataValue';

export class RefData /*extends AbstractModel*/ {
    
    constructor(public name : string, public descr : string, public values : RefDataValue[]) {}
}