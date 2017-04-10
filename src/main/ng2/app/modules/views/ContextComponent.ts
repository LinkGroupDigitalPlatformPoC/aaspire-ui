/**
 * Context for a call in progress with a member.
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

// PrimeNG
import { SplitButtonModule } from 'primeng/primeng';
import { MenuModule, MenuItem } from 'primeng/primeng';

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
    private items: MenuItem[];
    callWithMemberNumber: string = " ";
    callWithMemberName: string = " ";

    constructor() {}

    ngOnInit() {
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

    private startCallTimer() {
        console.log("ContextComponent::startCallTimer()");
    }

    private stopCallTimer() {
        console.log("ContextComponent::stopCallTimer()");
    }

}
