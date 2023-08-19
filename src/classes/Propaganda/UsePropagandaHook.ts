import { getCache } from './../../services/Cache';
import { useState } from 'react';

export default function usePropagandaHook() {
  const [data, setData] = useState<any>(getCache('propaganda') || []);

  return {
    data,
    setData,
  };
}
