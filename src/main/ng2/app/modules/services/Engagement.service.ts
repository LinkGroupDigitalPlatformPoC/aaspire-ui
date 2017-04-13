/**
 * Engagements.
 */

// Angular
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// third party - endorsed by Angular
import { Observable } from 'rxjs/Observable';

// constants
import { AppSettings } from '../../AppSettings';

// models
import { EngagementBody } from '../models/EngagementBody.interface';

@Injectable()

export class EngagementService {

    constructor(private http: Http) {}

    /*
    GET

    Get all engagements for a specified member

    https://api.us.apiconnect.ibmcloud.com/mangluibmorg-linkgrouppoc-dev/sb/members/201/engagements   
    
    returns: array of engagements
        [
            {
                "_id": "58ec66d9fdf0af0037e25cba",
                "memberId": "201",
                "dateTimeInitiated": "2017-03-31 09:30",
                "dateTimeCompleted": "2017-03-31 09:35",
                "notes": "detailed notes sample",
                "primaryTopic": "Account Inquiry",
                "secondaryTopic": [
                "Placeholder1",
                "Placeholder2"
                ],
                "status": "completed"
            },
            {
                "_id": "58ec66d9fdf0af0037e25cbb",
                "memberId": "201",
                "dateTimeInitiated": "2017-03-31 07:30",
                "dateTimeCompleted": "2017-03-31 08:35",
                "notes": "detailed notes sample",
                "primaryTopic": "Account Inquiry",
                "secondaryTopic": [
                "Placeholder1",
                "Placeholder2"
                ],
                "status": "completed"
            },
            {
                "_id": "58ec7c97fdf0af0037e25cbc",
                "memberId": "201",
                "dateTimeInitiated": "2017-07-31 09:30",
                "dateTimeCompleted": "2017-07-31 09:35",
                "notes": "detailed notes sample blah blah",
                "primaryTopic": "Account Balance",
                "secondaryTopic": [
                "ATO",
                "Account Balance"
                ],
                "status": "completed"
            }
        ]
    */
    getEngagementsForMember(memberId: number) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'X-IBM-Client-Id': '01493a98-9ab1-47f8-8943-afee23978816' // @ICtodo: security: inject this during the build process, as an environment variable
        });

        let options = new RequestOptions({headers: headers});

        // via API connect
        let completeURL = AppSettings.API_ENGAGEMENT_SEARCH + memberId.toString() + "/engagements";

        return this.http.get(completeURL, options).map(this.extractData).catch(this.handleError);
    }

    /*
    POST

    Create a new engagement for a specified member

    https://api.us.apiconnect.ibmcloud.com/mangluibmorg-linkgrouppoc-dev/sb/engagements

    body:
        {
            "memberId": "210",
            "dateTimeInitiated": "2017-07-31 09:30",
            "dateTimeCompleted": "2017-07-31 09:35",
            "notes": "detailed notes sample blah blah",
            "primaryTopic": "Account Balance",
            "secondaryTopic": [
                "ATO",
                "Account Balance"
            ],
            "status": "completed"
        }
    
    returns:
        for a successful call

        {
            "memberId": "210",
            "csrId": "123456",
            "dateTimeInitiated": "Wed Apr 12 2017 15:36:34 GMT+1000 (AEST)",
            "dateTimeCompleted": "2017-07-31 09:35",
            "notes": "detailed notes sample blah blah",
            "primaryTopic": "Account Balance",
            "secondaryTopic": [
                "ATO",
                "Account Balance"
            ],
            "status": "completed",
            "_id": "58eddec9132a410039e32933"
        }
    */
    createEngagementForMember(engagementBody: EngagementBody) {
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-IBM-Client-Id': '01493a98-9ab1-47f8-8943-afee23978816' // @ICtodo: security: inject this during the build process, as an environment variable
        });

        let options = new RequestOptions({headers: headers});

        // via API connect
        let completeURL = AppSettings.API_ENGAGEMENT_ADD;

        return this.http.post(completeURL, engagementBody, options).map(this.extractData).catch(this.handleError);
    }

    // PUT
    modifyEngagement() {

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
            return body;
        }
        else {
            console.error('EngagementService: extractData(): ERROR; Status = ' + res.status);
            return "";
        }
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${ error.status } - ${ error.statusText}` : 'Engagement service: ERROR';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
