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

    searchResults : any;
      
    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute) {}
    
    onSearch() {
        console.log('MemberCentralComponent::onSearch');
        // mock up serach result data should make a call to an api

        // @IC: hook in here
        this.searchResults = [{'membernum':'123456789','name':'John Doe','plan':'Standard','dob':'03-07-1979'},
                         {'membernum':'123456777','name':'John Smith','plan':'Standard','dob':'03-07-1959'}];
    }
}