import {EventEmitter, Component, OnInit} from '@angular/core';
import { TreeNode,SelectItem } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';

import { CallDetails } from './../models/CallDetails';
import { RefData } from './../models/RefData';
import { RefDataValue } from './../models/RefDataValue';
import { IdentityCheck } from './../models/IdentityCheck';

@Component({
    moduleId: module.id,
    templateUrl: 'Call.xhtml'
})
export class CallComponent implements OnInit {
        
    private call : CallDetails;
    
    private callReasonsSelectItems : SelectItem[];
    
    private otherSelectedCallReasons : RefDataValue[];
    
    private primaryCallReason : RefDataValue;
      
    private identityChecks: IdentityCheck[];
    
    private points: number; // id verification
    
    private selectedIdentifiers: IdentityCheck[];

     *     /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute) {}
    
    ngOnInit() {
        this.callReasonsSelectItems = new Array<SelectItem>();
        this.otherSelectedCallReasons = new Array<RefDataValue>();        

        this.identityChecks = new Array<IdentityCheck>();
        this.selectedIdentifiers = new Array<IdentityCheck>();
        
        this.points = 0;
        
        this.identityChecks.push(new IdentityCheck('Name', 40, 'John Smith'));
        this.identityChecks.push(new IdentityCheck('Licence #' ,30, 'L87239847'));
        this.identityChecks.push(new IdentityCheck('DOB', 40, '03-07-1985'));
        this.identityChecks.push(new IdentityCheck('Passport #', 40, 'P789374985'));
        this.identityChecks.push(new IdentityCheck('Last Employer', 40, 'Link Group'));       

        // getCallReason API call
        let callReasons : RefData = this.getCallReasons();
        
        //loop through and initialise the selectitem array with refdatavalues
        for(let refDataValue of callReasons.values) {
            this.callReasonsSelectItems.push({label:refDataValue.descr,value:refDataValue.value});
        }
    }
    
    getCallReasons() : RefData {

        // TODO this should be a call to the refdata api.
        
        let refDataValues = new Array<RefDataValue>();
        refDataValues.push(new RefDataValue('A','>65'));
        refDataValues.push(new RefDataValue('B','Acct. Details Update'));
        refDataValues.push(new RefDataValue('C','Acct. Details Confirm'));
        refDataValues.push(new RefDataValue('D','ATO / Lost Super'));
        refDataValues.push(new RefDataValue('E','Advisor'));
        refDataValues.push(new RefDataValue('F','Balances'));
        refDataValues.push(new RefDataValue('G','Beneficiaries'));
        refDataValues.push(new RefDataValue('H','Beneficiary Update'));
        refDataValues.push(new RefDataValue('I','Campaign 1'));
        refDataValues.push(new RefDataValue('J','Campaign 2'));
        refDataValues.push(new RefDataValue('K','Campaign 3'));
        
        let refData = new RefData('CALLRSN','Call Reasons',refDataValues);
        
        return refData;
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
}