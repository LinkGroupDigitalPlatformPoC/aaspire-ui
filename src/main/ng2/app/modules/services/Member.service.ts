/**
 * Search for members.
 */

// Angular
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// third party - endorsed by Angular
import { Observable } from 'rxjs/Observable';

import { MemberDetails } from '../models/MemberDetails.interface';
import { AppSettings } from '../../appSettings';

@Injectable()

export class MemberService {

    constructor(private http: Http) {}

    /**
     * Get a list of members matching a search string.
     * Go via API connect gateway
     *
     * Parameters:
     *      srchStr - search on this string
     *
     * Returns:
     *      array of member details (JSON)
     */
    public getMembersForSearchString(srchStr: string): Observable<[MemberDetails]> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'X-IBM-Client-Id': '01493a98-9ab1-47f8-8943-afee23978816' // @ICtodo: security
        });

        let options = new RequestOptions({ headers: headers });

        // via API connect
        let completeURL = AppSettings.API_MEMBER_SEARCH + encodeURI(srchStr);
        
        // direct connection:
        // let completeURL = "http://dev-member-mgmt-services.mybluemix.net/members?search=" + srchStr;

        return this.http.get(completeURL, options).map(this.extractData).catch(this.handleError);
    }

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
            console.error('MemberService: extractData(): ERROR: Could not retrieve token; Status = ' + res.status);
            return "";
        }
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${ error.status } - ${ error.statusText}` : 'Box token: Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
