import CoreClass from '../Core/CoreClass';
import useYoutubeHook from './useYoutubeHook';

export default class YoutubeClass extends CoreClass {
  override collection = 'youtube';
  override hook = useYoutubeHook();
  getLive = () => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC40TUSUx490U5uR1lZt3Ajg&key=AIzaSyD4XNAsWgDTTboqXSi77cv4FHUdp6BcHkk`;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const findLive = data.items.find((e: any) => {
          return e.snippet.liveBroadcastContent === 'live' && e.id.videoId;
        });
        this.hook.setLive(findLive);
        return findLive;
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
