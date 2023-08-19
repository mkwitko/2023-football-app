import { Share } from '@capacitor/share';

export async function share(obj: {
  title: string;
  text: string;
  url: string;
  dialogTitle: string;
}) {
  await Share.share(obj);
}
