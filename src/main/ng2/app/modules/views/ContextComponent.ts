/**
 * Context for a call in progress with a member.
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

// PrimeNG
import { SplitButtonModule } from 'primeng/primeng';
import { MenuModule, MenuItem } from 'primeng/primeng';

// components
import { TimerComponent } from './TimerComponent';

// services
import { ContextMediatorService } from '../common/ContextMediatorService';

// models
import { MemberDetails } from '../models/MemberDetails.interface';
import { CallDetails } from '../models/CallDetails';
import { SharedService } from '../services/Shared.service';
import { MemberGridRow } from '../models/MemberGridRow.interface';

import { ChartModule } from 'primeng/primeng';
import { EmotionChartModel} from '../models/EmotionChartModel';


@Component({
    moduleId: module.id,
    styleUrls: ['Context.style.scss','Sentiment.style.scss'],
    selector: 'context-component',
    templateUrl: 'Context.xhtml',
})

export class ContextComponent {

    private currentCall: CallDetails;

    _onStartCall$: Subscription;
    _onEndCall$: Subscription;
    chartModel: EmotionChartModel;
    memberModel : MemberGridRow;
    displayEmotions: boolean;

    constructor(protected contextMediatorService: ContextMediatorService, private sharedService: SharedService) {

    }

    // Lifecycle
    // _________

    ngOnInit() {
        // subscribe to start and end call events
        this._onStartCall$ = this.contextMediatorService.onStartCall$.subscribe(call => this.startCall(call));
        this._onEndCall$ = this.contextMediatorService.onEndCall$.subscribe(call => this.endCall(call));
    }

    ngOnDestroy() {
        this._onStartCall$.unsubscribe();
        this._onEndCall$.unsubscribe();
    }

    // Custom
    // ______

    // from the "wrap up"" button
    // onWrapUp() {
    //     console.log("ContextComponent::onWrapUp()");
    //     this.endCall(call);
    // }

    // triggered by an event (eg: "Start Call" button on member central grid - for a particular member)
    startCall(call: CallDetails) {
        console.log('ContextComponent::startCall(): using call details: ' + JSON.stringify(call));

        const emo = this.sharedService.currentMember.analysis.emotion;

        this.memberModel  = new MemberGridRow(this.sharedService.currentMember); 

        this.chartModel = new EmotionChartModel(emo);

        this.sharedService.currentCall = call;
        this.currentCall = this.sharedService.currentCall;
    }

    // (can be) triggered by an event
    endCall(call: CallDetails) {
        console.log('ContextComponent::endCall()');

        this.sharedService.currentCall = null;
        this.currentCall = this.sharedService.currentCall;
        this.chartModel = null;
    }

    onSentimentClick(member: MemberGridRow){
        if(member.analysis) {
            this.displayEmotions = true;
        }
    }
}
