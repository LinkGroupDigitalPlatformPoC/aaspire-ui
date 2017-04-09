import {Component, AfterViewInit, ElementRef,Renderer,ViewChild,EventEmitter, OnInit,OnDestroy} from '@angular/core';
import './modules/common/RxJsOperators';
import './modules/common/Polyfills';
import { Message} from 'primeng/primeng';
import { Observable }     from 'rxjs/Observable';
import { Subscription }     from 'rxjs/Subscription';
import { AbstractModel} from './modules/common/AbstractModel';
import { ContextMediatorService} from './modules/common/ContextMediatorService';
import { ContextComponent } from './modules/views/ContextComponent';
import { TimerComponent } from './modules/views/TimerComponent';

enum MenuOrientation {
    STATIC,
    OVERLAY,
    HORIZONTAL
};

declare var jQuery: any;
declare var JSOG: any;

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

                    <div class="ui-fluid">
                        <div class="ui-g">
                            <div class="ui-g-12 ui-lg-8">
                                <div class="card card-w-title">
                                    <router-outlet></router-outlet> 
                                </div>
                            </div>
                            <div class="ui-g-12 ui-lg-4">
                                <div class="card card-w-title">
                                    <context-component #context></context-component>
                                    <p-fieldset legend="Current Call" [toggleable]="true" *ngIf="callContext">

                                        <div class="ui-g form-group">
                                            <div class="ui-g-12 ui-md-4">
                                                <label>Call#</label>:
                                            </div>
                                            <div class="ui-g-12 ui-md-8">
                                                <a style="color: blue;text-decoration: underline;" routerLink="/call/{{callContext.callid}}">{{callContext.callid}}</a>                                                
                                            </div>
                                            <div class="ui-g-12 ui-md-4">
                                                <label>Member#</label>:
                                            </div>
                                            <div class="ui-g-12 ui-md-8">
                                                <a style="color: blue;text-decoration: underline;" routerLink="/member/{{callContext.membernum}}">{{callContext.membernum}}</a>                                                
                                            </div>
                                            <div class="ui-g-12 ui-md-4">
                                                <label>Name</label>:
                                            </div>
                                            <div class="ui-g-12 ui-md-8">
                                                {{callContext.membername}}
                                            </div>
                                            <div class="ui-g-12 ui-md-12">
                                                <hr style="border: solid #ddd; border-width: 1px 0 0; clear: both; margin: 22px 0 21px; height: 0;" />
                                            </div>
                                            <div class="ui-g-12 ui-md-4">
                                                <label>Elpased Time</label>:
                                            </div>
                                            <div class="ui-g-12 ui-md-8">
                                                <div class="call-timer"></div>
                                            </div>
                                            <div class="ui-g-12 ui-md-12">
                                                <hr style="border: solid #ddd; border-width: 1px 0 0; clear: both; margin: 22px 0 21px; height: 0;" />
                                            </div>
                                            <div class="ui-g-12 ui-md-12">
                                                <label>Personality insights</label>:
                                            </div>
                                        </div>


                                    </p-fieldset>
                                    <p-fieldset legend="Alerts" [toggleable]="true" *ngIf="callContext">
                                    </p-fieldset>
                                    <p-fieldset legend="Documents" [toggleable]="true" *ngIf="callContext">
                                    </p-fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
		                       
		            
		        </div>
		        
		        <div class="layout-mask"></div>
		    </div>
		
		</div>
  `,
  styleUrls: ['AppComponent.scss'],
})
export class AppComponent implements AfterViewInit,OnInit,OnDestroy {
    
    clock : any;
    
    blocked : boolean;
    
    msgs: Message[] = [];
    
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

    @ViewChild('context') context: ContextComponent; // @IC

    @ViewChild('layoutContainer') layourContainerViewChild: ElementRef;

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;
    
    _onStartCall$ : Subscription;

    _onEndCall$ : Subscription;

    /* Holds the current call for th euser */
    callContext : Call;

    constructor(public renderer: Renderer, protected contextMediatorService: ContextMediatorService) {}

    ngOnInit() {
        // subscribe to toolbar events, this should be be abstract and generic
        this._onStartCall$ = this.contextMediatorService.onStartCall$.subscribe(call => this.startCall(call));
        this._onEndCall$ = this.contextMediatorService.onEndCall$.subscribe(call => this.endCall(call));
    }
    
    startCall(call : Call) {
        console.log('AppComponent.startCall');
        console.log(JSON.stringify(call));
        
        // setup to show current call in context
        this.callContext = call;
        
        this.clock = jQuery('.call-timer').FlipClock({
            clockFace: 'MinuteCounter'
        });
        console.log(this.clock.getTime());
    }
    
    endCall(call : Call) {
        console.log('AppComponent.endCall');

        // end call and remove from context
        this.callContext = null;
    }
    
    /*
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
    */
    
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
        // debugger;
        console.log("AppComponent::onTopbarItemClick; event=" + event + "; item value=" + item.value); // @IC

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
        
        this._onStartCall$.unsubscribe();
        this._onEndCall$.unsubscribe();
    }
}