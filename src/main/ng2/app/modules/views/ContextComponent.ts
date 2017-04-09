/**
 * Context for a call in progress with a member..
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TimerComponent } from './TimerComponent';

// models
import { MemberDetails } from '../models/MemberDetails.interface';

@Component({
    moduleId: module.id,
    styleUrls: ['Context.style.scss'],
    selector: 'context-component',
    templateUrl: 'Context.xhtml',
})

export class ContextComponent {
    callWithMemberNumber: string = "12345";
    callWithMemberName: string = "Glen Something";

    constructor() {}

    ngOnInit() {}

    public startCallWithMember(param: any) {
        console.log("ContextComponent::startCallWithMember() with " + param);
        // this.populateMemberDetails(memberOnCall);
        // this.startCallTimer();
    }

    // populate the member on the current call
    private populateMemberDetails(memberOnCall: MemberDetails) {}

    // start the call timer
    private startCallTimer() {}
}
