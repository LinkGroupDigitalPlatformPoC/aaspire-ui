import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../../AppComponent';

@Component({
    selector: 'timer-component',
    template: 'Time on call: {{minutesStr}} : {{secondsStr}}'
})

export class TimerComponent {
    private minutes: number = 0;
    private seconds: number = 0;
    private minutesStr: string = " ";
    private secondsStr: string = " ";

    constructor() {}

    ngOnInit() {
        let timer = Observable.timer(2000, 1000);

        // ES6 arrow for scope
        timer.subscribe(t => this.updateDigitalTimer(t));
    }

    private updateDigitalTimer(t: any) {
        if ((t >= 60) && (t%60 == 0)) {
            this.minutes++;
            this.seconds = 0;
        }
        else {
            this.seconds = t%60;
        }

        // strings with leading zeroes
        this.secondsStr = this.seconds.toString();
        this.minutesStr = this.minutes.toString();

        if (this.seconds < 10) {
            this.secondsStr = "0" + this.secondsStr;
        }

        if (this.minutes < 10) {
            this.minutesStr = "0" + this.minutesStr;
        }
    }
}