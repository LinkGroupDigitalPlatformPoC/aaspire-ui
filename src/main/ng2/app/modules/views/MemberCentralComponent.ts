// Angular
import { EventEmitter, Component, OnInit, Inject, forwardRef } from '@angular/core';

// PrimeNG
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute, Router } from '@angular/router';
import './../common/RxJsOperators';

// components
import { AppSettings } from '../../AppSettings';

// models
import { MemberDetails } from '../models/MemberDetails.interface';
import { CallDetails } from '../models/CallDetails';
import { MemberGridRow } from '../models/MemberGridRow.interface'

// services
import { MemberService } from '../services/Member.service';
import { SharedService } from '../services/Shared.service';
import { ContextMediatorService } from './../common/ContextMediatorService';

@Component({
    moduleId: module.id,
    templateUrl: 'MemberCentral.xhtml',
    providers: [MemberService]
})

export class MemberCentralComponent {

    searchResults : Array<MemberGridRow>;
    private subscriptionToMemberSearch: any;
    userEnteredSearchCriteria: string;
      
    constructor(private route: ActivatedRoute, private router: Router, protected contextMediatorService: ContextMediatorService, private sharedService: SharedService, 
                protected memberService: MemberService) {}
    
    /**
     * From the "Search"" button on this component
     */
    onSearch() {
        // console.log('MemberCentralComponent::onSearch(): param = ' + this.userEnteredSearchCriteria);
        
        this.subscriptionToMemberSearch = 
            this.memberService.getMembersForSearchString(this.userEnteredSearchCriteria).subscribe(
                memberObj => this.consumeMemberDetails(memberObj),
                error => console.error("ERROR: " + <any>error));
    }

    /**
     * From the "Start Call"" button (on a row of the members grid)
     */
    onStartCall(memberRow: MemberGridRow) {
        console.log("MemberCentralComponent::onStartCall(): setting shared service: id = " + memberRow.id);
        this.sharedService.selectedMemberId = memberRow.id;

        // populate the call structure with the member selected by the user
        let call: CallDetails = new CallDetails();
        call.memberId = memberRow.id;
        call.callId = 987654321; // @ICtodo: get next available call identifier
        call.memberName= memberRow.name;
        
        // trigger an event for any interested component/s
        this.contextMediatorService.onStartCall(call);
        
        // navigate to the call
        this.router.navigateByUrl('/call/' + call.callId);    
    }

    /**
     * Consume member list from the member search
     * Update the UI
     */
    private consumeMemberDetails(memberDetails: [MemberDetails]) {
        console.log('MemberCentralComponent::consumeMemberDetails(): number of results = ' + memberDetails.length);

        this.searchResults = new Array<MemberGridRow>();

        for (var member of memberDetails) {
            console.log("MemberCentralComponent::consumeMemberDetails(): display member: " + JSON.stringify(member));

            var gridRow: MemberGridRow = {
                'id': member.id,
                'name': member.title + " " + member.givenName + " " + member.surname,
                'plan': member.plan,
                'dob': member.dateOfBirth
            };

             // add a member to the UI list
            this.searchResults.push(gridRow);
        }
    }

}
