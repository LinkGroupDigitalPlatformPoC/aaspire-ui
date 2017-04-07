import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../../AppComponent';

@Component({
    selector: 'timer-component',
    template: 'Time on call: {{minutes}} : {{seconds}}'
})

export class TimerComponent {
    minutes = 0;
    seconds = 0;

    constructor() {}

    ngOnInit() {
        let timer = Observable.timer(2000, 1000);
        timer.subscribe(t => this.updateDigitalTimer(t));
    }

    private updateDigitalTimer(t: any) {
        if ((t > 60) && (t%60 == 0)) {
            this.minutes++;
            this.seconds = 0;
        }
        else {
            this.seconds = t%60;
        }
    }
}