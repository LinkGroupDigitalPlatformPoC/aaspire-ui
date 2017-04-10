import { Injectable,EventEmitter } from '@angular/core';
import './RxJsOperators';
import { AbstractModel } from './AbstractModel';
import { Call } from './../models/Call';

@Injectable()

export class ContextMediatorService {
    
    public onStartCall$ : EventEmitter<Call>;
    public onEndCall$ : EventEmitter<Call>;
    
    
    constructor() {
        // setup observable event emitters
        this.onStartCall$ = new EventEmitter();
        this.onEndCall$ = new EventEmitter();
    }

    onStartCall(call : Call) {
        this.onStartCall$.emit(call);
    }
    
    onEndCall(call : Call) {
        this.onEndCall$.emit(call);
    }
} 