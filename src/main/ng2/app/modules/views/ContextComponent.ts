/**
 * Context for a call in progress with a member.
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

// PrimeNG
import {SplitButtonModule} from 'primeng/primeng';

// components
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

    // from the "wrap up"" button
    onWrapUp() {
        console.log("ContextComponent::onWrapUp()");
    }

    public startCallWithMember(memberNum: string, memberName: string) {
        console.log("ContextComponent::startCallWithMember() with " + memberNum + "," + memberName);

        this.populateMemberDetails(memberNum, memberName);
        // this.startCallTimer();
    }

    // populate the member on the current call
    private populateMemberDetails(memberNum: string, memberName: string) {
        this.callWithMemberNumber = memberNum;
        this.callWithMemberName = memberName;
    }

    // start the call timer
    private startCallTimer() {
        console.log("ContextComponent::startCallTimer()");
    }

}
