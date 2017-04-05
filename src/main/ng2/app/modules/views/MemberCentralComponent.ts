import {EventEmitter, Component, OnInit} from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';

@Component({
    moduleId: module.id,
    templateUrl: 'MemberCentral.xhtml',
    providers: []
})
export class MemberCentralComponent {

      
    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute) {}
    
}