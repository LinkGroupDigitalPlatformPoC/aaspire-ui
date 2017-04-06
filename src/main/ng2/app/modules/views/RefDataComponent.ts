import {EventEmitter, Component, OnInit} from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';
import {RefData} from './../models/RefData';
import {RefDataValue} from './../models/RefData';

@Component({
    moduleId: module.id,
    templateUrl: 'RefData.xhtml'
})
export class RefDataComponent implements OnInit {
        
    private refData : RefData;
      
    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute) {}
    
    ngOnInit() {
        this.refData = new RefData();
        this.refData.values = new Array<RefDataValue>();
    }
    
}