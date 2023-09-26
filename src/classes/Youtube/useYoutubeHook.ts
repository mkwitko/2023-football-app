import { getCache } from '../../services/Cache';
import { useState } from 'react';

export default function useYoutubeHook() {
  const [live, setLive] = useState<any>(getCache('live') || []);

  return {
    live,
    setLive,
  };
}
