import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { map, catchError, tap } from 'rxjs/operators';
import { Data } from '../models/data';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  register(user: User) {
    return this.http.post(this.baseUrl + `/user/signup`, user, httpOptions);
  }

  getData() {
    return this.http.get(this.baseUrl + `/list`);
  }

  addData(data: Data): Observable<Data> {
    return this.http.post<Data>(this.baseUrl + `/list`, data, httpOptions);
  }

  deleteData(data) {
    return this.http.delete<any>(this.baseUrl + `/list`, data);
  }

  updateData(data, formData): Observable<Data>{
    return this.http.put<Data>(this.baseUrl + `/list`, {id:data.id, title:formData.title},httpOptions );
  }




}