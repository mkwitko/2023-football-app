import { getCache } from '../../services/Cache';
import { useState } from 'react';

export default function useYoutubeHook() {
    const [data, setData] = useState<any>(getCache('youtube') || []);
  const [live, setLive] = useState<any>(getCache('live') || []);

  return {
    data, 
    setData,
    live,
    setLive,
  };
}
