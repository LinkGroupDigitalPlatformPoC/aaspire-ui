// .
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

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

    private timer: Observable<number>;
    private timerSubscription: Subscription = undefined; // every second

    constructor() {}

    ngOnInit() {
        console.log("TimerComponent::ngOnInit()");
        this.timer = Observable.timer(500, 1000); // emit an event every second
        
        this.startTimer();
    }

    ngOnDestroy() {
        if (this.timerSubscription != undefined) {
            this.timerSubscription.unsubscribe();
        }
    }

    // set the timer to 00:00
    public resetTimer() {
        this.stopTimer();
        
        this.minutes = 0;
        this.seconds = 0;
        this.minutesStr = "00";
        this.secondsStr = "00";
    }

    // start counting time elapsed
    public startTimer() {
        this.timerSubscription = this.timer.subscribe(t => this.incrementDigitalTimer(t));
    }

    // stop counting time elapsed
    public stopTimer() {
        if (this.timerSubscription != undefined) {
            this.timerSubscription.unsubscribe();
        }
    }

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
