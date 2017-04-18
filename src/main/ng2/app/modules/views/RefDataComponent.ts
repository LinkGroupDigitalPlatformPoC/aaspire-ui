import { EventEmitter, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';

import { ActivatedRoute } from '@angular/router';
import './../common/RxJsOperators';

// models
import { ReferenceData } from './../models/ReferenceData.interface';
import { RefData } from './../models/RefData';
import { RefDataValue } from './../models/RefDataValue';

// services
import { ReferenceDataService } from './../services/ReferenceData.service';

@Component({
    moduleId: module.id,
    templateUrl: 'RefData.xhtml',
    providers: [ReferenceDataService]
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
    constructor(private route: ActivatedRoute, private referenceDataService: ReferenceDataService) {}
    
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
        this.referenceDataService.getAll().subscribe(results => this.searched(results), error => this.displayError(error));
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
        // call the service to create or update the object in the backend
        if (this.refData.version > 0) {
            this.referenceDataService.update(this.refData).subscribe(refData => this.saved(refData), error => this.displayError(error));                                
        } else {
            this.referenceDataService.create(this.refData).subscribe(refData => this.saved(refData), error => this.displayError(error));                    
        }
    }

    onRefresh() {
        // TODO: this.referenceDataService.getById(this.refData.name).subscribe(refDataArray => this.saved(refDataArray), error => this.displayError(error));
    }
}