import { getCache } from './../../services/Cache';
import { useState } from 'react';

export default function useNoticiasHook() {
  const [data, setData] = useState<any>(getCache('noticias') || []);

  return {
    data,
    setData,
  };
}
