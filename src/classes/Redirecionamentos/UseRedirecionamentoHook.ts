import { getCache } from './../../services/Cache';
import { useState } from 'react';

export default function useRedirecionamentoHook() {
  const [data, setData] = useState<any>(getCache('redirecionamento') || []);

  return {
    data,
    setData,
  };
}
