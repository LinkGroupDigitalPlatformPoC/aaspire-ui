import { EventEmitter, Component, OnInit } from '@angular/core';
import './../common/RxJsOperators';

// PrimeNG

// models
import { MemberDetails } from './../models/MemberDetails.interface';

@Component({
    moduleId: module.id,
    selector: 'member-main',
    templateUrl: 'MemberMain.xhtml'
})

export class MemberMainComponent implements OnInit {

    private memberNum: string = "123456";
       
    constructor() {}
    
    ngOnInit() {
        console.log("MemberMainComponent::ngOnInit()");
    }
    
}