import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http';
import { Component } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule, SplitButtonModule, ToolbarModule, TabViewModule, InputTextareaModule, 
         InputTextModule, GrowlModule, DialogModule, MenubarModule, DataTableModule,
         SharedModule, PanelModule, TreeModule, CalendarModule, DropdownModule, CarouselModule, DataGridModule,
         InputSwitchModule, ConfirmDialogModule, ConfirmationService, BlockUIModule, ChartModule, ScheduleModule, DataListModule,
         CheckboxModule, FieldsetModule, ListboxModule, MultiSelectModule} from 'primeng/primeng';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NglModule } from 'ng-lightning/ng-lightning';

// framework classes
import { AppComponent }  from './AppComponent';
import { AppTopBarComponent }  from './AppTopBarComponent';
import { AppMenuComponent }  from './AppMenuComponent';
import { AppSubMenuComponent }  from './AppSubMenuComponent';
import { AppProfileComponent }  from './AppProfileComponent';
import { AppFooterComponent }  from './AppFooterComponent';

import { ContextComponent } from './modules/views/ContextComponent';
import { TimerComponent } from './modules/views/TimerComponent';

// routes
import { appRouting }  from './AppRoutes';

// components
import { MemberCentralComponent }  from './modules/views/MemberCentralComponent';
import { VerifyIdentityComponent }  from './modules/views/VerifyIdentityComponent';
import { ReferenceDataComponent }  from './modules/views/ReferenceDataComponent';
import { MemberTabsComponent }  from './modules/views/MemberTabsComponent';
import { MemberMainComponent } from './modules/views/MemberMainComponent';
import { MemberCallsComponent } from './modules/views/MemberCallsComponent';
import { CallComponent }  from './modules/views/CallComponent';

import { ContextMediatorService } from './modules/common/ContextMediatorService';
import { SharedService } from './modules/services/Shared.service';
        
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ButtonModule,
        SplitButtonModule,
        MenubarModule,
        TabViewModule,
        ToolbarModule,
        InputTextModule,
        GrowlModule,
        DialogModule,
        InputTextareaModule,
        DataTableModule,
        PanelModule,
        CalendarModule,
        TreeModule,
        DropdownModule,
        CarouselModule,
        ConfirmDialogModule,
        SharedModule,
        DataGridModule,
        BlockUIModule,
        ChartModule,
        FormsModule,
        ReactiveFormsModule,
        InputSwitchModule,
        HttpModule,
        JsonpModule,
        ScheduleModule,
        DataListModule,
        CheckboxModule,
        FieldsetModule,
        ListboxModule,
        MultiSelectModule,
        Ng2SmartTableModule,
        NglModule.forRoot(),
        appRouting
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ContextMediatorService,
        SharedService
    ],
    declarations: [
    	AppComponent,
    	AppTopBarComponent,
    	AppMenuComponent,
    	AppSubMenuComponent,
    	AppFooterComponent,
    	AppProfileComponent,
    	MemberCentralComponent,
        VerifyIdentityComponent,
        ReferenceDataComponent,
        MemberTabsComponent,
        MemberMainComponent,
        MemberCallsComponent,
        CallComponent,
        ContextComponent,
        TimerComponent
    ],
    bootstrap: [
    	AppComponent
    ],
    entryComponents: [
    ]    
})
export class AppModule { }