import { Component, OnInit } from '@angular/core';

import { SelectItem, DropdownModule } from 'primeng/primeng';

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
    private stateSelectItems: SelectItem[];
 
    constructor(private sharedService: SharedService) {}
    
    ngOnInit() {
        console.log("MemberMainComponent::ngOnInit()");

        this.stateSelectItems = new Array<SelectItem>();
        this.stateSelectItems.push({label: "NSW", value: "New South Wales"});
        this.stateSelectItems.push({label: "NT", value: "Northern Territory"});
        this.stateSelectItems.push({label: "QLD", value: "Queensland"});
        this.stateSelectItems.push({label: "SA", value: "South Australia"});
        this.stateSelectItems.push({label: "TAS", value: "Tasmania"});
        this.stateSelectItems.push({label: "VIC", value: "Victoria"});
        this.stateSelectItems.push({label: "WA", value: "Western Australia"});

        this.selectedMember = this.sharedService.currentMember;
    }
    
}