import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

//const HEADER = {headers: new Headers({'Content-Type': 'application/json'})};

@Injectable()
export class AuthenticationService {

    baseUrl = environment.baseUrl;
    
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    
    constructor (private http: HttpClient) { 
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserVal(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(this.baseUrl + `/user/login`, {email: email, password: password})
        .pipe(map(data => {
            const {user} = data;
            //const tickets = user.tokens;
            console.log(user)
            if(data && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return data;
        }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}