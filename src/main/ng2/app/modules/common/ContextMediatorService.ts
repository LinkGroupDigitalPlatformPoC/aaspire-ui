import { Injectable,EventEmitter } from '@angular/core';
import './RxJsOperators';
import { AbstractModel } from './AbstractModel';

import { CallDetails } from './../models/CallDetails';

@Injectable()

export class ContextMediatorService {
    
    public onStartCall$: EventEmitter<CallDetails>;
    public onEndCall$: EventEmitter<CallDetails>;
    
    constructor() {
        // setup observable event emitters
        this.onStartCall$ = new EventEmitter();
        this.onEndCall$ = new EventEmitter();
    }

    onStartCall(call: CallDetails) {
        this.onStartCall$.emit(call);
    }
    
    onEndCall(call: CallDetails) {
        this.onEndCall$.emit(call);
    }
} 