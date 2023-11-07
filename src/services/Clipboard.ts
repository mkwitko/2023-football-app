import { Clipboard } from '@capacitor/clipboard';
import { isPlatform } from '@ionic/react';

const isMobile = isPlatform('mobile');


export const writeToClipboard = async ({value}:{
    value: string
}) => {
 if(isMobile) {
    await Clipboard.write({
        string: value
      });
 } else {
    await navigator.clipboard.writeText(value);
 }
};

export const checkClipboard = async () => {
  if(isMobile) {
    const { type, value } = await Clipboard.read();

  return { type, value };
  } else {
    const value = await navigator.clipboard.readText();
    return { value };
  }
};