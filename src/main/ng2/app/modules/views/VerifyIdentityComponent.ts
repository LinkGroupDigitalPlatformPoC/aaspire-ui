import {EventEmitter, Component, OnInit} from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute, Router } from '@angular/router';
import './../common/RxJsOperators';

// models
import { IdentityCheck } from './../models/IdentityCheck';

// services
import { ContextMediatorService } from './../common/ContextMediatorService';
import { SharedService } from '../services/Shared.service'; // singleton

@Component({
    moduleId: module.id,
    templateUrl: 'VerifyIdentity.xhtml'
})

export class VerifyIdentityComponent implements OnInit {
        
    private identityChecks: IdentityCheck[];
    private points: number; // id verification
    private selectedIdentifiers: IdentityCheck[];
    private memberId: string;
       
    constructor(private route: ActivatedRoute, private router: Router, protected contextMediatorService : ContextMediatorService, private sharedService: SharedService) {}
    
    ngOnInit() {
        // onload get the current call from global variable and set it as the current call
        
        this.points = 0;

        this.memberId = this.route.snapshot.params['id'];
        
        console.log("VerifyIdentityComponent::ngOnInit(): for member " + this.memberId); 
        
        this.identityChecks = new Array<IdentityCheck>();
        this.selectedIdentifiers = new Array<IdentityCheck>();
        
        // TODO: get member details for the member id
        this.identityChecks.push(new IdentityCheck('Name', 40, 'John Smith'));
        this.identityChecks.push(new IdentityCheck('Licence #' ,30, 'L87239847'));
        this.identityChecks.push(new IdentityCheck('DOB', 40, '03-07-1985'));
        this.identityChecks.push(new IdentityCheck('Passport #', 40, 'P789374985'));
        this.identityChecks.push(new IdentityCheck('Last Employer', 40, 'Link Group'));       
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
    
    onVerified() {
        // go to member screen
        this.router.navigateByUrl('/member/' + this.memberId);  
    }
    
    onCancel() {
        this.contextMediatorService.onEndCall(null);
        
        // go (back) to member central
        this.router.navigateByUrl('/membercentral');  
    }

}
