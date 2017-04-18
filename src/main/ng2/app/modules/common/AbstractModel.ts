declare var JSOG: any;

export abstract class AbstractModel {

    id: string;

    descr: string;

    version: number= 0;
   
    public fillFromJSONString(json: string) {
        
        console.info('fillFromJSONString 1:' + json);
        
        let jsonObj = JSOG.parse( json );
        for ( let propName in jsonObj ) {
            
            // special processing for a Date
            if(this[propName] instanceof Date) {
                this[propName] = new Date(jsonObj[propName]);
            } else {            
                this[propName] = jsonObj[propName]
            }
        }
        
        console.info('fillFromJSONString 2: ' + JSOG.stringify(this));

        return this;
    }

    public fillFromJSONObj(jsonObj :any) {
        console.info('fillFromJSONObj 1:' + jsonObj);
        
        let jsogObj = JSOG.parse(JSOG.stringify(jsonObj));
        
        for ( let propName in jsogObj ) {
            // special processing for a Date
            if(this[propName] instanceof Date) {
                this[propName] = new Date(jsogObj[propName]);
            } else {            
                this[propName] = jsogObj[propName]
            }
        }
        
        console.info('fillFromJSONObj 2:' + JSOG.stringify(this));
        return this;
    }
    
    public getFields(): any[] {
        var keys = [];
        for(var key in this){
           keys.push(key);
        }
        return keys;
    }
}