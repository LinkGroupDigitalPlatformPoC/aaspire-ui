import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http';
import {Component} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { ButtonModule, ToolbarModule, TabViewModule, InputTextareaModule, 
         InputTextModule, GrowlModule, DialogModule, MenubarModule, DataTableModule,
         SharedModule, PanelModule, TreeModule, CalendarModule, DropdownModule, CarouselModule, DataGridModule,
         InputSwitchModule,ConfirmDialogModule,ConfirmationService,BlockUIModule, ChartModule, ScheduleModule, DataListModule,
         CheckboxModule} from 'primeng/primeng';

// framework classes
import { AppComponent }  from './AppComponent';
import { AppTopBarComponent }  from './AppTopBarComponent';
import { AppMenuComponent }  from './AppMenuComponent';
import { AppSubMenuComponent }  from './AppSubMenuComponent';
import { AppProfileComponent }  from './AppProfileComponent';
import { AppFooterComponent }  from './AppFooterComponent';

// routes
import { appRouting }  from './AppRoutes';

// components
import { MemberCentralComponent }  from './modules/views/MemberCentralComponent';
import { VerifyIdentityComponent }  from './modules/views/VerifyIdentityComponent';
import { RefDataComponent }  from './modules/views/RefDataComponent';
import { MemberComponent }  from './modules/views/MemberComponent';
import { CallComponent }  from './modules/views/CallComponent';
        
@NgModule({
    imports: [
        BrowserModule,
        ButtonModule,
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
        appRouting
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
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
        RefDataComponent,
        MemberComponent,
        CallComponent
    ],
    bootstrap: [
    	AppComponent
    ],
    entryComponents: [
    ]    
})
export class AppModule { }