import {EventEmitter, Component, OnInit} from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';
import {IdentityCheck} from './../models/Member';

@Component({
    moduleId: module.id,
    templateUrl: 'Member.xhtml'
})
export class MemberComponent implements OnInit {
        
    private member : Member;
      
    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute) {}
    
    ngOnInit() {
     
    }
    
}