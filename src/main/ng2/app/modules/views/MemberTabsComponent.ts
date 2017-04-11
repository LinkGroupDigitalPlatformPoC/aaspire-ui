import { EventEmitter, Component, OnInit } from '@angular/core';

// PrimeNG
import { TreeNode } from 'primeng/primeng';
import { TabView } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';

// models
import { MemberDetails } from './../models/MemberDetails.interface';

// components
import { MemberMainComponent } from './MemberMainComponent';

@Component({
    moduleId: module.id,
    templateUrl: 'MemberTabs.xhtml'
})

export class MemberTabsComponent implements OnInit {
        
    private member : MemberDetails;
       
    constructor(private route: ActivatedRoute) {}
    
    ngOnInit() {
        console.log("MemberTabsComponent::ngOnInit()");
    }
    
}
