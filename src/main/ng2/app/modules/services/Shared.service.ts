// Angular
import { Injectable,EventEmitter } from '@angular/core';

// models
// import { MemberDetails } from '../models/MemberDetails.interface';

@Injectable()

export class SharedService {

    // public selectedMember: MemberDetails;
    public selectedMemberId: number = 0;

    constructor() {}

}
