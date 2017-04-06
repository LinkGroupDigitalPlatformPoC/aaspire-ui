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
        /*
        this.subscriptionToMemberSearch = this.memberSearchService.getBoxDeckForRoute(classification, selection, category).subscribe(
            deckObj => this.consumeMemberDetails(deckObj, true),
            error => console.error("ERROR: " + <any>error)
        );
        */

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
    /*
    private consumeMemberDetails(deckForRoute: BoxDeckForRoute, fetchedFromServer: boolean) {        

        let currentTopic: string = deckForRoute.Category; // eg: casestudies
        
        // reset the "fetching data"" indicator
        var idx: number = 0;
        for (let aTopic of this.topicList) {
            if (aTopic[0] == currentTopic) {
                this.topicList[idx][2] = 'false'; // index 2 => fetching data
                break;
            }
            idx++;
        }

        // console.log("consumeBoxDeckForRoute(): selection: " + deckForRoute.Selection + "; category: " + deckForRoute.Category + "; " + deckForRoute.Content.toString() + "; fetched from server: " + fetchedFromServer);

        if (deckForRoute.Content == undefined) {
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
    }
    */
}