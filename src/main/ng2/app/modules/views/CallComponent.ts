import {EventEmitter, Component, OnInit} from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';
import {IdentityCheck} from './../models/Call';

@Component({
    moduleId: module.id,
    templateUrl: 'Call.xhtml'
})
export class CallComponent implements OnInit {
        
    private call : Call;
      
    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute) {}
    
    ngOnInit() {
     
    }
    
}