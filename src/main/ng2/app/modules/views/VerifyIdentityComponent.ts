import {EventEmitter, Component, OnInit} from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';
import {IdentityCheck} from './../models/IdentityCheck';

@Component({
    moduleId: module.id,
    templateUrl: 'VerifyIdentity.xhtml'
})
export class VerifyIdentityComponent implements OnInit {
        
    private identityCheck : IdentityCheck;
      
    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute) {}
    
    ngOnInit() {
        
        // onload get the current call from global variable and set it as the current call    

        let callId = this.route.snapshot.params['id'];
        
        if(callId) {
            
        } else {           

        }        
    }
    
}