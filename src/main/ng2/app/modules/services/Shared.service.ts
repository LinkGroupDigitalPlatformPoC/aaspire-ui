//.

// Angular
import { Injectable } from '@angular/core';

// constants
import { AppSettings } from '../../appSettings';

// models
import { MemberDetails } from '../models/MemberDetails.interface';

@Injectable()

export class SharedService {

    // public selectedMember: MemberDetails;
    public selectedMemberId: number;

}
