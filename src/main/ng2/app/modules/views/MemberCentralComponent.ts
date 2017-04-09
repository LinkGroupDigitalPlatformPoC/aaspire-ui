import { EventEmitter, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';

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
    constructor(private route: ActivatedRoute, private memberSearchService: MemberSearch) {}
    
    // from the "Search"" button on this component
    onSearch() {
        // debugger;
        console.log('MemberCentralComponent::onSearch(): param = ' + this.userEnteredSearchCriteria);
        
        this.subscriptionToMemberSearch = 
            this.memberSearchService.getMembersForSearchString(this.userEnteredSearchCriteria).subscribe(
                memberObj => this.consumeMemberDetails(memberObj),
                error => console.error("ERROR: " + <any>error));
    }

    // from the "Start Call"" button on a row of the members grid
    onStartCall() {
        console.log("MemberCentralComponent::onStartCall()");
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