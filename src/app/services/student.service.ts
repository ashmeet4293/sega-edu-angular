import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class StudentService extends DataService{
  constructor(authHttp : AuthHttp) {
    super("http://localhost:8080/studentdata/student",authHttp);
   }

}
