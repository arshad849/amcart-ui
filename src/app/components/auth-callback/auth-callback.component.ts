import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  async ngOnInit() {
    console.log('inside call back component')
    this.route.queryParams.subscribe(async (params) => {
      const code = params['code'];
      console.log('code :'+code)
      if (code) {
        try {
          await this.authService.handleAuthResponse(code);
          //console.log('Tokens:', tokens);
          //sessionStorage.setItem('id_token', tokens.id_token);
          //sessionStorage.setItem('access_token', tokens.access_token);
          //this.router.navigate(['/home']); // Redirect to dashboard
        } catch (error) {
          console.error('Authentication error:', error);
          //this.router.navigate(['/login']);
        }
      }
    });
  }

  // constructor(private route: ActivatedRoute, private router: Router) {
  //   Amplify.configure({
  //     Auth: {
  //       userPoolId: 'us-east-2_pptCj2gqV',
  //       userPoolWebClientId: '1452opnjll0ldmocs201b1oimu',
  //     },
  //   });
  // }
  // async ngOnInit(): Promise<void> {
  //   const code = this.route.snapshot.queryParamMap.get('code');
  //   if (code) {
  //     try {
  //       const user = await Auth.federatedSignIn('cognito', { code }, { redirectUri: awsConfig.redirectUri });
  //       console.log('User logged in:', user);
  //       this.router.navigate(['/dashboard']); // Redirect to dashboard after login
  //     } catch (error) {
  //       console.error('Authentication error:', error);
  //     }
  //   } else {
  //     console.error('No authorization code found');
  //   }
  // }

}
