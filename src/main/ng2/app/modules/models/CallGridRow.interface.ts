import {RefDataValue} from './RefDataValue';
import {EngagementDetails} from './EngagementDetails.interface';

export class CallGridRow {

    _id: string;
    memberId: number;
    csrId: string;
    notes: string;
    status: string; // TODO: ENUM: Verification / In Progress / Closing / Completed / Disconnected
    dateTimeCompleted: string; // TODO: date time type
    dateTimeInitiated: string;
    primaryTopic: string;
    secondaryTopic: [string];
    transcript: string;
    analysis: any;
    icon: string;

    constructor(call: EngagementDetails){
        this._id = call._id;
        this.memberId = call.memberId;
        this.csrId = call.csrId;
        this.notes = call.notes;
        this.status = call.status;
        this.dateTimeCompleted = call.dateTimeCompleted;
        this.dateTimeInitiated = call.dateTimeInitiated;
        this.secondaryTopic = call.secondaryTopic;
        this.transcript = call.transcript;
        this.analysis = call.analysis;
        this.icon = this.transcript ? 'wrap_text' : '';
    }
}
