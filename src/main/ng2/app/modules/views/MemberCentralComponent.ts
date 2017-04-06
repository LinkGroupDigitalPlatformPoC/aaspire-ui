import {EventEmitter, Component, OnInit} from '@angular/core';
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
      
    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute, private memberSearchService: MemberSearch) {}
    
    onSearch() {
        console.log('MemberCentralComponent::onSearch');

        // @IC: hook in the API here
        
        this.subscriptionToMemberSearch = 
        this.memberSearchService.getTokenForAppUser("iancraig@au1.ibm.com", "AIC Offerings").subscribe(
            memberObj => this.consumeMemberDetails(memberObj),
            error => console.error("ERROR: " + <any>error)
        );

    }

    /**
     * Consume member list from the member search
     * Update the UI
     */
    private consumeMemberDetails(memberDetails: [MemberDetails]) {
        // console.log('consumeMemberDetails: got a result: ' + JSON.stringify(memberDetails));

        this.searchResults = new Array();

        // loop through array of members
        for (var member of memberDetails) {
            console.log("member is: " + JSON.stringify(member));
            this.searchResults.push({
                'membernum': '123456789',
                'name': member.title + " " + member.givenName + " " + member.surname,
                'plan': 'Standard',
                'dob': member.dateOfBirth});
            console.log("________");
        }
        // mock up search result data should make a call to an api
        // this.searchResults = [
        //     {'membernum':'123456789','name':'John Doe','plan':'Standard','dob':'03-07-1979'},
        //     {'membernum':'123456777','name':'John Smith','plan':'Standard','dob':'03-07-1959'}
        // ];

    }
    
}