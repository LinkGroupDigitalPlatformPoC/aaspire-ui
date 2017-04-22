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

@Component({
    moduleId: module.id,
    templateUrl: 'Call.xhtml',
    providers: [ReferenceDataService]
})

export class CallComponent implements OnInit {
        
    displaySearch: boolean = false;

    private call: CallDetails;
    private callReasonsSelectItems: SelectItem[];
    private identityChecks: IdentityCheckGridRow[];
    private points: number; // id verification
    private selectedIdentifiers: IdentityCheckGridRow[];

    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute,
                private router: Router,
                public referenceDataService: ReferenceDataService,
                protected contextMediatorService : ContextMediatorService,
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

            // checks in the identities array
            for (let identity of this.sharedService.currentMember.identities) {
                this.identityChecks.push(new IdentityCheckGridRow(identity.type, 30, identity.documentNumber));
            }
    
            // this.sharedService.currentMember - contains member info (including identity check)

            // name
            // this.identityChecks.push(new IdentityCheckGridRow('Name', 40, this.sharedService.currentMember.title + " " + 
            //             this.sharedService.currentMember.givenName + " " + this.sharedService.currentMember.surname));
    
            // DOB
            // this.identityChecks.push(new IdentityCheckGridRow('DOB', 40, this.sharedService.currentMember.dateOfBirth));
    
            // last employer
            // this.identityChecks.push(new IdentityCheckGridRow('Last Employer', 40, this.sharedService.currentMember.lastEmployer));     
        }

        this.getCallReasons();
    }

    // Retrieve call reasons from the API
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
    
    onRowSelect(event) {
        // add points based in identifier type
        let currentTotal = 0;
        
        console.log("CallComponent::onRowSelect(): selectedIdentifiers = " + JSON.stringify(this.selectedIdentifiers));

        for (let identifier of this.selectedIdentifiers) {
            currentTotal = currentTotal + identifier.points;
        }

        console.log("CallComponent::onRowSelect(): total = " + currentTotal);
        
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
    
    onVerified() {
        // go to member screen
        this.router.navigateByUrl('/member/' + this.call.memberId);  
    }
    
    onCancel() {
        this.contextMediatorService.onEndCall(null);
        
        // go (back) to member central
        this.router.navigateByUrl('/membercentral');  
    }
}
