import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    styleUrls: ['Timer.style.scss'],
    selector: 'timer-component',
    templateUrl: 'Timer.xhtml',
})

export class TimerComponent {
    private minutes: number = 0;
    private seconds: number = 0;
    private minutesStr: string = " ";
    private secondsStr: string = " ";

    constructor() {}

    ngOnInit() {
        console.log("TimerComponent::ngOnInit()");
        let timer = Observable.timer(500, 1000);
        timer.subscribe(t => this.incrementDigitalTimer(t));
    }

    // set the timer to 00:00
    public resetTimer() {
        // TODO: stop the timer
        
        this.minutes = 0;
        this.seconds = 0;
        this.minutesStr = "00";
        this.secondsStr = "00";
    }

    // start counting time elapsed
    public startTimer() {}

    // stop counting time elapsed
    public stopTimer() {}

    // increment by 1 second
    private incrementDigitalTimer(t: any) {
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
