import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from './login-request';
import { RegistroRequest } from './registro-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/auth';
  constructor(  
    private http: HttpClient,
  ) { }
  public login(username: string, password: string): Observable<string>{
    const loginRequest: LoginRequest = {
      correo: username,
      password: password
    };
    return this.http.post< string>(`${this.apiUrl}/login`, loginRequest )
  }
  public registrar(registroRequest: RegistroRequest) : Observable<string>{
    console.log(`${this.apiUrl}/registrar`);
    return this.http.post<string>(`${this.apiUrl}/registrar`, registroRequest)
    
     
  }
}
