import { EventEmitter, Component, OnInit, Inject, forwardRef } from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute, Router } from '@angular/router';
import './../common/RxJsOperators';
import {ContextMediatorService} from './../common/ContextMediatorService';
import {Call} from './../models/Call';

import { AppComponent } from '../../AppComponent';
import { MemberDetails } from '../models/MemberDetails.interface';
import { MemberSearch } from '../services/MemberSearch.service';

@Component({
    moduleId: module.id,
    templateUrl: 'MemberCentral.xhtml',
    providers: [MemberSearch]
})

export class MemberCentralComponent {

    searchResults : any; // [MemberDetails];  @ICtodo
    private subscriptionToMemberSearch: any;
    userEnteredSearchString: string; // set from the top bar
    userEnteredMemberNum: string; // from the partner HTML
    userEnteredSearchCriteria: string; // from the partner HTML
      
    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute, private router: Router, protected contextMediatorService : ContextMediatorService,private memberSearchService: MemberSearch, @Inject(forwardRef(() => AppComponent)) public app:AppComponent) {}
    
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
        let call: Call = new Call();
        call.membernum = member.membernum;
        call.callid = 987654321; // @ICtodo
        call.membername= member.name;
        
        // trigger an event for any interested components
        this.contextMediatorService.onStartCall(call);
        
        // navigate to identity verification step
        this.router.navigateByUrl('/verifyidentity/1234567');    
    }

    // from another component (the lens button in the top bar)
    // TODO: need ES6 arrow for scope
    public searchOnUserEnteredString(userStr: string) {
        // debugger;
        this.userEnteredSearchString = userStr;
        console.log('MemberCentralComponent::searchOnUserEnteredString(): param = ' + this.userEnteredSearchString);
        this.onSearch();
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