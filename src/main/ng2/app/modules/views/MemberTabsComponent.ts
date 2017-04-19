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
import { MemberCallsComponent } from './MemberCallsComponent';

// services
import { SharedService } from './../services/Shared.service';

@Component({
    moduleId: module.id,
    templateUrl: 'MemberTabs.xhtml'
})

export class MemberTabsComponent implements OnInit {
        
    private selectedMember: MemberDetails;
    private displaySearch: boolean = false;
       
    constructor(private route: ActivatedRoute, private sharedService: SharedService) {}
    
    ngOnInit() {
        // if (this.route.snapshot.params['id']) {
        //     console.log("MemberTabsComponent::ngOnInit(): member id from route = " + this.route.snapshot.params['id']);
        // }
        // else {
        //     console.log("MemberTabsComponent::ngOnInit(): selected member id (shared service) = " + this.sharedService.currentMember.id);
        // }

        this.selectedMember = this.sharedService.currentMember;
    }

    // search button to invoke the search popup dialog
    onSearch() {
        this.displaySearch = true;
    }

    // search pressed to search on user entered criteria
    performSearch() {

    }
    
}
