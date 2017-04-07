import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../../AppComponent';

@Component({
    selector: 'timer-component',
    template: 'Ticks (every second) : {{ticks}}'
})

export class TimerComponent {
    ticks = 0;

    constructor() {}

    ngOnInit() {
        let timer = Observable.timer(2000, 1000);
        timer.subscribe(t => this.ticks = t);
    }
}