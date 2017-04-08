import {Component,Inject,forwardRef} from '@angular/core';
import {AppComponent} from './AppComponent';

@Component({
    selector: 'app-footer',
    template: `
        <div class="card">
            <span class="footer-text-left">Link Group</span>
            <span class="footer-text-right"><span class="ui-icon ui-icon-copyright"></span>  <span>All Rights Reserved</span></span>
        </div>
    `
})
export class AppFooterComponent {

}