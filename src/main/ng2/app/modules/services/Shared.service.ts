// Angular
import { Injectable,EventEmitter } from '@angular/core';

// models
import { EngagementBody } from '../models/EngagementBody.interface';
import { MemberDetails } from '../models/MemberDetails.interface';

@Injectable()

export class SharedService {

    public selectedMemberId: number = 0;
    public currentEngagementBody: EngagementBody;
    public currentMember: MemberDetails;

    constructor() {}

}
