import { EventEmitter, Component, OnInit } from '@angular/core';
import { TreeNode, SelectItem } from 'primeng/primeng';

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

export class ReferenceDataComponent implements OnInit {
        
    refData: RefData;
    // referenceDataType: string;

    displaySearchDialog: boolean; // display or hide the search popover dialog
    searchColumns: any[]; // on the popover dialog
    referenceDataForDisplay: ReferenceData[]; // popover dialog

    displayAddDialog: boolean; // display or hide the "create new entry" dialog

    private referenceDataTypeSelectItems: SelectItem[];
    private selectedReferenceDataType: string; // used by html


    constructor(private route: ActivatedRoute, private referenceDataService: ReferenceDataService) {}
    
    ngOnInit() {  
        // refData is used by html template
        this.refData = new RefData();

        this.referenceDataForDisplay = new Array<ReferenceData>();
        
        // this.searchColumns = [ // for popover dialog
        //     {field: 'name', header: 'Name'},
        //     {field: 'descr', header: 'Description'},
        //     {field: 'version', header: 'Version'}
        // ];

        this.referenceDataTypeSelectItems = new Array<SelectItem>();
        this.referenceDataService.getTypes().subscribe(resultArray => this.consumeReferenceDataTypes(resultArray));
    }

    consumeReferenceDataTypes(typesArray: [string]) {
        console.log("ReferenceDataComponent::consumeReferenceDataTypes(): " + JSON.stringify(typesArray));

        for (let referenceDataType of typesArray) {
            if (this.selectedReferenceDataType == undefined) { // selected in the dropdown
                this.selectedReferenceDataType = referenceDataType;

                // get reference data values for the selected reference data type
                this.referenceDataService.getByReferenceType(referenceDataType).subscribe(refDataArray => this.consumeReferenceData(refDataArray));
            }

            // populate the dropdown list
            this.referenceDataTypeSelectItems.push({label: referenceDataType, value: referenceDataType});
        }
    }

    // the API has returned some call reasons
    consumeReferenceData(referenceDataArray: [ReferenceData]) {
        console.log("ReferenceDataComponent::consumeReferenceData(): " + JSON.stringify(referenceDataArray));

        // empty the grid
        this.referenceDataForDisplay = new Array<ReferenceData>();

        // repopulate the grid
        for (let referenceData of referenceDataArray) {
           this.referenceDataForDisplay.push({
               id: referenceData.id, 
               description: referenceData.description, 
               longDescription: referenceData.longDescription
            });
       }
    }

    onReferenceDataTypeSelect() {
        console.log("ReferenceDataComponent::onReferenceDataTypeSelect(): " + this.selectedReferenceDataType);
        
        // get reference data values for the selected reference data type
        this.referenceDataService.getByReferenceType(this.selectedReferenceDataType).subscribe(refDataArray => this.consumeReferenceData(refDataArray));
    }

    onSearch() {
        this.displaySearchDialog = true; // show popover dialog
    }
    
    search() {
        // this.referenceDataService.getTypes().subscribe(results => this.searched(results), error => this.displayError(error));
    }

    onSelect($event) {
        this.displaySearchDialog = false; // hide popover dialog
    }

    convertToModel(model) {
        return new RefData().fillFromJSONObj(model)
    }

    saved(refData : RefData) {
        this.refData = refData;
    }

    searched(results : [ReferenceData]) {
        this.referenceDataForDisplay = results;
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
        this.displayAddDialog = true;
    }

    /**
     * This method reacts to a user clicking the "refresh" button in the toolbar.
     */
    onRefresh() {
        // TODO: this.referenceDataService.getByReferenceType(this.refData.name).subscribe(refDataArray => this.saved(refDataArray), error => this.displayError(error));
        // get reference data values for the selected reference data type
        this.referenceDataService.getByReferenceType(this.selectedReferenceDataType).subscribe(refDataArray => this.consumeReferenceData(refDataArray));
    }
}