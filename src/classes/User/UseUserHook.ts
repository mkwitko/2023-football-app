import { useState } from 'react';

export default function useUserHook() {
  const [data, setData] = useState<any>(null);

  return {
    data,
    setData,
  };
}
