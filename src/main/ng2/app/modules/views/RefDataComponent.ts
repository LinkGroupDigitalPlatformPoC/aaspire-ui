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
        
    refData: RefData;
    referenceDataType: string;

    displaySearch: boolean; // display or hide the search popover dialog
    searchColumns: any[]; // on the popover dialog
    searchResults: ReferenceData[]; // popover dialog


    constructor(private route: ActivatedRoute, private referenceDataService: ReferenceDataService) {}
    
    ngOnInit() {  
        // refData is used by html template
        this.refData = new RefData();

        this.searchResults = new Array<ReferenceData>(); // for popover dialog
        
        // this.searchColumns = [ // for popover dialog
        //     {field: 'name', header: 'Name'},
        //     {field: 'descr', header: 'Description'},
        //     {field: 'version', header: 'Version'}
        // ];

        this.referenceDataType = "discussion-topics"; // TODO: allow different types
        this.referenceDataService.getByReferenceType(this.referenceDataType).subscribe(refDataArray => this.consumeReferenceData(refDataArray));
    }

    // the API has returned some call reasons
    consumeReferenceData(refDataArray: [ReferenceData]) {
        console.log("RefDataComponent::consumeReferenceData(): " + JSON.stringify(refDataArray));

       for (let refData of refDataArray) {
           this.searchResults.push({id: refData.id, description: refData.description, longDescription: refData.longDescription});
       }

        console.log("RefDataComponent::searchResults: " + JSON.stringify(this.searchResults));
    }

    onSearch() {
        this.displaySearch = true; // show popover dialog
    }
    
    search() {
        this.referenceDataService.getTypes().subscribe(results => this.searched(results), error => this.displayError(error));
    }

    onSelect($event) {
        this.displaySearch = false; // hide popover dialog
    }

    convertToModel(model) {
        return new RefData().fillFromJSONObj(model)
    }

    saved(refData : RefData) {
        this.refData = refData;
    }

    searched(results : [ReferenceData]) {
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
            // already exists: update it
            // this.referenceDataService.update(this.refData).subscribe(refData => this.saved(refData), error => this.displayError(error));                                
        } else {
            // does not exist yet: create it
            // this.referenceDataService.create(this.refData).subscribe(refData => this.saved(refData), error => this.displayError(error));                    
        }
    }

    onAdd() {

    }

    /**
     * This method reacts to a user clicking the "refresh" button in the toolbar.
     */
    onRefresh() {
        // TODO: this.referenceDataService.getByReferenceType(this.refData.name).subscribe(refDataArray => this.saved(refDataArray), error => this.displayError(error));
    }
}