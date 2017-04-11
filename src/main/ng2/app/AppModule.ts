import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms'
import { HttpModule, JsonpModule } from '@angular/http';
import {Component} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { ButtonModule, SplitButtonModule, ToolbarModule, TabViewModule, InputTextareaModule, 
         InputTextModule, GrowlModule, DialogModule, MenubarModule, DataTableModule,
         SharedModule, PanelModule, TreeModule, CalendarModule, DropdownModule, CarouselModule, DataGridModule,
         InputSwitchModule,ConfirmDialogModule,ConfirmationService,BlockUIModule, ChartModule, ScheduleModule, DataListModule,
         CheckboxModule,FieldsetModule} from 'primeng/primeng';

import {NglModule} from 'ng-lightning/ng-lightning';

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
import { RefDataComponent }  from './modules/views/RefDataComponent';
import { MemberTabsComponent }  from './modules/views/MemberTabsComponent';
import { MemberMainComponent } from './modules/views/MemberMainComponent';
import { CallComponent }  from './modules/views/CallComponent';

import { ContextMediatorService } from './modules/common/ContextMediatorService';
        
@NgModule({
    imports: [
        BrowserModule,
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
        NglModule.forRoot(),
        appRouting
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ContextMediatorService
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
        MemberTabsComponent,
        MemberMainComponent,
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