import { Component, OnInit } from '@angular/core';

import './../common/RxJsOperators';

// third party - endorsed by Angular
import { Observable } from 'rxjs/Observable';
import { CallGridRow } from '../models/CallGridRow.interface';

// PrimeNG

// models
import { MemberDetails } from './../models/MemberDetails.interface';
import { EngagementDetails } from './../models/EngagementDetails.interface';

// services
import { SharedService } from './../services/Shared.service';
import { EngagementService } from '../services/Engagement.service'; // engagements / calls
import { EmotionChartModel } from '../models/EmotionChartModel';

@Component({
    moduleId: module.id,
    selector: 'member-calls',
    templateUrl: 'MemberCalls.xhtml',
    styleUrls: ['Sentiment.style.scss'],
    providers: [EngagementService]
})

export class MemberCallsComponent implements OnInit {

    private selectedMember: MemberDetails;
    private subscriptionToGetEngagementsForMember: any;
    private gridContent: Array<CallGridRow>;
    private displayedTranscript: Array<string>;
    private displayTranscript: boolean;
    private displayEmotions: boolean;
    private emoChartData: EmotionChartModel;
 
    constructor(private sharedService: SharedService, private engagementService: EngagementService) {
    }
    
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
        this.gridContent = calls.map(c => new CallGridRow(c));
    }

    // API error
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${ error.status } - ${ error.statusText}` : 'Engagement service: ERROR';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    onTranscriptClick(call: CallGridRow){
        if(call.transcript) {
            this.displayedTranscript = call.transcript.split("\n");
            this.displayTranscript = true;
        }
    }
    
    onSentimentClick(call: CallGridRow){
        if(call.analysis) {
            this.emoChartData = new EmotionChartModel(call.analysis.emotion);
            this.displayEmotions = true;
        }
    }
}