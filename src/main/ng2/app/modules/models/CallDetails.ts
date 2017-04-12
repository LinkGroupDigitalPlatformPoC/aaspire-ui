import { RefDataValue } from './RefDataValue';

export class CallDetails {
    
    memberId : number;
    memberName: string;
    callId : number;
    status : string;
    startTime:string;
    endTime:string;
    otherSelectedCallReasons : RefDataValue[];
    primaryCallReason : RefDataValue;    
    
    constructor() {
        this.otherSelectedCallReasons = new Array<RefDataValue>();
    }
}