import {EventEmitter, Component, OnInit} from '@angular/core';
import { TreeNode,SelectItem } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';

import { CallDetails } from './../models/CallDetails';
import { RefData } from './../models/RefData';
import { RefDataValue } from './../models/RefDataValue';
import { RefDataApi } from './../services/RefDataApi';
import { IdentityCheck } from './../models/IdentityCheck';

@Component({
    moduleId: module.id,
    templateUrl: 'Call.xhtml',
    providers:[RefDataApi]
})
export class CallComponent implements OnInit {
        
    displaySearch: boolean = false;

    private call : CallDetails;
    
    private callReasonsSelectItems : SelectItem[];
      
    private identityChecks: IdentityCheck[];
    
    private points: number; // id verification
    
    private selectedIdentifiers: IdentityCheck[];

    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute, public refDataApi : RefDataApi) {}
    
    ngOnInit() {
        
        // TODO this should be an api to retrieve the call if the id was provided in the route
        this.call = new CallDetails();
        this.call.status = 'inprogress';
        
        this.callReasonsSelectItems = new Array<SelectItem>();

        this.identityChecks = new Array<IdentityCheck>();
        this.selectedIdentifiers = new Array<IdentityCheck>();
        
        this.points = 0;
        
        this.identityChecks.push(new IdentityCheck('Name', 40, 'John Smith'));
        this.identityChecks.push(new IdentityCheck('Licence #' ,30, 'L87239847'));
        this.identityChecks.push(new IdentityCheck('DOB', 40, '03-07-1985'));
        this.identityChecks.push(new IdentityCheck('Passport #', 40, 'P789374985'));
        this.identityChecks.push(new IdentityCheck('Last Employer', 40, 'Link Group'));       

        // getCallReason API call
        this.getCallReasons();
        
    }

    setupCallReasonSelectItems(refData : RefData) {
        for(let refDataValue of refData.values) {
            this.callReasonsSelectItems.push({label:refDataValue.descr,value:refDataValue.value});
        }  
    }

    getCallReasons() {
        this.refDataApi.getById('CALLRSN').subscribe(refData => this.setupCallReasonSelectItems(refData));
    }
    
    onRowSelect(event) {
 
        // add points based in identifier type
        let currentTotal = 0;
        
        for(let identifier of this.selectedIdentifiers) {
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
        this.call.status='closed';
        
    }
    
    search() {
    }
}