import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../../AppComponent';

@Component({
    styles: [
        `.timer {
            border: none;
            position: relative;
            font-weight: 600;
            font-family: "Helvetica Neue";
            font-weight: bold;
            font-size: 45px;
        }`
    ],
    selector: 'timer-component',
    template: 
        `<div class=timer>
            {{minutesStr}} : {{secondsStr}}
        </div>`,
})

export class TimerComponent {
    private minutes: number = 0;
    private seconds: number = 0;
    private minutesStr: string = " ";
    private secondsStr: string = " ";

    constructor() {}

    ngOnInit() {
        let timer = Observable.timer(500, 1000);

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