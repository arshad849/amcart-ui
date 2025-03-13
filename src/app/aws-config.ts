export const awsConfig = {
    region: 'ap-south-1', // Change this to your AWS region
    //userPoolId: 'ap-south-1_hoH6HkKAq', // Your Cognito User Pool ID
    userPoolId: 'ap-south-1_9A2oeLLAh',
    //userPoolWebClientId: '4urpk65i0t50tmvglnu20u4i7o', // Your App Client ID
    userPoolWebClientId: '110fd7m21dcjtag9cf3i7h0p5e',
    //domain: 'https://ap-south-1hoh6hkkaq.auth.ap-south-1.amazoncognito.com', // Your Cognito Hosted UI domain
    domain: 'https://ap-south-19a2oellah.auth.ap-south-1.amazoncognito.com',
    //redirectUri: 'http://localhost:4200/auth/callback',
    redirectUri:'https://d1de3c8mspzt29.cloudfront.net/auth/callback',// Must match Callback URL in Cognito
    //logoutUri: 'http://localhost:4200',
    logoutUri: 'https://d1de3c8mspzt29.cloudfront.net',// Must match Sign-Out URL in Cognito
    Auth: {
      region: 'us-east-1', // Update with your AWS region
      userPoolId: 'us-east-1_XXXXXXXXX',
      userPoolWebClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
      oauth: {
        domain: 'your-cognito-domain.auth.us-east-1.amazoncognito.com',
        scope: ['email', 'openid', 'profile'],
        redirectSignIn: ['http://localhost:4200/auth/callback'],
        redirectSignOut: ['http://localhost:4200/'],
        responseType: 'code',
      },
    }
  };
  