import {Component,Inject,forwardRef} from '@angular/core';
import {AppComponent} from './AppComponent';

@Component({
    selector: 'app-footer',
    template: `
        <div class="card">
            <span class="footer-text-left">PrimeNG ULTIMA for Angular 2</span>
            <span class="footer-text-right"><span class="ui-icon ui-icon-copyright"></span>  <span>All Rights Reserved</span></span>
        </div>
    `
})
export class AppFooterComponent {

}