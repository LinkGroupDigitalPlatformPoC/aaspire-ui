/**
 * Engagements.
 */

// Angular
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// third party - endorsed by Angular
import { Observable } from 'rxjs/Observable';

import { MemberDetails } from '../models/MemberDetails.interface';
import { AppSettings } from '../../AppSettings';

@Injectable()

export class EngagementService {

    constructor(private http: Http) {}

    /**
     * Parse the response object
     *
     * Parameters:
     *      Response - object to parse
     */
    private extractData(res: Response) {

        if (res.status == 200) {
            let body = res.json(); // parse into a JavaScript object
            // console.log('MemberSearch service: success: body = ' + JSON.stringify(body));
            return body;
        }
        else {
            console.error('EngagementService: extractData(): ERROR: Could not retrieve token; Status = ' + res.status);
            return "";
        }
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${ error.status } - ${ error.statusText}` : 'Box token: Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
