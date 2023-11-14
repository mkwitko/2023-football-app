import { getCache } from '../../services/Cache';
import { useState } from 'react';

export default function useChannelsHook() {
  const [data, setData] = useState<any>(getCache('channels') || []);

  return {
    data,
    setData,
  };
}
