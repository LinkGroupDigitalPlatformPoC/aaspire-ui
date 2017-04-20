import { Component, OnInit } from '@angular/core';

import { SelectItem, DropdownModule } from 'primeng/primeng';

import './../common/RxJsOperators';

// PrimeNG

// models
import { MemberDetails } from './../models/MemberDetails.interface';
import { MemberGridRow } from './../models/MemberGridRow.interface';
import { EmotionChartModel } from '../models/EmotionChartModel';

// services
import { SharedService } from './../services/Shared.service';

@Component({
    moduleId: module.id,
    selector: 'member-main',
    styleUrls: ['Sentiment.style.scss'],
    templateUrl: 'MemberMain.xhtml'
})

export class MemberMainComponent implements OnInit {

    private selectedMember: MemberDetails;
    private stateSelectItems: SelectItem[];

    private displayEmotions: boolean;
    private emoChartData: EmotionChartModel;
 
    constructor(private sharedService: SharedService) {}
    
    ngOnInit() {
        console.log("MemberMainComponent::ngOnInit()");

        this.stateSelectItems = new Array<SelectItem>();
        this.stateSelectItems.push({label: "NSW", value: "New South Wales"});
        this.stateSelectItems.push({label: "NT", value: "Northern Territory"});
        this.stateSelectItems.push({label: "QLD", value: "Queensland"});
        this.stateSelectItems.push({label: "SA", value: "South Australia"});
        this.stateSelectItems.push({label: "TAS", value: "Tasmania"});
        this.stateSelectItems.push({label: "VIC", value: "Victoria"});
        this.stateSelectItems.push({label: "WA", value: "Western Australia"});

        this.selectedMember = new MemberGridRow(this.sharedService.currentMember);
    }

    onSentimentClick(member: MemberGridRow){
        if(member.analysis) {
            this.emoChartData = new EmotionChartModel(member.analysis.emotion);
            this.displayEmotions = true;
        }
    }
}