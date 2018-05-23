import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {  BadInputError } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  
  // private headers = new Headers({'Content-Type':'application/json'});
  // private options = new RequestOptions({headers: this.headers});
  
  constructor(private url: string, private http : AuthHttp ) { }

  getAll(){
    return this.http.get(this.url)
      .map(response=>response.json())
      .catch(this.handleError);
  }

  getById(id){
    return this.http.get(this.url+'/'+id)
      .map(response=>response.json())
      .catch(this.handleError);
  }
  getByEmail(email : string){
    return this.http.get(this.url+'/checkEmail?value='+email)
          .map(response=>response.json())
          .catch(this.handleError);
  }
  create(resource, id){
    return this.http.post(this.url+'/'+id,JSON.stringify(resource))
    .map(response=>response.json())
    .catch(this.handleError);
  }

  update(resource, id){
    return this.http.put(this.url+'/'+id,JSON.stringify(resource))
    .map(response=>response.json())
    .catch(this.handleError);
  }

  delete(id){
    return this.http.delete(this.url+'/'+id)
    .map(response=>response.json())
    .catch(this.handleError);
  
  }


  private handleError(error : Response){
    if(error.status ===400){
      return Observable.throw(new BadInputError(error));
    }
    if(error.status ===404){
      return Observable.throw(new NotFoundError(error));
    }
    return Observable.throw(new AppError(error));
  } 

  
}
