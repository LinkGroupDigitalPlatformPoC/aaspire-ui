/**
 * Search for members.
 */

// Angular
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// third party - endorsed by Angular
import { Observable } from 'rxjs/Observable';

import { MemberDetails } from '../models/MemberDetails.interface';
// import { AppSettings } from '../app.settings';

@Injectable()

export class MemberSearch {

    boxToken: string;

    constructor(private http: Http) {}

    /**
     * Get a list of members matching a search string
     *
     * Parameters:
     *      srchStr - search on this string
     *
     * Returns:
     *      array of member details (JSON)
     */
    public getMembersForSearchString(srchStr: string): Observable<[MemberDetails]> {
        let completeURL = "http://dev-member-mgmt-services.mybluemix.net/members?search=" + srchStr; 

        return this.http.get(completeURL).map(this.extractData).catch(this.handleError);
    }


    /**
     * Parse the response object
     *
     * Parameters:
     *      Response - object to parse
     */
    private extractData(res: Response) {

        /*
        // TODO: dev only: expert solutioner back end
        if (res.status == 200) {
             var tokenObj: BoxToken = {
                clientid: "a",
                folderid: "b",
                issuccess: "true",
                token: res.text()
            };
            return tokenObj;
        }
        else {
            console.error('BoxTokenService: extractData(): ERROR: Could not retrieve token; Status = ' + res.status);
        }
        */

        if (res.status == 200) {
            let body = res.json(); // parse into a JavaScript object
            // console.log('MemberSearch service: success: body = ' + JSON.stringify(body));
            return body;
        }
        else {
            console.error('BoxTokenService: extractData(): ERROR: Could not retrieve token; Status = ' + res.status);
            return "";
        }
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${ error.status } - ${ error.statusText}` : 'Box token: Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
