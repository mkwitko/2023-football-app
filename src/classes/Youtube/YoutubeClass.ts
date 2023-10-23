import CoreClass from '../Core/CoreClass';
import useYoutubeHook from './useYoutubeHook';

export default class YoutubeClass extends CoreClass {

    override collection = 'youtube';
    override hook = useYoutubeHook();

    getLive = () => {
        const url = `${'https://yt.lemnoslife.com/noKey/'}search?part=snippet&channelId=${process.env.REACT_APP_YOUTUBE_CHANNEL}`;

        return fetch(url)
            .then((response) => response.json())
            .then(async (data) => {
                const findLive = data.items.find((e: any) => {
                    return e.snippet.liveBroadcastContent === 'live' && e.id.videoId;
                });
                this.hook.setLive(findLive);

                fetch(`${'https://yt.lemnoslife.com/noKey/'}videos?part=liveStreamingDetails&id=${findLive.id.videoId}`).then((response) => response.json()).then((data) => {
                    this.hook.setLiveChatId(data.items[0].liveStreamingDetails.activeLiveChatId);
                    this.sendComment(data.items[0].liveStreamingDetails.activeLiveChatId);
                })

                return findLive;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    sendComment = (id?: string) => {
        const url = `${'https://youtube.googleapis.com/youtube/v3/'}liveChat/messages?part=snippet&key=${process.env.REACT_APP_YOUTUBE_KEY}`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                snippet: {
                    liveChatId: id || this.hook.liveChatId,
                    type: 'textMessageEvent',
                    textMessageDetails: {
                        messageText: 'test',
                    },
                },
            })
        }).then((response) => response.json()).then((data) => console.log('send comment - ', data))
    }
}
