import {AbstractModel} from './../common/AbstractModel';
import {RefDataValue} from './RefDataValue';

export class RefData /*extends AbstractModel*/ {
    
    name: string;
    descr: string;
    
    values: RefDataValue[];
}