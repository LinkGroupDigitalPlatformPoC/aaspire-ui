import { EventEmitter, Component, OnInit, Inject, forwardRef } from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute, Router } from '@angular/router';
import './../common/RxJsOperators';

// components
import { AppComponent } from '../../AppComponent';

// models
import { MemberDetails } from '../models/MemberDetails.interface';
import { CallDetails } from '../models/CallDetails';

// services
import { MemberService } from '../services/Member.service';
import { ContextMediatorService } from './../common/ContextMediatorService';

@Component({
    moduleId: module.id,
    templateUrl: 'MemberCentral.xhtml',
    providers: [MemberService]
})

export class MemberCentralComponent {

    searchResults : any; // [MemberDetails];  @ICtodo .
    private subscriptionToMemberSearch: any;
    userEnteredSearchCriteria: string; // entered by the user
      
    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute, private router: Router, protected contextMediatorService : ContextMediatorService, private memberSearchService: MemberService, @Inject(forwardRef(() => AppComponent)) public app:AppComponent) {}
    
    // from the "Search"" button on this component
    onSearch() {
        // console.log('MemberCentralComponent::onSearch(): param = ' + this.userEnteredSearchCriteria);
        
        this.subscriptionToMemberSearch = 
            this.memberSearchService.getMembersForSearchString(this.userEnteredSearchCriteria).subscribe(
                memberObj => this.consumeMemberDetails(memberObj),
                error => console.error("ERROR: " + <any>error));
    }

    // from the "Start Call"" button on a row of the members grid
    onStartCall(member: any) {
        // debugger;
        console.log("MemberCentralComponent::onStartCall(): " + member.membernum + ", " + member.name);

        // populate the call structure with the member selected by the user
        let call: CallDetails = new CallDetails();
        call.membernum = member.membernum;
        call.callid = 987654321; // @ICtodo
        call.membername= member.name;
        
        // trigger an event for any interested component/s
        this.contextMediatorService.onStartCall(call);
        
        // navigate to identity verification step
        this.router.navigateByUrl('/verifyidentity/1234567');    
    }

    /**
     * Consume member list from the member search
     * Update the UI
     */
    private consumeMemberDetails(memberDetails: [MemberDetails]) {
        console.log('MemberCentralComponent::consumeMemberDetails(): number of results = ' + memberDetails.length);

        this.searchResults = new Array();

        // loop through the array of members returned from the API and add to the UI list
        for (var member of memberDetails) {
            console.log("MemberCentralComponent::consumeMemberDetails(): display member: " + JSON.stringify(member));
            this.searchResults.push({
                'membernum': member.id,
                'name': member.title + " " + member.givenName + " " + member.surname,
                'plan': member.plan,
                'dob': member.dateOfBirth});
        }
    }
}