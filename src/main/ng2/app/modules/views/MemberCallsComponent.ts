import { Component, OnInit } from '@angular/core';

import './../common/RxJsOperators';

// third party - endorsed by Angular
import { Observable } from 'rxjs/Observable';

// PrimeNG

// models
import { MemberDetails } from './../models/MemberDetails.interface';
import { EngagementDetails } from './../models/EngagementDetails.interface';

// services
import { SharedService } from './../services/Shared.service';
import { EngagementService } from '../services/Engagement.service'; // engagements / calls

@Component({
    moduleId: module.id,
    selector: 'member-calls',
    templateUrl: 'MemberCalls.xhtml',
    providers: [EngagementService]
})

export class MemberCallsComponent implements OnInit {

    private selectedMember: MemberDetails;
    private subscriptionToGetEngagementsForMember: any;
    private gridContent: Array<EngagementDetails>;
 
    constructor(private sharedService: SharedService, 
                private engagementService: EngagementService) {}
    
    ngOnInit() {
        console.log("MemberCallsComponent::ngOnInit()");

        this.selectedMember = this.sharedService.currentMember;

        // use an API to get all calls for a specified member
        this.subscriptionToGetEngagementsForMember = 
            this.engagementService.getEngagementsForMember(this.selectedMember.id).subscribe(
                callsObj => this.consumeEngagementsForMember(callsObj),
                error => console.error("ERROR: " + <any>error));
    }

    // API has returned the calls for the member
    // display the calls in a grid
    private consumeEngagementsForMember(calls: [EngagementDetails]) {
        console.log("MemberCallsComponent::consumeEngagementsForMember(): " + JSON.stringify(calls));
        this.gridContent = calls;
    }

    // API error
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${ error.status } - ${ error.statusText}` : 'Engagement service: ERROR';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
}