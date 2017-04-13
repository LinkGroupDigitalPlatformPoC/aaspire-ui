import {EventEmitter, Component, OnInit} from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';
import {RefData} from './../models/RefData';
import {RefDataValue} from './../models/RefDataValue';
import {RefDataApi} from './../services/RefDataApi';

@Component({
    moduleId: module.id,
    templateUrl: 'RefData.xhtml',
    providers:[RefDataApi]
})
export class RefDataComponent implements OnInit {
        
    refData : RefData;
    
    refDataSearchName : string;
    
    displaySearch : boolean;
    
    searchResults : RefData[];
    
    searchColumns : any[];
    
    settings : any;

    /**
     * TODO: Generic Type should be updated to only be extensions of an Entity interface.  
     */    
    constructor(private route: ActivatedRoute, private refDataApi : RefDataApi) {}
    
    ngOnInit() {
        
        this.settings = {
                          columns: {
                            value: {
                              title: 'Value'
                            },
                            descr: {
                              title: 'Description'
                            },
                          }
                         };
        
        this.refData = new RefData();
        this.searchResults = new Array<RefData>();
        
        this.searchColumns = [
            {field: 'name', header: 'Name'},
            {field: 'descr', header: 'Description'},
            {field: 'version', header: 'Version'}
        ];
    }

    onSearch() {
        this.displaySearch = true;
    }
    
    search() {
        this.refDataApi.getAll().subscribe(results => this.searched(results), error => this.displayError(error));
    }

    onSelect($event) {
        this.displaySearch = false;
    }

    convertToModel(model) {
        return new RefData().fillFromJSONObj(model)
    }

    saved(refData : RefData) {
        this.refData = refData;
    }

    searched(results : RefData[]) {
        this.searchResults = results;
    }

    displayError(errorMsg : string) {
    }

    /**
     * This method reacts to a user clicking the "save" button in the toolbar.
     */
    onSave() {
                
        // call service to create or update object in the backend
        if (this.refData.version > 0) {
            this.refDataApi.update(this.refData).subscribe(refData => this.saved(refData), error => this.displayError(error));                                
        } else {
            this.refDataApi.create(this.refData).subscribe(refData => this.saved(refData), error => this.displayError(error));                    
        }
    }

    onRefresh() {
        this.refDataApi.getById(this.refData.name).subscribe(refData => this.saved(refData), error => this.displayError(error));
    }
}