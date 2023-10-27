import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vdg.prosperapps',
  appName: 'Vozes do Gigante',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
