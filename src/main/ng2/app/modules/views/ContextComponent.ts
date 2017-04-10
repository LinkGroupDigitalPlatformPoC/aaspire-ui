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
import { Call } from '../models/Call';

@Component({
    moduleId: module.id,
    styleUrls: ['Context.style.scss'],
    selector: 'context-component',
    templateUrl: 'Context.xhtml',
})

export class ContextComponent {
    private items: MenuItem[]; // "Wrap Up" split button

    private currentCall: Call;
    _onStartCall$: Subscription;
    _onEndCall$: Subscription;

    constructor(protected contextMediatorService: ContextMediatorService) {}

    // Lifecycle
    // _________

    ngOnInit() {
        // subscribe to start and end call events
        this._onStartCall$ = this.contextMediatorService.onStartCall$.subscribe(call => this.startCall(call));
        this._onEndCall$ = this.contextMediatorService.onEndCall$.subscribe(call => this.endCall(call));

        // items for the dropdown menu in the "Wrap Up" split button
        this.items = [{
            label: 'File',
            items: [
                {label: 'New', icon: 'fa-plus'},
                {label: 'Open', icon: 'fa-download'}
            ]
        },
        {
            label: 'Edit',
            items: [
                {label: 'Undo', icon: 'fa-refresh'},
                {label: 'Redo', icon: 'fa-repeat'}
            ]
        }];
    }

    ngOnDestroy() {
        this._onStartCall$.unsubscribe();
        this._onEndCall$.unsubscribe();
    }

    // Custom
    // ______

    // from the "wrap up"" button
    onWrapUp() {
        console.log("ContextComponent::onWrapUp()");
        this.endCall(this.currentCall);
    }

    // triggered by an event (eg: "Start Call" button on member central grid - for a particular member)
    startCall(call: Call) {
        console.log('ContextComponent::startCall()');
        console.log(JSON.stringify(call));

        this.currentCall = call; // shows the whole panel (see the HTML)

        // this.clock = jQuery('.call-timer').FlipClock({
        //     clockFace: 'MinuteCounter'
        // });
        // console.log(this.clock.getTime());
    }

    // (can be) triggered by an event
    endCall(call: Call) {
        console.log('ContextComponent::endCall()');

        // end call and remove from context
        this.currentCall = null; // hides the whole panel (see the HTML)
    }

}
