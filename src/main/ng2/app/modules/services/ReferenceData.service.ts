import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// third party - endorsed by Angular
import { Observable } from 'rxjs/Observable';

// constants
import { AppSettings } from '../../AppSettings';

// models
import { RefData } from '../models/RefData';
import { ReferenceData } from './../models/ReferenceData.interface';
import { ReferenceDataBody } from './../models/ReferenceDataBody.interface'; // to add an entry

declare var JSOG: any;

@Injectable()

export class ReferenceDataService {

    protected url: string;

    constructor(public http: Http) {}

    /**
     * TODO: hook up API connect - going direct at the moment
     * 
     * Create reference data for a particular reference data type (TODO: currently hard coded as "discussion topics"")
     * 
     * POST
     * 
     * body:
     *      JSON
     *          decscription
     *          longDescription
     *          
     * return:
     *      JSON
     *          id
     *          decription
     *          longDescription
     */
    public create(model: ReferenceDataBody): Observable<ReferenceData> {

        let body = JSOG.stringify(model);

        console.info('ReferenceDataService::create() with body: ' + body);

        let headers = new Headers({
            'Accept': 'application/json',
            'X-IBM-Client-Id': '01493a98-9ab1-47f8-8943-afee23978816' // @ICtodo: security: inject this during the build process, as an environment variable
        });

        let options = new RequestOptions({headers: headers});
        
        // via API connect
        let completeURL = "http://dev-refdata-mgmt-services.mybluemix.net/referencedata/discussion-topics"; // TODO: use API connect
        
        return this.http.get(completeURL, options)
            .map((res : Response) => this.checkCreateResponse(res))
            .catch(this.handleError);
    }
    
    /**
     * This method calls the create API on the backend server and returns a model object.
     * TODO: hook up API connect - going direct at the moment
     * PUT
     */
    public update(model: RefData): Observable<RefData> {
        this.url = "xxx";

        //let body = JSON.stringify(modelCopy);
        let body = JSOG.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        /*
        return this.http.put(this.url + 'refdata', body, options)
                        .map((res : Response) => this.extractData(res))
                        .catch(this.handleError);
        */
        
        // replace this with the actual api call above
        return Observable.create( observer => {
            model.version = model.version + 1;
            model.descr = "Updated";
            observer.next(model);
            observer.complete();
        });
    }

    /*
    GET

    Get reference data for a specific discussion topic

    eg: https://api.us.apiconnect.ibmcloud.com/mangluibmorg-linkgrouppoc-dev/sb/referencedata/discussion-topics

    returns: array of reference data
        [
            {
                "id": "104",
                "description": "ATO\/Lost Super",
                "longDescription": "Locating lost super."
            },
            {
                "id": "101",
                "description": "Account details - change",
                "longDescription": "Change in the account details"
            },
            {
                "id": "102",
                "description": "Account details - confirmed",
                "longDescription": "Confirmation of the account details."
            },
            {
                "id": "103",
                "description": "Advisor",
                "longDescription": "Introduce an advisor."
            },
            {
                "id": "105",
                "description": "Balances",
                "longDescription": "Balance inquiry."
            },
            {
                "id": "106",
                "description": "Beneficiaries",
                "longDescription": "Update beneficiaries."
            },
            {
                "id": "107",
                "description": "Beneficiary nomination updated",
                "longDescription": "Update beneficiary nominations"
            },
            {
                "id": "108",
                "description": "Campaign 1",
                "longDescription": "Placeholder for the first campaign"
            },
            {
                "id": "109",
                "description": "Campaign 2",
                "longDescription": "Placeholder for the second campaign"
            },
            {
                "id": "110",
                "description": "Campaign 3",
                "longDescription": "Placeholder for the third campaign"
            }
        ]


        What are these extra id's? ... and where has the array gone?

        {
            "0": {
                "@id": "11",
                "id": "104",
                "description": "ATO\/Lost Super",
                "longDescription": "Locating lost super."
            },
            "1": {
                "@id": "12",
                "id": "101",
                "description": "Account details - change",
                "longDescription": "Change in the account details"
            },
            "2": {
                "@id": "13",
                "id": "102",
                "description": "Account details - confirmed",
                "longDescription": "Confirmation of the account details."
            },
            "3": {
                "@id": "14",
                "id": "103",
                "description": "Advisor",
                "longDescription": "Introduce an advisor."
            },
            "4": {
                "@id": "15",
                "id": "105",
                "description": "Balances",
                "longDescription": "Balance inquiry."
            },
            "5": {
                "@id": "16",
                "id": "106",
                "description": "Beneficiaries",
                "longDescription": "Update beneficiaries."
            },
            "6": {
                "@id": "17",
                "id": "107",
                "description": "Beneficiary nomination updated",
                "longDescription": "Update beneficiary nominations"
            },
            "7": {
                "@id": "18",
                "id": "108",
                "description": "Campaign 1",
                "longDescription": "Placeholder for the first campaign"
            },
            "8": {
                "@id": "19",
                "id": "109",
                "description": "Campaign 2",
                "longDescription": "Placeholder for the second campaign"
            },
            "9": {
                "@id": "20",
                "id": "110",
                "description": "Campaign 3",
                "longDescription": "Placeholder for the third campaign"
            },
            "@id": "10",
            "version": 0
        }
     */
    public getByReferenceType(referenceType: string): Observable<[ReferenceData]> {
        console.info('ReferenceDataService::getByReferenceType(' + referenceType + ')');

        let headers = new Headers({
            'Accept': 'application/json',
            'X-IBM-Client-Id': '01493a98-9ab1-47f8-8943-afee23978816' // @ICtodo: security: inject this during the build process, as an environment variable
        });

        let options = new RequestOptions({headers: headers});
        
        // via API connect
        let completeURL = AppSettings.API_REFERENCE_DATA_SPECIFIC + referenceType;
        
        return this.http.get(completeURL, options)
            .map((res : Response) => this.extractData(res))
            .catch(this.handleError);

    }
    
    /**
     * FIXME this needs to be done with pagination.
     */
    public getTypes(): Observable<[ReferenceData]> {
        console.info('ReferenceDataService::getTypes()');

        let headers = new Headers({
            'Accept': 'application/json',
            'X-IBM-Client-Id': '01493a98-9ab1-47f8-8943-afee23978816' // @ICtodo: security: inject this during the build process, as an environment variable
        });

        let options = new RequestOptions({headers: headers});
        
        // via API connect
        let completeURL = AppSettings.API_REFERENCE_DATA_ALL;
        
        return this.http.get(completeURL, options)
            .map((res: Response) => this.extractData(res))
            .catch(this.handleError);
    }

    protected extractData(res: Response) {
        console.info('ReferenceData::extractData(): ' + res);
        
        if (res.status == 200) {
            let body = res.json();
            return body;
        } 
        else {
            console.error('ReferenceDataService: extractData(): ERROR; Status = ' + res.status);
            return "";
        }
    }

    protected checkCreateResponse(res: Response) {

    }

    protected handleError( error: any ) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = ( error.message ) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        //console.error( errMsg ); // log to console instead
        console.error(error);
        return Observable.throw(error._body);
    }

}
