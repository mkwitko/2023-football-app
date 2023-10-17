import { getCache } from '../../services/Cache';
import { useState } from 'react';

export default function useOrdersHook() {
  const [data, setData] = useState<any>(getCache('orders') || []);

  return {
    data,
    setData,
  };
}
