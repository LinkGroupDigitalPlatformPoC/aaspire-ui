import { Component } from '@angular/core';
import {Http, Response,Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './RxJsOperators';
import { AbstractModel } from './AbstractModel';

declare var JSOG: any;

export abstract class AbstractApiService<M extends AbstractModel> {

    protected url : string;

    constructor( public http: Http) { 
        // TODO make this a global variable.
        //this.url = 'http://localhost:8090/merchy-app/rest/';
        this.url = 'http://merchy-app.au-syd.mybluemix.net/merchy-app/rest/'            
    }

    /**
     * This method calls the create API on the backend server and returns a model object.
     */
    public create( model: M ): Observable<M> {

        let modelCopy = model.getCopy();
        modelCopy.nullOutUnitialisedManyToOneRelationships();

        //let body = JSON.stringify(modelCopy);
        let body = JSOG.stringify(modelCopy);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.info('create-'+modelCopy.getContextName());

        return this.http.put(this.url + this.getContext(), body, options)
                        .map((res : Response) => this.extractData(res,this.getNewModel()))
                        .catch(this.handleError);
    }
    
    /**
     * This method calls the create API on the backend server and returns a model object.
     */
    public update( model: M ): Observable<M> {

        let modelCopy = model.getCopy();
        modelCopy.nullOutUnitialisedManyToOneRelationships();

        //let body = JSON.stringify(modelCopy);
        let body = JSOG.stringify(modelCopy);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.info('updating-'+modelCopy.getContextName());

        return this.http.post(this.url + this.getContext(), body, options)
                        .map((res : Response) => this.extractData(res,this.getNewModel()))
                        .catch(this.handleError);
    }

    public getById(id : string) : Observable<M> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.info('Calling getById (' + id + ')');
        
        return this.http.get(this.url + this.getContext() + '/' + id, options)
        .map((res : Response) => this.extractData(res,this.getNewModel()))
        .catch(this.handleError);        
    }
    
    /**
     * FIXME this needs to be done with pagination.
     */
    public getAll() : Observable<M[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(this.url + this.getContext(), options)
        .map((res : Response) => this.extractListData(res,this.getNewModel()))
        .catch(this.handleError);        
    }

    public _delete(model: M) : Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.delete(this.url + this.getContext() + '/' + model.id, options).catch(this.handleError);        
    }

    protected extractData( res: Response, model : M ) {
        let body = res.json()
        
        console.info('Calling extractData ' + res);
        
        if(res.status == 500) {
           // an error occured in request
            return body
        } else {
            model.fillFromJSONObj(body);
            model.initialiseNullManyToOneFields();
            return model;
        }
    }

    /**
     * This method return either a test string representing an error of a model object 
     */
    protected extractListData( res: Response, model : any ) {
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
    
    abstract getNewModel() : M;
    abstract getContext() : string;
}