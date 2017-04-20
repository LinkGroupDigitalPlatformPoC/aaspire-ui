import { EventEmitter, Component, OnInit } from '@angular/core';
import { TreeNode, SelectItem, DropdownModule, MultiSelectModule } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';

// models
import { CallDetails } from './../models/CallDetails';
import { RefData } from './../models/RefData';
import { RefDataValue } from './../models/RefDataValue';
import { ReferenceData } from './../models/ReferenceData.interface';
import { IdentityCheck } from './../models/IdentityCheck';
import { EngagementBody } from './../models/EngagementBody.interface';

// services
import { SharedService } from './../services/Shared.service'; // singleton
import { ReferenceDataService } from './../services/ReferenceData.service';

@Component({
    moduleId: module.id,
    templateUrl: 'Call.xhtml',
    providers: [ReferenceDataService]
})

export class CallComponent implements OnInit {
        
    displaySearch: boolean = false;

    private call: CallDetails;
    private callReasonsSelectItems: SelectItem[];
    private identityChecks: IdentityCheck[];
    private points: number; // id verification
    private selectedIdentifiers: IdentityCheck[];

    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute, 
                public referenceDataService: ReferenceDataService, 
                private sharedService: SharedService) {}
    
    ngOnInit() {
        // TODO this should be an api to retrieve the call if the id was provided in the route
        
        this.callReasonsSelectItems = new Array<SelectItem>();
        this.identityChecks = new Array<IdentityCheck>();
        this.selectedIdentifiers = new Array<IdentityCheck>();
        this.points = 0;
        this.call = new CallDetails(); // used in the HTML (for now)

        if( this.route.snapshot.params['id']) {
            let engagement: EngagementBody = this.sharedService.currentEngagementBody;
            console.log("CallComponent::ngOnInit(): current engagement = " + JSON.stringify(engagement));

            this.call.callId = this.route.snapshot.params['id']; // from the URL
            this.call.memberId = parseInt(engagement.memberId);
            this.call.status = engagement.status;
            this.call.startTime = engagement.dateTimeInitiated;
            this.call.memberName = this.sharedService.currentMember.title + " " + this.sharedService.currentMember.givenName + " " + this.sharedService.currentMember.surname;

            // Identity checks
            // this.sharedService.currentMember - contains member info (including identity check)

            // name
            // this.identityChecks.push(new IdentityCheck('Name', 40, this.sharedService.currentMember.title + " " + 
            //             this.sharedService.currentMember.givenName + " " + this.sharedService.currentMember.surname));
    
            // DOB
            // this.identityChecks.push(new IdentityCheck('DOB', 40, this.sharedService.currentMember.dateOfBirth));
    
            // checks in the identities array
            for (let identity of this.sharedService.currentMember.identities) {
                this.identityChecks.push(new IdentityCheck(identity.type, 30, identity.documentNumber));
            }
    
            // last employer
            // this.identityChecks.push(new IdentityCheck('Last Employer', 40, this.sharedService.currentMember.lastEmployer));     
        }

        this.getCallReasons();
    }

    // TODO: enum for reference data id's
    // Retrieve call reasons from the API
    getCallReasons() {
        this.referenceDataService.getById('discussion-topics').subscribe(refDataArray => this.consumeCallReasons(refDataArray));
    }
    
    // the API has returned some call reasons
    consumeCallReasons(refDataArray: [ReferenceData]) {
        console.log("CallComponent::consumeCallReasons(): " + JSON.stringify(refDataArray));

       for (let refData of refDataArray) {
           this.callReasonsSelectItems.push({label: refData.description, value: refData.longDescription});
       }
    }
    
    onRowSelect(event) {
        // add points based in identifier type
        let currentTotal = 0;
        
        for (let identifier of this.selectedIdentifiers) {
            currentTotal = currentTotal + identifier.points;
        }
        
        this.points = currentTotal;
    }

    onRowUnselect(event) {
        // subtract points based on identifier type
        this.onRowSelect(event);
    }
    
    onSearch() {
        this.displaySearch = true;
    }
    
    onWrapUp() {
        // call "save" api and then display call with the updated call object
        // the status should change to "closed" which should then disable all toolbar buttons except for "search"
        this.call.status = 'closed';
    }
    
    search() {
    }
}