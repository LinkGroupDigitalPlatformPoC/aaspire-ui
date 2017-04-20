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

import { ChartModule } from 'primeng/primeng';


@Component({
    moduleId: module.id,
    styleUrls: ['Context.style.scss'],
    selector: 'context-component',
    templateUrl: 'Context.xhtml',
})

export class ContextComponent {
    private currentCall: CallDetails;

    _onStartCall$: Subscription;
    _onEndCall$: Subscription;
    emoRadarChartData: any;
    emoRadarChartOptions: any;

    constructor(protected contextMediatorService: ContextMediatorService, private sharedService: SharedService) {
        this.emoRadarChartOptions = { 
            legend: { display: false },
            scale: {
                ticks: {
                    min: 0,
                    max: 1,
                    stepSize: 0.2
                }
            }
        };
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
    //     this.endCall(this.currentCall);
    // }

    // triggered by an event (eg: "Start Call" button on member central grid - for a particular member)
    startCall(call: CallDetails) {
        console.log('ContextComponent::startCall(): using call details: ' + JSON.stringify(call));

        const emo = this.sharedService.currentMember.analysis.emotion;
        const emoData = [emo.sadness, emo.joy, emo.fear, emo.disgust, emo.anger]

        this.emoRadarChartData = {
            legend: { display: false },
            labels: ['Sadness', 'Joy', 'Fear', 'Disgust', 'Anger'],
            datasets: [
                {
                    label: null,
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: emoData
                }
            ]
        };

        this.currentCall = call; // shows the whole context panel (see the HTML)
    }

    // (can be) triggered by an event
    endCall(call: CallDetails) {
        console.log('ContextComponent::endCall()');

        this.currentCall = null; // hides the whole context panel (see the HTML)
        this.emoRadarChartData = null;
    }

}
