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

    searchResults : any;
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
        

        // mock up search result data should make a call to an api
        this.searchResults = [
            {'membernum':'123456789','name':'John Doe','plan':'Standard','dob':'03-07-1979'},
            {'membernum':'123456777','name':'John Smith','plan':'Standard','dob':'03-07-1959'}
        ];
    }

    /**
     * Consume the deck description, setting up the data for the HTML template
     * 
     * @param deckForRoute: JSON structure describing the Box content for a route
     * @param fetchedFromServer: whether this was a fresh fetch from Box (or cached data)
     */
    
    private consumeMemberDetails(memberDetails: MemberDetails) {

        console.log('consumeMemberDetails: got a result: ' + JSON.stringify(memberDetails));
        console.log('consumeMemberDetails: token: ' + memberDetails.token);

        /*

        // console.log("consumeBoxDeckForRoute(): selection: " + deckForRoute.Selection + "; category: " + deckForRoute.Category + "; " + deckForRoute.Content.toString() + "; fetched from server: " + fetchedFromServer);

        if (memberDetails == undefined) {
            // console.log("consumeBoxDeckForRoute(): current topic: " + currentTopic) + "; has undefined content";
            let emptyDeck: BoxDeckItem[] = [];
            this.contentList[currentTopic].box = emptyDeck;
        }
        else {
            console.log("consumeBoxDeckForRoute(): setting box content for area " + this.area + " and topic " + currentTopic);
            this.contentList[currentTopic].box = deckForRoute.Content;
        }

        if (fetchedFromServer) {
            this.saveDeckForRouteToSessionStorage(deckForRoute);
        }
        */
    }
    
}