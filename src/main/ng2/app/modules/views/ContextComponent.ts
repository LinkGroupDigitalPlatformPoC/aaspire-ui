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

    constructor(protected contextMediatorService: ContextMediatorService) {}

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

        this.currentCall = call; // shows the whole context panel (see the HTML)
    }

    // (can be) triggered by an event
    endCall(call: CallDetails) {
        console.log('ContextComponent::endCall()');

        this.currentCall = null; // hides the whole context panel (see the HTML)
    }

}
