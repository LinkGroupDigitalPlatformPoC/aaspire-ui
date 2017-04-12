import { EventEmitter, Component, OnInit } from '@angular/core';
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
       
    constructor(private sharedService: SharedService) {}
    
    ngOnInit() {
        debugger;
        console.log("MemberMainComponent::ngOnInit()");
    }
    
}