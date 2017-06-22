// Angular
import { Injectable,EventEmitter } from '@angular/core';

// models
import { EngagementBody } from '../models/EngagementBody.interface';
import { MemberDetails } from '../models/MemberDetails.interface';
import { CallDetails } from '../models/CallDetails';

@Injectable()

export class SharedService {

    public currentEngagementBody: EngagementBody;
    public currentMember: MemberDetails;
    public currentCall: CallDetails;

    constructor() {}

}
