//

// Angular
import { EventEmitter, Component, OnInit, Inject, forwardRef } from '@angular/core';

// PrimeNG
import { TreeNode, DialogModule } from 'primeng/primeng';

import { ActivatedRoute, Router } from '@angular/router';
import './../common/RxJsOperators';

// components
import { AppSettings } from '../../AppSettings';

// models
import { MemberDetails } from '../models/MemberDetails.interface';
import { CallDetails } from '../models/CallDetails';
import { MemberGridRow } from '../models/MemberGridRow.interface'
import { EngagementBody } from '../models/EngagementBody.interface';

// services
import { SharedService } from '../services/Shared.service'; // singleton
import { ContextMediatorService } from './../common/ContextMediatorService'; // singleton
import { MemberService } from '../services/Member.service'; // members
import { EngagementService } from '../services/Engagement.service'; // engagements / calls

@Component({
    moduleId: module.id,
    templateUrl: 'MemberCentral.xhtml',
    styleUrls: ['Sentiment.style.scss'], 
    providers: [MemberService, EngagementService]
})

export class MemberCentralComponent {

    userEnteredSearchCriteria: string;
    searchResults : Array<MemberGridRow>;
    private subscriptionToMemberSearch: any;
    private subscriptionToAddEngagement: any;
    private engagementBody: EngagementBody;
    private matchingMemberDetails: [MemberDetails]; // members matching the search - used for start call

    private displayModal: boolean = false;
    private modalMessage: string = "some message";
      
    constructor(private route: ActivatedRoute, private router: Router, protected contextMediatorService: ContextMediatorService, private sharedService: SharedService, 
                protected memberService: MemberService, private engagementService: EngagementService) {}
    
    /**
     * From the "Search"" button on this component
     */
    onSearch() {
        // console.log('MemberCentralComponent::onSearch(): param = ' + this.userEnteredSearchCriteria);
        this.subscriptionToMemberSearch = 
            this.memberService.getMembers(this.userEnteredSearchCriteria).subscribe(
                memberObj => this.consumeMemberDetails(memberObj),
                error => console.error("ERROR: " + <any>error));
    }

    /**
     * From the "Start Call"" button (on a row of the members grid)
     */
    onStartCall(memberRow: MemberGridRow) {
        console.log("MemberCentralComponent::onStartCall(): setting shared service: id = " + memberRow.id);

        // store the selected member's details in the shared service for use by other components
        this.storeSelectedMember(memberRow.id);

        // create the call in the database via the API
        let dateTimeNow = new Date().toString();

        // this matches the body of the API request
        this.engagementBody = {
            "memberId": memberRow.id.toString(),
            "dateTimeInitiated": dateTimeNow,
            "dateTimeCompleted": "",
            "notes": "",
            "primaryTopic": "",
            "secondaryTopic": [],
            "status": "verification",
            "csrId": "123456"
        }

        this.subscriptionToAddEngagement = 
            this.engagementService.createEngagementForMember(this.engagementBody).subscribe(
                memberObj => this.consumeAddEngagementResult(memberObj),
                error => console.error("ERROR: " + <any>error));  
    }

    onCloseModal() {
        this.displayModal = false;
    }

    // member row selected in the grid: display member screen
    onSelectMember(memberRow: MemberGridRow) {
        console.log("MemberCentralComponent::onSelectMember(): setting shared service: id = " + memberRow.id);

        // store the selected member's details in the shared service for use by other components
        this.storeSelectedMember(memberRow.id);
        this.router.navigateByUrl('/member/' + memberRow.id);
    }

    /**
     * Store the selected member in the shared service (for use by other components)
     */
    private storeSelectedMember(selectedMemberId: number) {
        for (var member of this.matchingMemberDetails) {
            if (member.id == selectedMemberId) {
                this.sharedService.currentMember = member;
            }
        }
    }

    /*
     * From the "Start Call" button (on a row of the members grid)
     * API for add engagement has returned
     */
    private consumeAddEngagementResult(result: any) {
        console.log("MemberCentralComponent::consumeAddEngagementResult(): with result: " + JSON.stringify(result));

        this.sharedService.currentEngagementBody = this.engagementBody;

        // trigger an event for any interested component/s
        // for the UI (see the HTML): populate the call structure with the member selected by the user
        let call: CallDetails = new CallDetails();
        call.memberId = parseInt(this.engagementBody.memberId);
        call.callId = result._id; // @ICtodo: get next available call identifier from add engagement API
        call.memberName = this.sharedService.currentMember.title + " " + this.sharedService.currentMember.givenName + " " + this.sharedService.currentMember.surname;
        this.contextMediatorService.onStartCall(call);

        // navigate to the call
        this.router.navigateByUrl('/call/' + result._id); // waiting for API team to return a call number
    }

    /**
     * Consume member list from the member search
     * API for get members has returned
     * Update the UI
     */
    private consumeMemberDetails(memberDetails: [MemberDetails]) {
        console.log('MemberCentralComponent::consumeMemberDetails(): number of results = ' + memberDetails.length);

        if (memberDetails.length == 0) {
            this.modalMessage = "No members were found for the search criteria entered. Please try again with new search criteria";
            this.displayModal = true;
        }

        this.matchingMemberDetails = memberDetails; // array of matching members

        this.searchResults = new Array<MemberGridRow>(); // for populating the UI

        for (var member of memberDetails) {
            console.log("MemberCentralComponent::consumeMemberDetails(): display member: " + JSON.stringify(member));

            const sentimentScore = member.analysis.sentiment.score;
            const icon = this.sentimentIcon(sentimentScore);

            // create a grid row (member) for the UI
            var gridRow: MemberGridRow = {
                'id': member.id,
                'name': member.title + " " + member.givenName + " " + member.surname,
                'plan': member.plan,
                'dob': member.dateOfBirth,
                'sentimentScore': sentimentScore,
                'icon': icon,
                'className': "material-icons " + icon;
            };

             // add the member row to the UI grid
            this.searchResults.push(gridRow);
        }
    }

    private sentimentIcon(score) {
        if (score <= -0.5){
            return 'sentiment_very_dissatisfied';
        } else if(score > -0.5 && score <= -0.1) {
            return 'sentiment_dissatisfied';
        } else if(score > -0.1 && score <= 0.1) {
            return 'sentiment_neutral';
        } else if(score > 0.2 && score <= 0.5) {
            return 'sentiment_satisfied';
        } else {
            return 'sentiment_very_satisfied';
        }
    }

    private colourIcon(icon) {
        debugger
        const lookUp = {
            sentiment_very_dissatisfied: "'darkred'",
            sentiment_dissatisfied: "'darkred'",
            sentiment_neutral: "'gray'",
            sentiment_satisfied: "'green'",
            sentiment_very_satisfied: "'darkgreen'",
        }
        return lookUp[icon];
    }

}
