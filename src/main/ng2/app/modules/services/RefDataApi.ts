import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// third party - endorsed by Angular
import { Observable } from 'rxjs/Observable';

import { RefData } from '../models/RefData';
import { RefDataValue } from '../models/RefDataValue';

declare var JSOG: any;

@Injectable()
export class RefDataApi {

    protected url : string;

    constructor( public http: Http) { 
        // TODO make this a global variable.
        //this.url = 'http://localhost:8090/merchy-app/rest/';
        this.url = 'http://merchy-app.au-syd.mybluemix.net/merchy-app/rest/'            
    }

    /**
     * This method calls the create API on the backend server and returns a model object.
     */
    public create( model: RefData ): Observable<RefData> {

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
            model.version = 1;
            model.descr = "Created";
            observer.next(model);
            observer.complete();
        });
        
    }
    
    /**
     * This method calls the create API on the backend server and returns a model object.
     */
    public update( model: RefData ): Observable<RefData> {

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

    public getById(id : string) : Observable<RefData> {
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.info('Calling getById (' + id + ')');
        
        /*
        return this.http.get(this.url + 'refdata/' + id, options)
        .map((res : Response) => this.extractData(res))
        .catch(this.handleError);
        */
        
        
        // replace this with the actual api REST call above
        return Observable.create( observer => {
        
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
    }
    
    /**
     * FIXME this needs to be done with pagination.
     */
    public getAll() : Observable<RefData[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        /*
        return this.http.get(this.url + 'refdata', options)
        .map((res : Response) => this.extractListData(res))
        .catch(this.handleError);    
        */    
        return Observable.create( observer => {
        
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

    protected extractData( res: Response) {
        let body = res.json()
        
        let model :RefData = new RefData();
        
        console.info('Calling extractData ' + res);
        
        if(res.status == 500) {
           // an error occured in request
            return body
        } else {
            model.fillFromJSONObj(body);
            return model;
        }
    }

    /**
     * This method return either a test string representing an error of a model object 
     */
    protected extractListData( res: Response) {
        let body = res.json()
        
        console.info('Calling extractListData ' + res);
        
        if(res.status == 500) {
           // an error occured in request
            return body
        } else {
            return JSOG.parse(JSOG.stringify(body));
        }
    }

    protected handleError( error: any ) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = ( error.message ) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        //console.error( errMsg ); // log to console instead
        console.error(error);
        return Observable.throw( error._body );
    }    
}
