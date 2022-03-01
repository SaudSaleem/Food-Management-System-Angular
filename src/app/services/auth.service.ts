import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private url: string = 'http://localhost:5000/api/'
  loginuser: any = '';
  error: any = ''
  status: number = 0
  set setLoginUser(value :any) {
    this.loginuser = value
  }
  get getLoginUser(): any {
    return this.loginuser
  }
  constructor(private http: HttpClient) { 
    this.setLoginUser = JSON.parse(localStorage.getItem('loginUser')|| '{}')
  }
  login(credentials : any) {
    return this.http.post(this.url + 'login', credentials).pipe(
      map((result: any) => {
        if(result.status == 200) {
          this.setLoginUser = result.user
          this.status = result.status
          localStorage.setItem('loginUser', JSON.stringify(this.loginuser))
        }
        else {
          // this.error = result
          this.status = result.status
        }
        
      })
    )
    
  }

  logout(email: string) {
    return this.http.post(this.url + 'logout', {email})
  }
}
