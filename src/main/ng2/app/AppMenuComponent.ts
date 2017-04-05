import {Component,Input,OnInit,EventEmitter,ViewChild,trigger,state,transition,style,animate,Inject,forwardRef} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from './AppComponent';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="ultima-menu ultima-main-menu clearfix" [reset]="reset" visible="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

    model: any[];

    constructor(@Inject(forwardRef(() => AppComponent)) public app:AppComponent) {}
    
    ngOnInit() {
        this.model = [
            {
            	label: 'Member Central', icon: 'dashboard', routerLink: ['/']
            },
            {
            	label: 'Admin', icon:'menu',
            	// submenu for each alphabet letter
            	items: [
					{
						label: 'U',icon:'subject',
						items: [
							{label: 'User', icon:'subject', routerLink:['/user']}                                
						]
					},
                    {
                        label: 'R',icon:'subject',
                        items: [
                            {label: 'Reference Data', icon:'subject', routerLink:['/referencedata']}                                
                        ]
                    }
            	]
            },
            {
            	label: 'Main', icon:'menu',
         		// Menu Item for each parent entity
            	items: [
                    {label: 'Call', icon:'subject', routerLink:['/call']},                                
                    {label: 'Member', icon:'subject', routerLink:['/member']}                                
            	]
            },
        ];
    }

    changeTheme(theme) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        let layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
        
        themeLink.href = 'resources/theme/theme-' + theme +'.css';
        layoutLink.href = 'resources/layout/css/layout-' + theme +'.css';
    }
}