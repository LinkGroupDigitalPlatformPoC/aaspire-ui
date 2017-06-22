/**
 * Search for members.
 */

// Angular
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// third party - endorsed by Angular
import { Observable } from 'rxjs/Observable';

import { MemberDetails } from '../models/MemberDetails.interface';
import { AppSettings } from '../../AppSettings';

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
    public getMembers(srchStr: string): Observable<[MemberDetails]> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'X-IBM-Client-Id': '01493a98-9ab1-47f8-8943-afee23978816' // @ICtodo: security: inject this during the build process, as an environment variable
        });

        let that = this;
        let options = new RequestOptions({headers: headers});

        // via API connect
        let completeURL = AppSettings.API_MEMBER_SEARCH + encodeURI(srchStr);

        return this.http.get(completeURL, options).map(this.extractData).flatMap(this.addAnalysis.bind(that)).catch(this.handleError);
    }

    public getAnalysisForMember(member) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'X-IBM-Client-Id': '01493a98-9ab1-47f8-8943-afee23978816' // @ICtodo: security: inject this during the build process, as an environment variable
        });

        let options = new RequestOptions({headers: headers});

        // via API connect
        let completeURL = AppSettings.API_ENGAGEMENT_SEARCH_SPECIFIC_MEMBER + member.id.toString() + "/analysis";

        return this.http.get(completeURL, options).map(this.extractData).map(a => this.memberWithAnalysis(member, a)).catch(this.handleError);
    }

    private memberWithAnalysis(member, analysis){
        // debugger
        // TODO move this logic to the server
        if(Object.keys(analysis).length === 0) {
            analysis = {
                sentiment: {score: 0},
                emotion: {sadness: 0, joy: 0, fear: 0, disgust: 0, anger: 0}
            }
        }
        member.analysis = analysis; 
        return member;
    }

    private addAnalysis(members) {
        var that = this;
        let memberWithAnalysesObservables = members.map(this.getAnalysisForMember.bind(that))
        let membersObservable = Observable.forkJoin(memberWithAnalysesObservables);
        return membersObservable;
    }

    /**
     * Parse the response object
     *
     * Parameters:
     *      Response - object to parse
     */
    private extractData(res: Response) {
        console.log('MemberSearch service: extractData: status = ' + res.status);
        // console.log('MemberSearch service: extractData: json = ' + res.json());

        if (res.status == 200) {
            let body = res.json(); // parse into a JavaScript object
            return body;
        }
        else {
            console.error('MemberService: extractData(): ERROR; Status = ' + res.status);
            return "";
        }
    }

    private handleError(error: any) {
        console.log('MemberSearch service: handleError: ' + error);

        let errMsg = (error.message) ? error.message : error.status ? `${ error.status } - ${ error.statusText}` : 'Member service: ERROR';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
