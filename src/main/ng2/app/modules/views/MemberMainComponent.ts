import { Component, OnInit } from '@angular/core';
import './../common/RxJsOperators';

// PrimeNG

// models
import { MemberDetails } from './../models/MemberDetails.interface';

// services
import { SharedService } from './../services/Shared.service';

@Component({
    moduleId: module.id,
    selector: 'member-main',
    templateUrl: 'MemberMain.xhtml'
})

export class MemberMainComponent implements OnInit {

    private selectedMember: MemberDetails;
       
    constructor(private sharedService: SharedService) {}
    
    ngOnInit() {
        console.log("MemberMainComponent::ngOnInit()");
        this.selectedMember = this.sharedService.currentMember;
    }
    
}