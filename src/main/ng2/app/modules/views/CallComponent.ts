import { EventEmitter, Component, OnInit } from '@angular/core';
import { TreeNode, SelectItem, DropdownModule, MultiSelectModule } from 'primeng/primeng';

import { ActivatedRoute, Router } from '@angular/router';
import './../common/RxJsOperators';

// models
import { CallDetails } from './../models/CallDetails';
import { RefData } from './../models/RefData';
import { RefDataValue } from './../models/RefDataValue';
import { ReferenceData } from './../models/ReferenceData.interface';
import { IdentityCheckGridRow } from './../models/IdentityCheckGridRow';
import { EngagementBody } from './../models/EngagementBody.interface';

// services
import { ContextMediatorService } from './../common/ContextMediatorService'; // singleton
import { SharedService } from './../services/Shared.service'; // singleton
import { ReferenceDataService } from './../services/ReferenceData.service';
import { EngagementService } from '../services/Engagement.service'; // engagements / calls

@Component({
    moduleId: module.id,
    templateUrl: 'Call.xhtml',
    providers: [EngagementService, ReferenceDataService]
})

export class CallComponent implements OnInit {
        
    displaySearch: boolean = false;

    private call: CallDetails;
    private callReasonsSelectItems: SelectItem[];
    private identityChecks: IdentityCheckGridRow[]; // all possible forms of ID check
    private points: number; // id verification
    private selectedIdentifiers: IdentityCheckGridRow[]; // selected ID checks

    private subscriptionToModifyEngagement: any;

    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute,
                private router: Router,
                public referenceDataService: ReferenceDataService,
                protected contextMediatorService: ContextMediatorService,
                private engagementService: EngagementService,
                private sharedService: SharedService) {}
    
    ngOnInit() {
        // TODO this should be an api to retrieve the call if the id was provided in the route
        
        this.callReasonsSelectItems = new Array<SelectItem>();
        this.identityChecks = new Array<IdentityCheckGridRow>();
        this.selectedIdentifiers = new Array<IdentityCheckGridRow>();
        this.points = 0;
        this.call = new CallDetails(); // used in the HTML (for now)

        if (this.route.snapshot.params['id']) {
            let engagement: EngagementBody = this.sharedService.currentEngagementBody;
            console.log("CallComponent::ngOnInit(): current engagement = " + JSON.stringify(engagement));

            this.call.callId = this.route.snapshot.params['id']; // from the URL
            this.call.memberId = parseInt(engagement.memberId);
            this.call.status = engagement.status;
            this.call.startTime = engagement.dateTimeInitiated;
            this.call.memberName = this.sharedService.currentMember.title + " " + this.sharedService.currentMember.givenName + " " + this.sharedService.currentMember.surname;

            // populate the identity checks array
            for (let identity of this.sharedService.currentMember.identities) {
                this.identityChecks.push(new IdentityCheckGridRow(identity.type, 30, identity.documentNumber)); // TODO: put points in the database
            }
   
        }

        this.getCallReasons();
    }

    /**
     * Retrieve call reasons from the API
     */ 
    getCallReasons() {
        this.referenceDataService.getByReferenceType('discussion-topics').subscribe(refDataArray => this.consumeCallReasons(refDataArray));
    }
    
    // the API has returned some call reasons
    consumeCallReasons(refDataArray: [ReferenceData]) {
        console.log("CallComponent::consumeCallReasons(): " + JSON.stringify(refDataArray));

       for (let refData of refDataArray) {
           this.callReasonsSelectItems.push({label: refData.description, value: refData.longDescription});
       }
    }
    
    /**
     * Add points based in identifier type
     */ 
    onRowSelect(event) {
        console.log("CallComponent::onRowSelect(): event = " + JSON.stringify(event));

        let currentTotal = 0; // TODO
        
        this.selectedIdentifiers.push(event.data);
        console.log("CallComponent::onRowSelect(): selectedIdentifiers = " + JSON.stringify(this.selectedIdentifiers));

        // recalculate based on all selected ID types
        for (let identifier of this.selectedIdentifiers) {
            currentTotal = currentTotal + identifier.points;
        }

        console.log("CallComponent::onRowSelect(): total = " + currentTotal);
        
        this.points = currentTotal;
    }

    /**
     * Subtract points based on identifier type
     * 
     * @param event 
     */
    onRowUnselect(event) {
        console.log("CallComponent::onRowUnselect(): event = " + JSON.stringify(event));

        let currentTotal = 0;

        let itemToRemove = event.data;

        this.selectedIdentifiers = this.selectedIdentifiers.filter(obj => obj !== itemToRemove);
        console.log("CallComponent::onRowUnselect(): selectedIdentifiers = " + JSON.stringify(this.selectedIdentifiers));

        // recalculate based on all selected ID types
        for (let identifier of this.selectedIdentifiers) {
            currentTotal = currentTotal + identifier.points;
        }

        console.log("CallComponent::onRowUnselect(): total = " + currentTotal);
        
        this.points = currentTotal;
    }
    
    onSearch() {
        this.displaySearch = true;
    }
    
    /**
     * End Call pressed
     */
    onWrapUp() {
        // call "save" api and then display call with the updated call object
        // the status should change to "closed" which should then disable all toolbar buttons except for "search"
        console.log("CallComponent::onWrapUp()");

        let engagement: EngagementBody = this.sharedService.currentEngagementBody;
        engagement.status = "closed";
        console.log("CallComponent::onWrapUp(): current engagement = " + JSON.stringify(engagement));

        // update the engagement status
        this.subscriptionToModifyEngagement = 
            this.engagementService.modifyEngagementForMember(engagement).subscribe(
                memberObj => this.consumeModifyEngagementWrapUpResult(memberObj),
                error => console.error("ERROR: CallComponent: onWrapUp(): " + <any>error)); 
    }
    
    /**
     * Sufficient ID check points have been achieved.
     * Updatre the call status and go to the member screen.
     */
    onVerified() {
        console.log("CallComponent::onVerified()");

        let engagement: EngagementBody = this.sharedService.currentEngagementBody;
        engagement.status = "In Progress";
        console.log("CallComponent::onVerified(): current engagement = " + JSON.stringify(engagement));

        // update the engagement status
        this.subscriptionToModifyEngagement = 
            this.engagementService.modifyEngagementForMember(engagement).subscribe(
                memberObj => this.consumeModifyEngagementResult(memberObj),
                error => console.error("ERROR: CallComponent: onVerified(): " + <any>error));  

        // move to member screen
        this.router.navigateByUrl('/member/' + this.call.memberId);  
    }
    
    onCancel() {
        this.contextMediatorService.onEndCall(null);
        
        // go (back) to member central
        this.router.navigateByUrl('/membercentral');  
    }

    /**
     * Result from update call status
     * @param result 
     */
    consumeModifyEngagementResult(result: any) {
        console.log("CallComponent: consumeModifyEngagementResult(): "+ JSON.stringify(result));

        // let resJson = result.json();
        if (result.ok == 1) {
            this.sharedService.currentEngagementBody.status = "In Progress";
        }
    }

    consumeModifyEngagementWrapUpResult(result: any) {
        console.log("CallComponent: consumeModifyEngagementResult(): "+ JSON.stringify(result));

        // let resJson = result.json();
        if (result.ok == 1) {
            this.sharedService.currentEngagementBody.status = "closed";
        }
    }
}
