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
    callWithMemberNumber: string = " ";
    callWithMemberName: string = " ";

    constructor() {}

    ngOnInit() {}

    public startCallWithMember(memberNum: string, memberName: string) {
        console.log("ContextComponent::startCallWithMember() with " + memberNum + "," + memberName);
        this.callWithMemberNumber = memberNum;
        this.callWithMemberName = memberName;
        // this.populateMemberDetails(memberOnCall);
        // this.startCallTimer();
    }

    // populate the member on the current call
    private populateMemberDetails(memberOnCall: MemberDetails) {}

    // start the call timer
    private startCallTimer() {}
}
