import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vdg.prosperapps',
  appName: 'Vozes do Gigante',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Splashscreen: {
        launchShowDuration: 2000,
        backgroundColor: '#F93939',
        showSpinner: false,
        androidSpinnerStyle: 'small',
        iosSpinnerStyle: 'small',
        splashFullScreen: true,
        splashImmersive: true
    },
    GoogleAuth: {
      scopes: ["profile", "email", 'https://www.googleapis.com/auth/youtube.channel-memberships.creator'],
      clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      serverClientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      androidClientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      iosClientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID_IOS,
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
