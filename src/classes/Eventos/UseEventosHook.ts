import { getCache } from '../../services/Cache';
import { useState } from 'react';

export default function useEventosHook() {
  const [data, setData] = useState<any>(getCache('events') || []);

  return {
    data,
    setData,
  };
}
