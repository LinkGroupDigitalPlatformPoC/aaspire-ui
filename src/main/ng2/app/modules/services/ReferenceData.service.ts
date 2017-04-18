import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// third party - endorsed by Angular
import { Observable } from 'rxjs/Observable';

// constants
import { AppSettings } from '../../AppSettings';

// models
import { RefData } from '../models/RefData';
import { RefDataValue } from '../models/RefDataValue';
import { ReferenceData } from './../models/ReferenceData.interface';

declare var JSOG: any;

@Injectable()

export class ReferenceDataService {

    protected url: string;

    constructor(public http: Http) {}

    /**
     * This method calls the create API on the backend server and returns a model object.
     */
    public create(model: RefData): Observable<RefData> {
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
        return Observable.create(observer => {
            model.version = 1;
            model.descr = "Created";
            observer.next(model);
            observer.complete();
        });
        
    }
    
    /**
     * This method calls the create API on the backend server and returns a model object.
     */
    public update(model: RefData): Observable<RefData> {
        this.url = "xxx";

        //let body = JSON.stringify(modelCopy);
        let body = JSOG.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        /*
        return this.http.post(this.url + 'refdata', body, options)
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
    public getById(id: string) : Observable<[ReferenceData]> {
        console.info('ReferenceDataService::getById(' + id + ')');

        let headers = new Headers({
            'Accept': 'application/json',
            'X-IBM-Client-Id': '01493a98-9ab1-47f8-8943-afee23978816' // @ICtodo: security: inject this during the build process, as an environment variable
        });

        let options = new RequestOptions({headers: headers});
        
        // via API connect
        let completeURL = AppSettings.API_REFERENCE_DATA_SPECIFIC + id;
        
        return this.http.get(completeURL, options)
            .map((res : Response) => this.extractData(res))
            .catch(this.handleError);
        
        /*
        // TODO: replace this with the actual api REST call above
        return Observable.create(observer => {
            let refDataValues = new Array<RefDataValue>();
            refDataValues.push(new RefDataValue('A','>66'));
            refDataValues.push(new RefDataValue('B','Acct. Details Update'));
            refDataValues.push(new RefDataValue('C','Acct. Details Confirm'));
            refDataValues.push(new RefDataValue('D','ATO / Lost Super'));
            refDataValues.push(new RefDataValue('E','Advisor'));
            refDataValues.push(new RefDataValue('F','Balances'));
            refDataValues.push(new RefDataValue('G','Beneficiaries'));
            refDataValues.push(new RefDataValue('H','Beneficiary Update'));
            refDataValues.push(new RefDataValue('I','Campaign 1'));
            refDataValues.push(new RefDataValue('J','Campaign 2'));
            refDataValues.push(new RefDataValue('K','Campaign 3'));
            
            let refData = new RefData('CALLRSN','Call Reasons',refDataValues);
            refData.version = 1;
            
            observer.next(refData);
            //call complete if you want to close this stream (like a promise)
            observer.complete();            
        });
        */
    }
    
    /**
     * FIXME this needs to be done with pagination.
     */
    public getAll() : Observable<RefData[]> {
        this.url = "xxx";

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        /*
        return this.http.get(this.url + 'refdata', options)
        .map((res : Response) => this.extractListData(res))
        .catch(this.handleError);    
        */    
        return Observable.create(observer => {
        
            let refDataValues = new Array<RefDataValue>();
            refDataValues.push(new RefDataValue('A','>66'));
            refDataValues.push(new RefDataValue('B','Acct. Details Update'));
            refDataValues.push(new RefDataValue('C','Acct. Details Confirm'));
            refDataValues.push(new RefDataValue('D','ATO / Lost Super'));
            refDataValues.push(new RefDataValue('E','Advisor'));
            refDataValues.push(new RefDataValue('F','Balances'));
            refDataValues.push(new RefDataValue('G','Beneficiaries'));
            refDataValues.push(new RefDataValue('H','Beneficiary Update'));
            refDataValues.push(new RefDataValue('I','Campaign 1'));
            refDataValues.push(new RefDataValue('J','Campaign 2'));
            refDataValues.push(new RefDataValue('K','Campaign 3'));
            
            let refData = new RefData('CALLRSN','Call Reasons',refDataValues);
            refData.version = 1;
            
            observer.next([refData]);
            //call complete if you want to close this stream (like a promise)
            observer.complete();            
        });
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

    /**
     * This method return either a test string representing an error or a model object 
     */
    protected extractListData(res: Response) {
        let body = res.json()
        
        console.info('Calling extractListData ' + res);
        
        if (res.status == 200) {
            return JSOG.parse(JSOG.stringify(body));
        } 
        else {
            // an error occured in request
            return body
        }
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
