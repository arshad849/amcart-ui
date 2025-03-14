import { Injectable } from '@angular/core';
import { awsConfig } from '../aws-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  //isLoggedInSubject : Observable<any>;
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  apiUrl = environment.baseApi;
  
  constructor(private http: HttpClient, private router: Router) {
    this.updateAuthStatus();
  }
  
  // Redirect to Cognito Hosted UI for Login
  login() {
    window.location.href = `${awsConfig.domain}/login?response_type=code&client_id=${awsConfig.userPoolWebClientId}&redirect_uri=${awsConfig.redirectUri}`;
  }

  // Redirect to Cognito Hosted UI for Logout
  logout() {
    this.http.post(`${this.apiUrl}/auth/logout`, {}, {withCredentials: true}).subscribe({
      next: () => {
      },
      error: (err) => console.error('Error Logging out', err),
    });
    this.isLoggedInSubject.next(false);
    window.location.href = `${awsConfig.domain}/logout?client_id=${awsConfig.userPoolWebClientId}&logout_uri=${awsConfig.logoutUri}`;
  }

  register(){
    window.location.href = `${awsConfig.domain}/signup?client_id=${awsConfig.userPoolWebClientId}&response_type=code&scope=openid&redirect_uri=${awsConfig.redirectUri}`
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/auth/status`, { withCredentials: true, responseType: 'text' }).pipe(
      map((response : any) => {
        const parsedResponse = JSON.parse(response);
        if(parsedResponse.authenticated){
          this.isLoggedInSubject.next(true);
          return true;
        }
        this.isLoggedInSubject.next(false);
        return false;
        
      }),
      catchError(() => {
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
        this.storeTokens(data.id_token, data.access_token, data.refresh_token);
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

  updateAuthStatus() {
    this.isAuthenticated().subscribe();
  }

  private storeTokens(idToken: string, accessToken: string, refreshToken: string) {
    const headers = new HttpHeaders({
      'Origin': 'https://d1de3c8mspzt29.cloudfront.net',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json, text/plain, */*',

    });
    this.http.post(`${this.apiUrl}/auth/store-token`, {
      idToken,
      accessToken,
      refreshToken,
    }, {headers, withCredentials: true, responseType: 'text' }).subscribe({
      next: () => {
      },
      error: (err) => console.error('Error storing tokens', err),
    });
  }

}
