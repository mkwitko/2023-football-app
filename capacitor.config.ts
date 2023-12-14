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
      scopes: ["profile", "email"],
      clientId: '976746971009-db916m71jq3u7ogtbbbuab85uv94k47j.apps.googleusercontent.com',
      serverClientId: '976746971009-db916m71jq3u7ogtbbbuab85uv94k47j.apps.googleusercontent.com',
      androidClientId: '976746971009-db916m71jq3u7ogtbbbuab85uv94k47j.apps.googleusercontent.com',
      iosClientId: '976746971009-db916m71jq3u7ogtbbbuab85uv94k47j.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
