import {Component, AfterViewInit, ElementRef,Renderer,ViewChild,EventEmitter, OnInit,OnDestroy} from '@angular/core';
import './modules/common/RxJsOperators';
import './modules/common/Polyfills';
import {Message} from 'primeng/primeng';
import { Observable }     from 'rxjs/Observable';
import { Subscription }     from 'rxjs/Subscription';
import {AbstractModel} from './modules/common/AbstractModel';

enum MenuOrientation {
    STATIC,
    OVERLAY,
    HORIZONTAL
};

declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template:`
		<div class="layout-wrapper" [ngClass]="{'layout-compact':layoutCompact}">
						
		    <div #layoutContainer class="layout-container" 
		            [ngClass]="{'menu-layout-static': !isOverlay(),
		            'menu-layout-overlay': isOverlay(),
		            'layout-menu-overlay-active': overlayMenuActive,
		            'menu-layout-horizontal': isHorizontal(),
		            'layout-menu-static-inactive': staticMenuDesktopInactive,
		            'layout-menu-static-active': staticMenuMobileActive}">
		
            <app-topbar></app-topbar>

            <div class="layout-menu" [ngClass]="{'layout-menu-dark':darkMenu}" (click)="onMenuClick($event)">
		            <div #layoutMenuScroller class="nano">
		                <div class="nano-content menu-scroll-content">
		                    <app-profile *ngIf="profileMode=='inline'&&!isHorizontal()"></app-profile>
		                    <app-menu [reset]="resetMenu"></app-menu>
		                </div>
		            </div>
		        </div>
		        
		        <div class="layout-main">
		            
                    <p-growl [value]="msgs"></p-growl>

		            <router-outlet></router-outlet>            
		            
		        </div>
		        
		        <div class="layout-mask"></div>
		    </div>
		
		</div>
  `,
  styleUrls: ['AppComponent.scss']
})
export class AppComponent implements AfterViewInit,OnInit,OnDestroy {
    
    blocked : boolean;
    
    msgs: Message[] = [];
    
    _onSaved$ : Subscription;

    _onDeleted$ : Subscription;

    layoutCompact: boolean = true;

    layoutMode: MenuOrientation = MenuOrientation.HORIZONTAL;
    
    darkMenu: boolean = true;
    
    profileMode: string = 'inline';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutContainer: HTMLDivElement;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    documentClickListener: Function;

    resetMenu: boolean;

    @ViewChild('layoutContainer') layourContainerViewChild: ElementRef;

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    constructor(public renderer: Renderer) {}

    ngOnInit() {
    }

    displaySavedGrowl(model : AbstractModel) {
        
        // only display is an object is present
        if(model) {                
            this.msgs = [];
            this.msgs.push({severity:'info', summary:'Info', detail: model.getHumanFriendlyName() + ' was saved successfully!'});
        }
    }
    
    displayDeletedGrowl(model : AbstractModel) {
        
        // only display is an object is present
        if(model) {                
            this.msgs = [];
            this.msgs.push({severity:'info', summary:'Info', detail: model.getHumanFriendlyName() + ' was deleted successfully!'});
        }
    }

    ngAfterViewInit() {
        this.layoutContainer = <HTMLDivElement> this.layourContainerViewChild.nativeElement;
        this.layoutMenuScroller = <HTMLDivElement> this.layoutMenuScrollerViewChild.nativeElement;

        //hides the horizontal submenus or top menu if outside is clicked
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', (event) => {            
            if(!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if(!this.menuClick && this.isHorizontal()) {
                this.resetMenu = true;
            }

            this.topbarItemClick = false;
            this.menuClick = false;
        });
        
        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
        }, 10);
    }

    onMenuButtonClick(event) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if(this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        else {
            if(this.isDesktop())
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            else
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if(!this.isHorizontal()) {
            setTimeout(() => {
                jQuery(this.layoutMenuScroller).nanoScroller();
            }, 500);
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        
        if(this.overlayMenuActive || this.staticMenuMobileActive) {
            this.rotateMenuButton = false;
            this.overlayMenuActive = false;
            this.staticMenuMobileActive = false;
        }
        
        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if(this.activeTopbarItem === item)
            this.activeTopbarItem = null;
        else
            this.activeTopbarItem = item;

        event.preventDefault();
    }

    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }  

        jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
        
        this._onSaved$.unsubscribe();
        this._onDeleted$.unsubscribe();
    }
}