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
    }
  }
};

export default config;
