import { Injectable } from '@angular/core';
import { awsConfig } from '../aws-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  //isLoggedInSubject : Observable<any>;
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  apiUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient, private router: Router) {
    this.updateAuthStatus();
  }
  
   // Redirect to Cognito Hosted UI for Login
   login() {
    window.location.href = `${awsConfig.domain}/login?response_type=code&client_id=${awsConfig.userPoolWebClientId}&redirect_uri=${awsConfig.redirectUri}`;
  }

  // Redirect to Cognito Hosted UI for Logout
  logout() {
    sessionStorage.clear();
    console.log('calling subject in logout')
    this.isLoggedInSubject.next(false);
    window.location.href = `${awsConfig.domain}/logout?client_id=${awsConfig.userPoolWebClientId}&logout_uri=${awsConfig.logoutUri}`;
  }

  register(){
    window.location.href = `${awsConfig.domain}/signup?client_id=${awsConfig.userPoolWebClientId}&response_type=code&scope=openid&redirect_uri=${awsConfig.redirectUri}`
  }

  // isAuthenticated(): boolean {
  //   // Check if the user is logged in by verifying the token
  //   const token = sessionStorage.getItem('id_token');
  //   return !!token; // Returns true if token exists, false otherwise
  // }

  isAuthenticated(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/auth/status`, { withCredentials: true, responseType: 'text' }).pipe(
      map((response : any) => {
        
        if(response.authenticated){
          console.log('insert true to subject in is authenticated')
          this.isLoggedInSubject.next(true);
          return true;
        }
        console.log('insert false to subject in is authenticated')
        this.isLoggedInSubject.next(false);
        return false;
        
      }),
      catchError(() => {
        console.log('insert false to subject in is authenticated')
        this.isLoggedInSubject.next(false);
        return of(false);
      })
    );
  }

  async handleAuthResponse(code: string) {
    const tokenUrl = `${awsConfig.domain}/oauth2/token`;
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', awsConfig.userPoolWebClientId);
    body.set('code', code);
    body.set('redirect_uri', awsConfig.redirectUri); // Must match Cognito App settings

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    this.http.post(tokenUrl, body.toString(), { headers }).subscribe(
      (data : any)=> {
        //console.log('response : ',data);
        this.storeTokens(data.id_token, data.access_token, data.refresh_token);
        sessionStorage.setItem('id_token', data.id_token);
        sessionStorage.setItem('access_token', data.access_token);
        sessionStorage.setItem('refresh_token', data.refresh_token);
        console.log('calling subject inside login')
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/home'])
      },
      (error)=> {
        console.log('error : ',error);
      }

    );
  }

  getUserInfo(): Promise<any> {
    console.log('getting user')
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      return Promise.reject('No access token found');
    }
  
    return fetch(`${awsConfig.domain}/oauth2/userInfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching user info:', error));
  }

  // updateAuthStatus() {
  //   this.isLoggedInSubject.next(this.isAuthenticated());
  // }

  updateAuthStatus() {
    this.isAuthenticated().subscribe();
  }

  private storeTokens(idToken: string, accessToken: string, refreshToken: string) {
    this.http.post(`${this.apiUrl}/auth/store-token`, {
      idToken,
      accessToken,
      refreshToken,
    }, { withCredentials: true, responseType: 'text' }).subscribe({
      next: () => {
        console.log('Tokens stored securely');
        //this.router.navigate(['/']);
      },
      error: (err) => console.error('Error storing tokens', err),
    });
  }

}
